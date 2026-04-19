// api.js — BusGo Backend Integration
// ⚠️  Loads AFTER app.js — its function definitions override the in-memory versions.

'use strict';

const API_BASE = 'https://busgo-piik.onrender.com/api';

fetch("https://busgo-piik.onrender.com/api/routes")

// ── Token helpers ────────────────────────────────────────────
const Token = {
  get:    ()  => localStorage.getItem('busgo_token'),
  set:    (t) => localStorage.setItem('busgo_token', t),
  remove: ()  => localStorage.removeItem('busgo_token'),
  exists: ()  => !!localStorage.getItem('busgo_token'),
};

// ── Base fetch wrapper ───────────────────────────────────────
async function apiFetch(endpoint, options = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const token = Token.get();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: { ...headers, ...(options.headers || {}) },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    throw new Error('Cannot reach server. Is the backend running on port 5000?');
  }

  const data = await response.json();

  if (response.status === 401 && data.message?.includes('expired')) {
    Token.remove(); authUser = null;
    if (typeof updateAuthUI === 'function') updateAuthUI();
    showToast('Session expired. Please login again.');
    return null;
  }

  if (!response.ok) {
    throw new Error(data.errors?.[0]?.msg || data.message || 'Something went wrong.');
  }
  return data;
}

// ── API objects ──────────────────────────────────────────────
const AuthAPI = {
  async signup(name, email, password, phone) {
    const d = await apiFetch('/auth/signup', { method:'POST', body:{name,email,password,phone} });
    if (d?.token) Token.set(d.token);
    return d;
  },
  async login(email, password) {
    const d = await apiFetch('/auth/login', { method:'POST', body:{email,password} });
    if (d?.token) Token.set(d.token);
    return d;
  },
  logout()            { Token.remove(); },
  getMe()             { return apiFetch('/auth/me'); },
  addToWallet(amount) { return apiFetch('/auth/wallet',   { method:'PATCH', body:{amount} }); },
  toggleWishlist(id)  { return apiFetch('/auth/wishlist', { method:'PATCH', body:{busId:id} }); },
};

const BusesAPI = {
  search(from, to, date, type='') {
    const p = new URLSearchParams({from,to,date}); if(type) p.set('type',type);
    return apiFetch(`/buses/search?${p}`);
  },
};

const BookingsAPI = {
  create(payload) { return apiFetch('/bookings',           { method:'POST',  body:payload }); },
  getAll()        { return apiFetch('/bookings'); },
  getOne(id)      { return apiFetch(`/bookings/${id}`); },
  cancel(id)      { return apiFetch(`/bookings/${id}/cancel`, { method:'PATCH' }); },
};

const RefundsAPI = {
  submit(bookingId, reason, description, proofName) {
    return apiFetch('/refunds', { method:'POST', body:{bookingId,reason,description,proofName} });
  },
  getAll() { return apiFetch('/refunds'); },
};

// ═══════════════════════════════════════════════════════════════
// OVERRIDE doLogin()  — uses lEmail / lPassword (real HTML IDs)
// ═══════════════════════════════════════════════════════════════
async function doLogin() {
  const email    = document.getElementById('lEmail')?.value.trim();
  const password = document.getElementById('lPassword')?.value;

  document.getElementById('af-lemail')?.classList.remove('error');
  document.getElementById('af-lpassword')?.classList.remove('error');

  let ok = true;
  if (!/\S+@\S+\.\S+/.test(email))      { document.getElementById('af-lemail')?.classList.add('error');    ok=false; }
  if (!password || password.length < 6) { document.getElementById('af-lpassword')?.classList.add('error'); ok=false; }
  if (!ok) { showToast('Enter a valid email and password (min 6 chars).'); return; }

  const btn = document.querySelector('#loginForm .btn-auth-submit');
  const orig = btn?.textContent;
  if (btn) { btn.disabled=true; btn.textContent='Logging in…'; }

  try {
    const data = await AuthAPI.login(email, password);
    walletBalance = data.user.walletBalance || 0;
    loyaltyPoints = data.user.loyaltyPoints || 0;
    wishlisted    = new Set(data.user.wishlist || []);
    loginSuccess(data.user);
    console.log('MongoDB: User logged in ->', data.user.email);
  } catch(err) {
    showToast('Login failed: ' + err.message);
    document.getElementById('af-lpassword')?.classList.add('error');
  } finally {
    if (btn) { btn.disabled=false; btn.textContent=orig||'Login →'; }
  }
}

// ═══════════════════════════════════════════════════════════════
// OVERRIDE doSignup()  — uses sName / sEmail / sPhone / sPassword
// ═══════════════════════════════════════════════════════════════
async function doSignup() {
  const name     = document.getElementById('sName')?.value.trim();
  const email    = document.getElementById('sEmail')?.value.trim();
  const password = document.getElementById('sPassword')?.value;
  const phone    = document.getElementById('sPhone')?.value.trim();

  ['af-sname','af-semail','af-sphone','af-spassword'].forEach(id =>
    document.getElementById(id)?.classList.remove('error')
  );

  let ok = true;
  if (!name||name.length<2)              { document.getElementById('af-sname')?.classList.add('error');     ok=false; }
  if (!/\S+@\S+\.\S+/.test(email))      { document.getElementById('af-semail')?.classList.add('error');    ok=false; }
  if (!phone||!/^\d{10}$/.test(phone))  { document.getElementById('af-sphone')?.classList.add('error');    ok=false; }
  if (!password||password.length<6)     { document.getElementById('af-spassword')?.classList.add('error'); ok=false; }
  if (!ok) { showToast('Please fill all fields correctly.'); return; }

  const btn = document.querySelector('#signupForm .btn-auth-submit');
  const orig = btn?.textContent;
  if (btn) { btn.disabled=true; btn.textContent='Creating account…'; }

  try {
    const data = await AuthAPI.signup(name, email, password, phone);
    walletBalance = data.user.walletBalance || 0;
    loyaltyPoints = data.user.loyaltyPoints || 0;
    wishlisted    = new Set(data.user.wishlist || []);
    loginSuccess(data.user);
    console.log('MongoDB: New user saved ->', data.user.email);
  } catch(err) {
    showToast('Signup failed: ' + err.message);
    if (err.message.toLowerCase().includes('email'))
      document.getElementById('af-semail')?.classList.add('error');
  } finally {
    if (btn) { btn.disabled=false; btn.textContent=orig||'Create Account →'; }
  }
}

// ═══════════════════════════════════════════════════════════════
// OVERRIDE logout() — clears JWT token
// ═══════════════════════════════════════════════════════════════
function logout() {
  AuthAPI.logout();
  authUser = null;
  updateAuthUI();
  document.getElementById('userDropdown')?.classList.remove('open');
  showToast('Logged out successfully');
  console.log('MongoDB: Session ended — token cleared');
}

// ═══════════════════════════════════════════════════════════════
// SESSION RESTORE — restores login on page refresh if token exists
// ═══════════════════════════════════════════════════════════════
window.addEventListener('load', async () => {
  if (!Token.exists()) return;
  try {
    const data = await AuthAPI.getMe();
    if (data?.user) {
      walletBalance = data.user.walletBalance || 0;
      loyaltyPoints = data.user.loyaltyPoints || 0;
      wishlisted    = new Set(data.user.wishlist || []);
      authUser      = data.user;
      updateAuthUI();
      console.log('MongoDB: Session restored for', data.user.email);
    }
  } catch { Token.remove(); }
}, { once: true });
