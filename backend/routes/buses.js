// routes/buses.js  — /api/buses
// Bus data lives here server-side (moved from app.js BUS_DATA).
// A real system would store buses in MongoDB; for BusGo we keep
// the static seed data here and add a booked-seats overlay from DB.

const express = require('express');
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');

const router = express.Router();

// ── Static bus seed data (mirrors BUS_DATA in app.js) ──────
const BUS_DATA = [
  { id:1,  name:'Sharma Travels',       type:'AC',      rating:4.7, dep:'06:00', arr:'12:00', dur:'6h',    price:580,  seats:32, amenities:['💺 AC','📺 TV','🔌 USB'] },
  { id:2,  name:'Royal Travels',        type:'Volvo',   rating:4.9, dep:'07:30', arr:'14:30', dur:'7h',    price:850,  seats:28, amenities:['💺 AC','🍱 Meals','📶 WiFi'] },
  { id:3,  name:'VRL Express',          type:'Sleeper', rating:4.3, dep:'22:00', arr:'06:00', dur:'8h',    price:680,  seats:36, amenities:['🛏 Sleeper','💺 AC','🔌 USB'] },
  { id:4,  name:'SRS Travels',          type:'Non-AC',  rating:4.1, dep:'09:00', arr:'15:00', dur:'6h',    price:320,  seats:40, amenities:['🚌 Standard'] },
  { id:5,  name:'Orange Tours',         type:'AC',      rating:4.5, dep:'14:30', arr:'20:30', dur:'6h',    price:620,  seats:34, amenities:['💺 AC','📶 WiFi','🔌 USB'] },
  { id:6,  name:'Paulo Travels',        type:'Volvo',   rating:4.8, dep:'23:00', arr:'07:00', dur:'8h',    price:920,  seats:26, amenities:['💺 AC','🍱 Meals','📶 WiFi','🛏 Sleeper'] },
  { id:7,  name:'Neeta Tours',          type:'AC',      rating:4.2, dep:'16:00', arr:'23:00', dur:'7h',    price:550,  seats:38, amenities:['💺 AC','🔌 USB'] },
  { id:8,  name:'Patel Travels',        type:'Sleeper', rating:4.6, dep:'20:30', arr:'05:00', dur:'8.5h',  price:760,  seats:30, amenities:['🛏 Sleeper','💺 AC','🍱 Snacks'] },
  { id:9,  name:'Maharashtra Express',  type:'AC',      rating:4.4, dep:'05:30', arr:'11:30', dur:'6h',    price:500,  seats:36, amenities:['💺 AC','🔌 USB'] },
  { id:10, name:'Gondia Travels',       type:'Non-AC',  rating:4.0, dep:'07:00', arr:'13:30', dur:'6.5h',  price:300,  seats:40, amenities:['🚌 Standard'] },
  { id:11, name:'Vidarbha Sleeper',     type:'Sleeper', rating:4.3, dep:'21:00', arr:'05:30', dur:'8.5h',  price:650,  seats:32, amenities:['🛏 Sleeper','💺 AC'] },
  { id:12, name:'RedBus Premium',       type:'Volvo',   rating:4.8, dep:'23:45', arr:'07:00', dur:'7h',    price:950,  seats:28, amenities:['💺 AC','📶 WiFi','🍱 Meals'] },
  { id:13, name:'SouthLine Travels',    type:'AC',      rating:4.6, dep:'15:00', arr:'22:00', dur:'7h',    price:700,  seats:34, amenities:['💺 AC','📺 TV'] },
  { id:14, name:'NorthStar Travels',    type:'Volvo',   rating:4.7, dep:'08:00', arr:'16:00', dur:'8h',    price:880,  seats:30, amenities:['💺 AC','📶 WiFi'] },
  { id:15, name:'Eastern Express',      type:'Sleeper', rating:4.2, dep:'20:00', arr:'06:30', dur:'10h',   price:720,  seats:36, amenities:['🛏 Sleeper','🔌 USB'] },
];

// ═══════════════════════════════════════════════════════════
// GET /api/buses/search?from=Mumbai&to=Pune&date=2024-12-25
// ═══════════════════════════════════════════════════════════
router.get('/search', async (req, res) => {
  const { from, to, date, type } = req.query;

  if (!from || !to || !date) {
    return res.status(400).json({ success: false, message: 'from, to and date are required.' });
  }

  try {
    // Get all confirmed bookings for this route+date to show live seat availability
    const existingBookings = await Booking.find({
      from, to, date,
      status: { $in: ['confirmed', 'pending'] },
    }).select('busId seats');

    // Build a map of busId → booked seats array
    const bookedSeatsMap = {};
    existingBookings.forEach(b => {
      if (!bookedSeatsMap[b.busId]) bookedSeatsMap[b.busId] = [];
      bookedSeatsMap[b.busId].push(...b.seats);
    });

    // Filter by bus type if provided
    let results = type ? BUS_DATA.filter(b => b.type === type) : [...BUS_DATA];

    // Attach live booked seats
    results = results.map(bus => ({
      ...bus,
      booked: bookedSeatsMap[bus.id] || [],
      availableSeats: bus.seats - (bookedSeatsMap[bus.id]?.length || 0),
    }));

    res.json({ success: true, count: results.length, buses: results });
  } catch (err) {
    console.error('Bus search error:', err.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ═══════════════════════════════════════════════════════════
// GET /api/buses/:id — single bus details
// ═══════════════════════════════════════════════════════════
router.get('/:id', (req, res) => {
  const bus = BUS_DATA.find(b => b.id === parseInt(req.params.id));
  if (!bus) return res.status(404).json({ success: false, message: 'Bus not found.' });
  res.json({ success: true, bus });
});

module.exports = router;
