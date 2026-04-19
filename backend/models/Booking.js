// models/Booking.js
const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema(
  {
    name:   { type: String, required: true, trim: true },
    age:    { type: Number, required: true, min: 1, max: 120 },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  },
  { _id: false }
);

const bookingSchema = new mongoose.Schema(
  {
    // Reference to the user who made the booking
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // Bus details (snapshot from BUS_DATA at booking time)
    busId:   { type: Number, required: true },
    busName: { type: String, required: true },
    busType: { type: String, required: true },

    // Route
    from:     { type: String, required: true },
    to:       { type: String, required: true },
    date:     { type: String, required: true },      // 'YYYY-MM-DD'
    depTime:  { type: String },
    arrTime:  { type: String },
    duration: { type: String },

    // Seats & passengers
    seats:      { type: [Number], required: true },  // e.g. [3, 7]
    passengers: { type: [passengerSchema], default: [] },

    // Pricing
    basePrice:    { type: Number, required: true },
    discount:     { type: Number, default: 0 },
    walletUsed:   { type: Number, default: 0 },
    finalAmount:  { type: Number, required: true },

    // Payment
    payMethod:    { type: String },  // 'card','upi','wallet','netbanking'
    upiApp:       { type: String },
    txnId:        { type: String },

    // Status lifecycle
    status: {
      type: String,
      enum: ['confirmed', 'cancelled', 'completed', 'pending'],
      default: 'confirmed',
    },

    // PNR — unique booking reference
    pnr: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

// Auto-generate a short PNR before saving
bookingSchema.pre('save', function (next) {
  if (!this.pnr) {
    this.pnr = 'BG' + Date.now().toString(36).toUpperCase().slice(-6);
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
