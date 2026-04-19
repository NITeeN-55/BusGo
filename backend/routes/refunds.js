// routes/refunds.js  — /api/refunds
const express = require('express');
const { body, validationResult } = require('express-validator');
const RefundRequest = require('../models/RefundRequest');
const Booking       = require('../models/Booking');
const User          = require('../models/User');
const { protect }   = require('../middleware/auth');

const router = express.Router();
router.use(protect);

// ═══════════════════════════════════════════════════════════
// POST /api/refunds  — submit a refund request
// ═══════════════════════════════════════════════════════════
router.post(
  '/',
  [
    body('bookingId').notEmpty().withMessage('bookingId required'),
    body('reason').notEmpty().withMessage('reason required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { bookingId, reason, description, proofName } = req.body;

    try {
      // Validate booking belongs to user
      const booking = await Booking.findOne({ _id: bookingId, userId: req.user._id });
      if (!booking) return res.status(404).json({ success: false, message: 'Booking not found.' });
      if (booking.status === 'cancelled') {
        return res.status(400).json({ success: false, message: 'Booking is already cancelled.' });
      }

      // Prevent duplicate refund requests
      const existing = await RefundRequest.findOne({ bookingId, userId: req.user._id });
      if (existing) {
        return res.status(409).json({ success: false, message: 'Refund request already submitted for this booking.' });
      }

      // Calculate refund amount (80% refund policy)
      const refundAmount = Math.round(booking.finalAmount * 0.8);

      const refund = await RefundRequest.create({
        userId:       req.user._id,
        bookingId:    booking._id,
        userName:     req.user.name,
        from:         booking.from,
        to:           booking.to,
        busName:      booking.busName,
        amount:       booking.finalAmount,
        refundAmount,
        payMethod:    booking.payMethod,
        reason,
        description,
        proofName,
      });

      // Mark booking as cancelled
      booking.status = 'cancelled';
      await booking.save();

      res.status(201).json({ success: true, message: 'Refund request submitted.', refund });
    } catch (err) {
      console.error('Refund error:', err.message);
      res.status(500).json({ success: false, message: 'Server error.' });
    }
  }
);

// ═══════════════════════════════════════════════════════════
// GET /api/refunds  — all refund requests by logged-in user
// ═══════════════════════════════════════════════════════════
router.get('/', async (req, res) => {
  try {
    const refunds = await RefundRequest.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: refunds.length, refunds });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
