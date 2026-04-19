// middleware/auth.js
'use strict';
const jwt  = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    const h = req.headers.authorization;
    if (!h || !h.startsWith('Bearer '))
      return res.status(401).json({ success:false, message:'Not authorised. No token.' });

    const decoded = jwt.verify(h.split(' ')[1], process.env.JWT_SECRET);
    const user    = await User.findById(decoded.id).select('-password');

    if (!user)          return res.status(401).json({ success:false, message:'User not found.' });
    if (!user.isActive) return res.status(403).json({ success:false, message:'Account deactivated. Contact support.' });
    if (user.isLocked()) return res.status(403).json({ success:false, message:'Account temporarily locked.' });

    req.user = user;
    next();
  } catch(err) {
    if (err.name === 'TokenExpiredError')
      return res.status(401).json({ success:false, message:'Session expired. Please login again.' });
    return res.status(401).json({ success:false, message:'Invalid token.' });
  }
};

const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin')
    return res.status(403).json({ success:false, message:'Admin privileges required.' });
  next();
};

const staffOnly = (req, res, next) => {
  if (!req.user || !['admin','editor'].includes(req.user.role))
    return res.status(403).json({ success:false, message:'Staff privileges required.' });
  next();
};

module.exports = { protect, adminOnly, staffOnly };
