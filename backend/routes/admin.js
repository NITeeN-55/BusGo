// routes/admin.js  ─ /api/admin  (admin + editor only)
'use strict';
const express = require('express');
const { body, validationResult } = require('express-validator');
const User    = require('../models/User');
const Booking = require('../models/Booking');
const Refund  = require('../models/RefundRequest');
const { protect, adminOnly, staffOnly } = require('../middleware/auth');

const router = express.Router();
router.use(protect);
router.use(staffOnly); // editor or admin can read; write actions check adminOnly separately

// ── In-memory bus data (mirrors buses.js) ──────────────────────
let BUS_DATA = [
  { id:1,  name:'Sharma Travels',      type:'AC',      rating:4.7, dep:'06:00', arr:'12:00', dur:'6h',   price:580,  seats:32, amenities:['AC','TV','USB'],      active:true },
  { id:2,  name:'Royal Travels',       type:'Volvo',   rating:4.9, dep:'07:30', arr:'14:30', dur:'7h',   price:850,  seats:28, amenities:['AC','Meals','WiFi'], active:true },
  { id:3,  name:'VRL Express',         type:'Sleeper', rating:4.3, dep:'22:00', arr:'06:00', dur:'8h',   price:680,  seats:36, amenities:['Sleeper','AC','USB'],active:true },
  { id:4,  name:'SRS Travels',         type:'Non-AC',  rating:4.1, dep:'09:00', arr:'15:00', dur:'6h',   price:320,  seats:40, amenities:['Standard'],          active:true },
  { id:5,  name:'Orange Tours',        type:'AC',      rating:4.5, dep:'14:30', arr:'20:30', dur:'6h',   price:620,  seats:34, amenities:['AC','WiFi','USB'],    active:true },
  { id:6,  name:'Paulo Travels',       type:'Volvo',   rating:4.8, dep:'23:00', arr:'07:00', dur:'8h',   price:920,  seats:26, amenities:['AC','Meals','WiFi'], active:true },
  { id:7,  name:'Neeta Tours',         type:'AC',      rating:4.2, dep:'16:00', arr:'23:00', dur:'7h',   price:550,  seats:38, amenities:['AC','USB'],          active:true },
  { id:8,  name:'Patel Travels',       type:'Sleeper', rating:4.6, dep:'20:30', arr:'05:00', dur:'8.5h', price:760,  seats:30, amenities:['Sleeper','AC'],      active:true },
  { id:9,  name:'Maharashtra Express', type:'AC',      rating:4.4, dep:'05:30', arr:'11:30', dur:'6h',   price:500,  seats:36, amenities:['AC','USB'],          active:true },
  { id:10, name:'Gondia Travels',      type:'Non-AC',  rating:4.0, dep:'07:00', arr:'13:30', dur:'6.5h', price:300,  seats:40, amenities:['Standard'],          active:true },
  { id:11, name:'Vidarbha Sleeper',    type:'Sleeper', rating:4.3, dep:'21:00', arr:'05:30', dur:'8.5h', price:650,  seats:32, amenities:['Sleeper','AC'],      active:true },
  { id:12, name:'RedBus Premium',      type:'Volvo',   rating:4.8, dep:'23:45', arr:'07:00', dur:'7h',   price:950,  seats:28, amenities:['AC','WiFi','Meals'], active:true },
  { id:13, name:'SouthLine Travels',   type:'AC',      rating:4.6, dep:'15:00', arr:'22:00', dur:'7h',   price:700,  seats:34, amenities:['AC','TV'],           active:true },
  { id:14, name:'NorthStar Travels',   type:'Volvo',   rating:4.7, dep:'08:00', arr:'16:00', dur:'8h',   price:880,  seats:30, amenities:['AC','WiFi'],         active:true },
  { id:15, name:'Eastern Express',     type:'Sleeper', rating:4.2, dep:'20:00', arr:'06:30', dur:'10h',  price:720,  seats:36, amenities:['Sleeper','USB'],     active:true },
];

// ════════════════════════════════════════════════════════════════
// DASHBOARD
// ════════════════════════════════════════════════════════════════
router.get('/dashboard', async (req, res) => {
  try {
    const [totalUsers, activeUsers, totalBookings, confirmedBookings,
           cancelledBookings, pendingRefunds, revenueAgg,
           recentBookings, recentUsers, bookingsByType] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isActive:true }),
      Booking.countDocuments(),
      Booking.countDocuments({ status:'confirmed' }),
      Booking.countDocuments({ status:'cancelled' }),
      Refund.countDocuments({ status:'pending' }),
      Booking.aggregate([{ $match:{ status:{ $in:['confirmed','completed'] } } }, { $group:{ _id:null, total:{ $sum:'$finalAmount' } } }]),
      Booking.find().sort({ createdAt:-1 }).limit(8).populate('userId','name email'),
      User.find().sort({ createdAt:-1 }).limit(5).select('name email role loyaltyTier createdAt isActive'),
      Booking.aggregate([{ $group:{ _id:'$busType', count:{ $sum:1 } } }, { $sort:{ count:-1 } }]),
    ]);

    const sixAgo = new Date(); sixAgo.setMonth(sixAgo.getMonth() - 6);
    const monthlyRevenue = await Booking.aggregate([
      { $match:{ status:{ $in:['confirmed','completed'] }, createdAt:{ $gte:sixAgo } } },
      { $group:{ _id:{ year:{ $year:'$createdAt' }, month:{ $month:'$createdAt' } }, revenue:{ $sum:'$finalAmount' }, count:{ $sum:1 } } },
      { $sort:{ '_id.year':1, '_id.month':1 } },
    ]);

    res.json({
      success:true,
      stats:{
        users:{ total:totalUsers, active:activeUsers },
        bookings:{ total:totalBookings, confirmed:confirmedBookings, cancelled:cancelledBookings },
        revenue: revenueAgg[0]?.total || 0,
        pendingRefunds,
        activeBuses: BUS_DATA.filter(b=>b.active).length,
      },
      recentBookings, recentUsers, bookingsByType, monthlyRevenue,
    });
  } catch(err) { console.error(err); res.status(500).json({ success:false, message:'Server error.' }); }
});

// ════════════════════════════════════════════════════════════════
// USERS
// ════════════════════════════════════════════════════════════════
router.get('/users', async (req, res) => {
  try {
    const { page=1, limit=20, search='', role='', status='' } = req.query;
    const q = {};
    if (search) q.$or = [{ name:{$regex:search,$options:'i'} }, { email:{$regex:search,$options:'i'} }];
    if (role)   q.role = role;
    if (status === 'active')   q.isActive = true;
    if (status === 'inactive') q.isActive = false;
    const [users, total] = await Promise.all([
      User.find(q).select('-password').sort({ createdAt:-1 }).skip((page-1)*limit).limit(Number(limit)),
      User.countDocuments(q),
    ]);
    res.json({ success:true, users, pagination:{ page:Number(page), limit:Number(limit), total, pages:Math.ceil(total/limit) } });
  } catch(err) { res.status(500).json({ success:false, message:'Server error.' }); }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user     = await User.findById(req.params.id).select('-password');
    if (!user)     return res.status(404).json({ success:false, message:'User not found.' });
    const bookings = await Booking.find({ userId:user._id }).sort({ createdAt:-1 }).limit(10);
    res.json({ success:true, user, bookings });
  } catch(err) { res.status(500).json({ success:false, message:'Server error.' }); }
});

router.patch('/users/:id', adminOnly, async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString() && req.body.role && req.body.role !== 'admin')
      return res.status(400).json({ success:false, message:'Cannot change your own role.' });
    const allowed = ['role','isActive','walletBalance','loyaltyPoints'];
    const updates = {};
    allowed.forEach(f => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new:true }).select('-password');
    if (!user) return res.status(404).json({ success:false, message:'User not found.' });
    res.json({ success:true, user });
  } catch(err) { res.status(500).json({ success:false, message:'Server error.' }); }
});

router.delete('/users/:id', adminOnly, async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString())
      return res.status(400).json({ success:false, message:'Cannot delete your own account.' });
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success:false, message:'User not found.' });
    res.json({ success:true, message:'User deleted.' });
  } catch(err) { res.status(500).json({ success:false, message:'Server error.' }); }
});

// ════════════════════════════════════════════════════════════════
// BOOKINGS
// ════════════════════════════════════════════════════════════════
router.get('/bookings', async (req, res) => {
  try {
    const { page=1, limit=20, status='', search='' } = req.query;
    const q = {};
    if (status) q.status = status;
    if (search) q.$or = [{ pnr:{$regex:search,$options:'i'} }, { busName:{$regex:search,$options:'i'} }];
    const [bookings, total] = await Promise.all([
      Booking.find(q).populate('userId','name email phone').sort({ createdAt:-1 }).skip((page-1)*limit).limit(Number(limit)),
      Booking.countDocuments(q),
    ]);
    res.json({ success:true, bookings, pagination:{ page:Number(page), limit:Number(limit), total, pages:Math.ceil(total/limit) } });
  } catch(err) { res.status(500).json({ success:false, message:'Server error.' }); }
});

router.patch('/bookings/:id', adminOnly, async (req, res) => {
  const { status } = req.body;
  if (!['confirmed','cancelled','completed','pending'].includes(status))
    return res.status(400).json({ success:false, message:'Invalid status.' });
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new:true });
    if (!booking) return res.status(404).json({ success:false, message:'Booking not found.' });
    res.json({ success:true, booking });
  } catch(err) { res.status(500).json({ success:false, message:'Server error.' }); }
});

// ════════════════════════════════════════════════════════════════
// REFUNDS
// ════════════════════════════════════════════════════════════════
router.get('/refunds', async (req, res) => {
  try {
    const { page=1, limit=20, status='' } = req.query;
    const q = status ? { status } : {};
    const [refunds, total] = await Promise.all([
      Refund.find(q).populate('userId','name email').populate('bookingId','pnr from to date finalAmount').sort({ createdAt:-1 }).skip((page-1)*limit).limit(Number(limit)),
      Refund.countDocuments(q),
    ]);
    res.json({ success:true, refunds, pagination:{ page:Number(page), limit:Number(limit), total, pages:Math.ceil(total/limit) } });
  } catch(err) { res.status(500).json({ success:false, message:'Server error.' }); }
});

router.patch('/refunds/:id', adminOnly, async (req, res) => {
  const { action, adminNote='' } = req.body;
  if (!['approve','reject'].includes(action))
    return res.status(400).json({ success:false, message:'action must be approve or reject.' });
  try {
    const refund = await Refund.findById(req.params.id);
    if (!refund)              return res.status(404).json({ success:false, message:'Refund not found.' });
    if (refund.status !== 'pending') return res.status(400).json({ success:false, message:`Already ${refund.status}.` });

    refund.status      = action === 'approve' ? 'approved' : 'rejected';
    refund.adminNote   = adminNote;
    refund.processedAt = new Date();
    await refund.save();

    if (action === 'approve') {
      await User.findByIdAndUpdate(refund.userId, { $inc:{ walletBalance:refund.refundAmount } });
      await Booking.findByIdAndUpdate(refund.bookingId, { status:'cancelled' });
    }
    res.json({ success:true, refund });
  } catch(err) { res.status(500).json({ success:false, message:'Server error.' }); }
});

// ════════════════════════════════════════════════════════════════
// BUSES
// ════════════════════════════════════════════════════════════════
router.get('/buses', (req, res) => res.json({ success:true, buses:BUS_DATA }));

router.post('/buses', adminOnly,
  [body('name').notEmpty(), body('type').isIn(['AC','Non-AC','Sleeper','Volvo']), body('price').isNumeric(), body('seats').isInt({min:10,max:60})],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success:false, errors:errors.array() });
    const { name, type, rating, dep, arr, dur, price, seats, amenities } = req.body;
    const newId = BUS_DATA.length ? Math.max(...BUS_DATA.map(b=>b.id)) + 1 : 1;
    const bus   = { id:newId, name:name.trim(), type, rating:parseFloat(rating)||4.0, dep:dep||'00:00', arr:arr||'00:00', dur:dur||'—', price:parseInt(price), seats:parseInt(seats), amenities:Array.isArray(amenities)?amenities:[], active:true };
    BUS_DATA.push(bus);
    res.status(201).json({ success:true, bus });
  }
);

router.patch('/buses/:id', adminOnly, (req, res) => {
  const bus = BUS_DATA.find(b => b.id === parseInt(req.params.id));
  if (!bus) return res.status(404).json({ success:false, message:'Bus not found.' });
  ['name','type','rating','dep','arr','dur','price','seats','amenities','active'].forEach(f => { if (req.body[f] !== undefined) bus[f] = req.body[f]; });
  res.json({ success:true, bus });
});

router.delete('/buses/:id', adminOnly, (req, res) => {
  const idx = BUS_DATA.findIndex(b => b.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ success:false, message:'Bus not found.' });
  BUS_DATA.splice(idx, 1);
  res.json({ success:true, message:'Bus deleted.' });
});

// ════════════════════════════════════════════════════════════════
// PROMOTE USER TO ADMIN
// ════════════════════════════════════════════════════════════════
router.post('/create-admin', adminOnly, async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success:false, message:'email required.' });
  try {
    const user = await User.findOneAndUpdate({ email }, { role:'admin' }, { new:true }).select('-password');
    if (!user) return res.status(404).json({ success:false, message:'User not found.' });
    res.json({ success:true, message:`${user.name} is now an admin.`, user });
  } catch(err) { res.status(500).json({ success:false, message:'Server error.' }); }
});

module.exports = { router, getBusData: () => BUS_DATA };
