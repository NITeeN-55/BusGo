// routes/bookings.js  — /api/bookings
const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const User    = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All booking routes require login
router.use(protect);

// ═══════════════════════════════════════════════════════════
// POST /api/bookings  — create a new booking
// ═══════════════════════════════════════════════════════════
router.post(
  '/',
  [
    body('busId').isNumeric().withMessage('busId must be a number'),
    body('busName').notEmpty().withMessage('busName required'),
    body('from').notEmpty().withMessage('from required'),
    body('to').notEmpty().withMessage('to required'),
    body('date').notEmpty().withMessage('date required'),
    body('seats').isArray({ min: 1 }).withMessage('At least one seat required'),
    body('finalAmount').isNumeric().withMessage('finalAmount must be a number'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const {
      busId, busName, busType, from, to, date,
      depTime, arrTime, duration,
      seats, passengers,
      basePrice, discount, walletUsed, finalAmount,
      payMethod, upiApp, txnId,
    } = req.body;

    try {
      // 1. Check seat conflicts (real-time double-booking prevention)
      const conflicting = await Booking.findOne({
        busId, from, to, date,
        status: { $in: ['confirmed', 'pending'] },
        seats: { $in: seats },
      });
      if (conflicting) {
        return res.status(409).json({
          success: false,
          message: 'One or more seats were just booked by someone else. Please select different seats.',
        });
      }

      // 2. Deduct wallet balance if used
      if (walletUsed > 0) {
        const user = await User.findById(req.user._id);
        if (user.walletBalance < walletUsed) {
          return res.status(400).json({ success: false, message: 'Insufficient wallet balance.' });
        }
        user.walletBalance -= walletUsed;
        await user.save();
      }

      // 3. Create booking
      const booking = await Booking.create({
        userId: req.user._id,
        busId, busName, busType,
        from, to, date, depTime, arrTime, duration,
        seats, passengers,
        basePrice, discount, walletUsed, finalAmount,
        payMethod, upiApp, txnId,
      });

      // 4. Award loyalty points (1 point per ₹10 spent)
      const pointsEarned = Math.floor(finalAmount / 10);
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { loyaltyPoints: pointsEarned },
      });
      const updatedUser = await User.findById(req.user._id);
      updatedUser.updateLoyaltyTier();
      await updatedUser.save();

      res.status(201).json({
        success: true,
        message: 'Booking confirmed!',
        booking,
        pointsEarned,
        loyaltyTier: updatedUser.loyaltyTier,
      });
    } catch (err) {
      console.error('Booking error:', err.message);
      res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
  }
);

// ═══════════════════════════════════════════════════════════
// GET /api/bookings  — all bookings for logged-in user
// ═══════════════════════════════════════════════════════════
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .sort({ createdAt: -1 }); // newest first
    res.json({ success: true, count: bookings.length, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ═══════════════════════════════════════════════════════════
// GET /api/bookings/:id  — single booking detail
// ═══════════════════════════════════════════════════════════
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, userId: req.user._id });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found.' });
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ═══════════════════════════════════════════════════════════
// PATCH /api/bookings/:id/cancel  — cancel a booking
// ═══════════════════════════════════════════════════════════
router.patch('/:id/cancel', async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, userId: req.user._id });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found.' });
    if (booking.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Booking is already cancelled.' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ success: true, message: 'Booking cancelled.', booking });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
