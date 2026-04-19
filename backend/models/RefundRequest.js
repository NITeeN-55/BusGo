// models/RefundRequest.js
const mongoose = require('mongoose');

const refundSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },

    // Snapshot details for display
    userName:    { type: String },
    from:        { type: String },
    to:          { type: String },
    busName:     { type: String },
    amount:      { type: Number },        // original booking amount
    refundAmount:{ type: Number },        // amount to be refunded
    payMethod:   { type: String },

    // User's refund request info
    reason:      { type: String },
    description: { type: String },
    proofName:   { type: String },

    // Admin processing
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    adminNote:   { type: String },
    gatewayRef:  { type: String },        // e.g. UTR number after refund
    reviewedAt:  { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('RefundRequest', refundSchema);
