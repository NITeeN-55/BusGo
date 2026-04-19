// models/User.js
'use strict';
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name:     { type:String, required:[true,'Name required'], trim:true, minlength:2, maxlength:50 },
    email:    { type:String, required:[true,'Email required'], unique:true, lowercase:true, trim:true, match:[/^\S+@\S+\.\S+$/,'Invalid email'] },
    phone:    { type:String, trim:true, match:[/^[6-9]\d{9}$/,'Invalid mobile number'] },
    password: { type:String, required:[true,'Password required'], minlength:6, select:false },

    // ── Role-based access control ─────────────────────────
    role: { type:String, enum:['user','editor','admin'], default:'user' },

    // ── Wallet & Loyalty ──────────────────────────────────
    walletBalance: { type:Number, default:0, min:0 },
    loyaltyPoints: { type:Number, default:0, min:0 },
    loyaltyTier:   { type:String, enum:['Bronze','Silver','Gold','Platinum'], default:'Bronze' },
    wishlist:      { type:[Number], default:[] },

    // ── Account flags ─────────────────────────────────────
    isActive:      { type:Boolean, default:true },

    // ── Brute-force protection ────────────────────────────
    loginAttempts: { type:Number, default:0 },
    lockUntil:     { type:Date,   default:null },
  },
  { timestamps:true }
);

userSchema.index({ email:1 });
userSchema.index({ role:1 });

// Hash password before save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

// Check if locked
userSchema.methods.isLocked = function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

// Track failed attempts (5 = 30 min lockout)
userSchema.methods.incLoginAttempts = async function() {
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({ $set:{loginAttempts:1}, $unset:{lockUntil:1} });
  }
  const updates = { $inc:{loginAttempts:1} };
  if (this.loginAttempts + 1 >= 5) {
    updates.$set = { lockUntil: new Date(Date.now() + 30*60*1000) };
  }
  return this.updateOne(updates);
};

// Update loyalty tier
userSchema.methods.updateLoyaltyTier = function() {
  const p = this.loyaltyPoints;
  if      (p >= 5000) this.loyaltyTier = 'Platinum';
  else if (p >= 2000) this.loyaltyTier = 'Gold';
  else if (p >= 500)  this.loyaltyTier = 'Silver';
  else                this.loyaltyTier = 'Bronze';
};

module.exports = mongoose.model('User', userSchema);
