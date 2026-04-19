# 🚌 BusGo — Production-Ready Full Stack v3

## ⚡ Quick Start (3 steps)

### Step 1 — Configure environment
```bash
cd backend
cp .env.example .env
# Open .env and set your MONGO_URI password
```

### Step 2 — Start backend
```bash
npm install
npm run dev
# ✅ API running at http://localhost:5000
```

### Step 3 — Open frontend
Open `frontend/index.html` with VS Code Live Server (port 5500).

---

## 🛡️ Admin Panel Setup (one-time)

**Create first admin account:**
```bash
curl -X POST http://localhost:5000/api/setup-admin \
  -H "Content-Type: application/json" \
  -d '{
    "setupKey": "busgo_admin_setup_2024_change_me",
    "name": "Super Admin",
    "email": "admin@busgo.in",
    "password": "SecurePass123!"
  }'
```

**Then open:** `frontend/admin/index.html`

> ⚠️ After creating the first admin, change or remove `ADMIN_SETUP_KEY` from your `.env`!

---

## 📁 File Structure

```
BusGo_Final/
├── frontend/
│   ├── index.html        ← Main website (ORIGINAL — untouched)
│   ├── styles.css        ← Styles (ORIGINAL — untouched)
│   ├── app.js            ← Core SPA logic (ORIGINAL — untouched)
│   ├── api.js            ← API client (ORIGINAL — untouched)
│   ├── integration.js    ← MongoDB hooks (ORIGINAL — untouched)
│   └── admin/
│       └── index.html    ← ✨ NEW: Full admin panel (self-contained)
└── backend/
    ├── server.js         ← ✨ UPGRADED: + admin routes + setup endpoint
    ├── .env              ← Your real credentials
    ├── .env.example      ← Template
    ├── config/db.js
    ├── middleware/
    │   └── auth.js       ← ✨ UPGRADED: + adminOnly + staffOnly guards
    ├── models/
    │   ├── User.js       ← ✨ UPGRADED: + role + brute-force protection
    │   ├── Booking.js
    │   └── RefundRequest.js
    └── routes/
        ├── auth.js       ← ✨ UPGRADED: + brute-force lockout
        ├── buses.js
        ├── bookings.js
        ├── refunds.js
        └── admin.js      ← ✨ NEW: Full admin CRUD API
```

---

## 🔐 Security Additions

| Feature | Details |
|---|---|
| Brute-force protection | 5 failed logins = 30-min lockout |
| Role-based access | user / editor / admin |
| Admin route guards | `adminOnly` + `staffOnly` middleware |
| Rate limiting | 200/15min general, 10/15min auth |
| Helmet.js | Secure HTTP headers |
| JWT validation | Token expiry + format check |
| Input validation | express-validator on all POST/PATCH |

---

## 🎛️ Admin Panel Features

- **Dashboard** — Stats, revenue chart, bus type chart, recent activity
- **Users** — Search, filter, view, edit role/status, delete
- **Bookings** — Filter by status/PNR, cancel bookings
- **Buses** — Add / Edit / Delete buses (full form)
- **Refunds** — Approve (auto-credits wallet) / Reject with notes
- **Settings** — Promote users to admin, API health check

---

## 🌐 API Endpoints

### Public
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET  /api/buses/search`

### Protected (JWT required)
- `GET    /api/auth/me`
- `PATCH  /api/auth/wallet`
- `PATCH  /api/auth/wishlist`
- `POST   /api/bookings`
- `GET    /api/bookings` (my bookings)
- `POST   /api/refunds`
- `GET    /api/refunds` (my refunds)

### Admin only (JWT + role=admin)
- `GET    /api/admin/dashboard`
- `GET    /api/admin/users`
- `PATCH  /api/admin/users/:id`
- `DELETE /api/admin/users/:id`
- `GET    /api/admin/bookings`
- `PATCH  /api/admin/bookings/:id`
- `GET    /api/admin/refunds`
- `PATCH  /api/admin/refunds/:id`
- `GET    /api/admin/buses`
- `POST   /api/admin/buses`
- `PATCH  /api/admin/buses/:id`
- `DELETE /api/admin/buses/:id`
- `POST   /api/admin/create-admin`

### Setup (key-protected, one-time)
- `POST /api/setup-admin`
