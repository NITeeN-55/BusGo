// routes/auth.js  ─ /api/auth
'use strict';
const express = require('express');
const jwt     = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User    = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

const signToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

const sendAuth = (res, code, user) => {
  res.status(code).json({
    success:true,
    token: signToken(user._id),
    user: {
      id:            user._id,
      name:          user.name,
      email:         user.email,
      phone:         user.phone,
      role:          user.role,
      walletBalance: user.walletBalance,
      loyaltyPoints: user.loyaltyPoints,
      loyaltyTier:   user.loyaltyTier,
      wishlist:      user.wishlist,
    },
  });
};

// POST /api/auth/signup
router.post('/signup',
  [
    body('name').trim().isLength({min:2}).withMessage('Name ≥ 2 chars'),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({min:6}).withMessage('Password ≥ 6 chars'),
    body('phone').optional().matches(/^[6-9]\d{9}$/).withMessage('Invalid phone'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success:false, errors:errors.array() });

    try {
      if (await User.findOne({ email: req.body.email }))
        return res.status(409).json({ success:false, message:'Email already registered. Please login.' });

      const user = await User.create({ name:req.body.name, email:req.body.email, password:req.body.password, phone:req.body.phone });
      user.loyaltyPoints = 100;
      user.updateLoyaltyTier();
      await user.save();
      sendAuth(res, 201, user);
    } catch(err) {
      console.error('Signup:', err.message);
      res.status(500).json({ success:false, message:'Server error.' });
    }
  }
);

// POST /api/auth/login
router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success:false, errors:errors.array() });

    try {
      const user = await User.findOne({ email: req.body.email }).select('+password');

      if (user && user.isLocked()) {
        const mins = Math.ceil((user.lockUntil - Date.now()) / 60000);
        return res.status(403).json({ success:false, message:`Account locked. Try again in ${mins} minute(s).` });
      }

      if (!user || !(await user.comparePassword(req.body.password))) {
        if (user) await user.incLoginAttempts();
        return res.status(401).json({ success:false, message:'Invalid email or password.' });
      }

      // Reset on success
      if (user.loginAttempts > 0)
        await user.updateOne({ $set:{loginAttempts:0}, $unset:{lockUntil:1} });

      sendAuth(res, 200, user);
    } catch(err) {
      console.error('Login:', err.message);
      res.status(500).json({ success:false, message:'Server error.' });
    }
  }
);

// GET /api/auth/me
router.get('/me', protect, (req, res) => res.json({ success:true, user:req.user }));

// PATCH /api/auth/wallet
router.patch('/wallet', protect, async (req, res) => {
  const amount = Number(req.body.amount);
  if (!amount || amount < 1 || amount > 50000)
    return res.status(400).json({ success:false, message:'Amount must be ₹1–₹50,000.' });
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { $inc:{walletBalance:amount} }, { new:true });
    res.json({ success:true, walletBalance:user.walletBalance });
  } catch(err) { res.status(500).json({ success:false, message:'Server error.' }); }
});

// PATCH /api/auth/wishlist
router.patch('/wishlist', protect, async (req, res) => {
  if (!req.body.busId) return res.status(400).json({ success:false, message:'busId required.' });
  try {
    const user = await User.findById(req.user._id);
    const idx  = user.wishlist.indexOf(req.body.busId);
    if (idx === -1) user.wishlist.push(req.body.busId);
    else            user.wishlist.splice(idx, 1);
    await user.save();
    res.json({ success:true, wishlist:user.wishlist });
  } catch(err) { res.status(500).json({ success:false, message:'Server error.' }); }
});

module.exports = router;
