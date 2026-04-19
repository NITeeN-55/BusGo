// server.js  ─ BusGo API v2
'use strict';
require('dotenv').config();

const express   = require('express');
const cors      = require('cors');
const helmet    = require('helmet');
const morgan    = require('morgan');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');

const authRoutes     = require('./routes/auth');
const busesRoutes    = require('./routes/buses');
const bookingsRoutes = require('./routes/bookings');
const refundsRoutes  = require('./routes/refunds');
const { router: adminRoutes } = require('./routes/admin');

connectDB();

const app = express();

// ── Security headers ────────────────────────────────────────
app.use(helmet({ crossOriginEmbedderPolicy:false }));

// ── CORS ─────────────────────────────────────────────────────
const allowed = [
  'http://127.0.0.1:5500','http://localhost:5500',
  'http://localhost:3000','http://127.0.0.1:3000',
  // Strip trailing slash — browsers send Origin without it
  process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, '') : null,
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    // Allow no-origin (curl, Postman, mobile) and all listed origins
    if (!origin) return cb(null, true);
    if (allowed.includes(origin)) return cb(null, true);
    // Also allow any *.vercel.app preview URL for this project
    if (/^https:\/\/bus-go[^.]*\.vercel\.app$/.test(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));

// ── Rate limiting ────────────────────────────────────────────
app.use('/api/', rateLimit({ windowMs:15*60*1000, max:200, standardHeaders:true, legacyHeaders:false,
  message:{ success:false, message:'Too many requests. Try again later.' } }));
app.use('/api/auth/login',  rateLimit({ windowMs:15*60*1000, max:10, message:{ success:false, message:'Too many login attempts. Wait 15 mins.' } }));
app.use('/api/auth/signup', rateLimit({ windowMs:15*60*1000, max:10, message:{ success:false, message:'Too many signup attempts. Wait 15 mins.' } }));

// ── Body parsing ────────────────────────────────────────────
app.use(express.json({ limit:'10kb' }));
app.use(express.urlencoded({ extended:true }));

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// ── Routes ───────────────────────────────────────────────────
app.use('/api/auth',     authRoutes);
app.use('/api/buses',    busesRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/refunds',  refundsRoutes);
app.use('/api/admin',    adminRoutes);

// ── First-time admin setup (one-time, key-protected) ─────────
app.post('/api/setup-admin', async (req, res) => {
  const { setupKey, name, email, password } = req.body;
  if (!process.env.ADMIN_SETUP_KEY || setupKey !== process.env.ADMIN_SETUP_KEY)
    return res.status(403).json({ success:false, message:'Invalid setup key.' });

  const User = require('./models/User');
  if (await User.findOne({ role:'admin' }))
    return res.status(409).json({ success:false, message:'Admin already exists. Use /api/admin/create-admin.' });

  try {
    const user  = await User.create({ name, email, password, role:'admin' });
    const jwt   = require('jsonwebtoken');
    const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET, { expiresIn:'7d' });
    res.status(201).json({ success:true, message:'Admin created! Login at /admin/', token,
      admin:{ id:user._id, name:user.name, email:user.email, role:user.role } });
  } catch(err) {
    if (err.code === 11000) return res.status(409).json({ success:false, message:'Email already taken.' });
    res.status(500).json({ success:false, message:err.message });
  }
});

// ── Health check ─────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ success:true, message:'🚌 BusGo API running!', env:process.env.NODE_ENV, ts:new Date().toISOString() }));

// ── 404 ──────────────────────────────────────────────────────
app.use('*', (req, res) => res.status(404).json({ success:false, message:`Route ${req.originalUrl} not found.` }));

// ── Global error handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status||500).json({ success:false, message: process.env.NODE_ENV === 'production' ? 'Something went wrong.' : err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚌 BusGo API running → http://localhost:${PORT}`);
  console.log(`🛡️  Admin panel   → frontend/admin/index.html`);
  console.log(`📡 Environment   → ${process.env.NODE_ENV}\n`);
});
