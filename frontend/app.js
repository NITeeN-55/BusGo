'use strict';

// ============================================================
// DATA
// ============================================================

const CITIES = [
  'Mumbai','Pune','Delhi','Jaipur','Bangalore','Chennai','Hyderabad','Kolkata',
  'Ahmedabad','Surat','Nagpur','Nashik','Lucknow','Kanpur','Indore','Bhopal',
  'Vadodara','Coimbatore','Kochi','Goa','Chandigarh','Amritsar','Bhubaneswar',
  'Visakhapatnam','Mangalore','Mysore','Trichy','Madurai','Tirupati','Vijayawada',

  // Added cities
  'Gondia','Akola','Amravati','Yavatmal','Wardha','Chandrapur','Latur','Solapur',
  'Aurangabad','Jalgaon','Kolhapur','Satara','Ratnagiri',

  'Varanasi','Prayagraj','Gorakhpur','Dehradun','Haridwar','Shimla','Manali',
  'Jammu','Srinagar',

  'Ranchi','Jamshedpur','Dhanbad','Siliguri','Guwahati','Agartala',

  'Hubli','Belgaum','Udupi','Kozhikode','Thrissur','Kanyakumari',

  'Rajkot','Bhavnagar','Udaipur','Jodhpur','Ajmer'
];

const BUS_DATA = [
  { id:1, name:'Sharma Travels',  type:'AC',     rating:4.7, dep:'06:00', arr:'12:00', dur:'6h',   price:580, seats:32, booked:[2,5,8,11,14,17], amenities:['💺 AC','📺 TV','🔌 USB'] },
  { id:2, name:'Royal Travels',   type:'Volvo',  rating:4.9, dep:'07:30', arr:'14:30', dur:'7h',   price:850, seats:28, booked:[1,4,7,13,19,22], amenities:['💺 AC','🍱 Meals','📶 WiFi'] },
  { id:3, name:'VRL Express',     type:'Sleeper',rating:4.3, dep:'22:00', arr:'06:00', dur:'8h',   price:680, seats:36, booked:[3,6,9,12,15,20], amenities:['🛏 Sleeper','💺 AC','🔌 USB'] },
  { id:4, name:'SRS Travels',     type:'Non-AC', rating:4.1, dep:'09:00', arr:'15:00', dur:'6h',   price:320, seats:40, booked:[2,4,8,16,24,30], amenities:['🚌 Standard'] },
  { id:5, name:'Orange Tours',    type:'AC',     rating:4.5, dep:'14:30', arr:'20:30', dur:'6h',   price:620, seats:34, booked:[5,10,15,20,25], amenities:['💺 AC','📶 WiFi','🔌 USB'] },
  { id:6, name:'Paulo Travels',   type:'Volvo',  rating:4.8, dep:'23:00', arr:'07:00', dur:'8h',   price:920, seats:26, booked:[1,3,7,11,15,19], amenities:['💺 AC','🍱 Meals','📶 WiFi','🛏 Sleeper'] },
  { id:7, name:'Neeta Tours',     type:'AC',     rating:4.2, dep:'16:00', arr:'23:00', dur:'7h',   price:550, seats:38, booked:[6,12,18,24,30], amenities:['💺 AC','🔌 USB'] },
  { id:8, name:'Patel Travels',   type:'Sleeper',rating:4.6, dep:'20:30', arr:'05:00', dur:'8.5h', price:760, seats:30, booked:[2,7,14,21,28], amenities:['🛏 Sleeper','💺 AC','🍱 Snacks'] },

  // Added buses
  { id:9,  name:'Maharashtra Express', type:'AC',     rating:4.4, dep:'05:30', arr:'11:30', dur:'6h',   price:500, seats:36, booked:[3,9,15,21], amenities:['💺 AC','🔌 USB'] },
  { id:10, name:'Gondia Travels',      type:'Non-AC', rating:4.0, dep:'07:00', arr:'13:30', dur:'6.5h', price:300, seats:40, booked:[2,8,14,20], amenities:['🚌 Standard'] },
  { id:11, name:'Vidarbha Sleeper',    type:'Sleeper',rating:4.3, dep:'21:00', arr:'05:30', dur:'8.5h', price:650, seats:32, booked:[1,5,10,18], amenities:['🛏 Sleeper','💺 AC'] },
  { id:12, name:'RedBus Premium',      type:'Volvo',  rating:4.8, dep:'23:45', arr:'07:00', dur:'7h',   price:950, seats:28, booked:[4,6,12,16], amenities:['💺 AC','📶 WiFi','🍱 Meals'] },
  { id:13, name:'SouthLine Travels',   type:'AC',     rating:4.6, dep:'15:00', arr:'22:00', dur:'7h',   price:700, seats:34, booked:[7,14,21], amenities:['💺 AC','📺 TV'] },
  { id:14, name:'NorthStar Travels',   type:'Volvo',  rating:4.7, dep:'08:00', arr:'16:00', dur:'8h',   price:880, seats:30, booked:[3,11,19], amenities:['💺 AC','📶 WiFi'] },
  { id:15, name:'Eastern Express',     type:'Sleeper',rating:4.2, dep:'20:00', arr:'06:30', dur:'10h',  price:720, seats:36, booked:[6,12,18], amenities:['🛏 Sleeper','🔌 USB'] },
];

const POPULAR_ROUTES = [
  {from:'Mumbai',    to:'Pune',         duration:'2.5h', from_price:150},
  {from:'Delhi',     to:'Jaipur',       duration:'4.5h', from_price:300},
  {from:'Bangalore', to:'Chennai',      duration:'6h',   from_price:450},
  {from:'Hyderabad', to:'Bangalore',    duration:'8h',   from_price:500},
  {from:'Ahmedabad', to:'Mumbai',       duration:'7h',   from_price:400},
  {from:'Delhi',     to:'Agra',         duration:'3h',   from_price:200},
  {from:'Pune',      to:'Goa',          duration:'8h',   from_price:600},
  {from:'Chennai',   to:'Coimbatore',   duration:'5h',   from_price:350},

  // Gondia routes
  {from:'Nagpur',  to:'Gondia',    duration:'2h',   from_price:150},
  {from:'Gondia',  to:'Raipur',    duration:'3.5h', from_price:250},
  {from:'Gondia',  to:'Jabalpur',  duration:'5h',   from_price:400},

  // Additional routes
  {from:'Mumbai',  to:'Nagpur',    duration:'14h',  from_price:900},
  {from:'Pune',    to:'Nashik',    duration:'5h',   from_price:350},
  {from:'Nagpur',  to:'Amravati',  duration:'3h',   from_price:200},
  {from:'Delhi',   to:'Manali',    duration:'12h',  from_price:1200},
  {from:'Delhi',   to:'Chandigarh',duration:'5h',   from_price:400},
  {from:'Bangalore', to:'Mysore',  duration:'3h',   from_price:250},
  {from:'Chennai',   to:'Madurai', duration:'7h',   from_price:500},
  {from:'Kolkata', to:'Siliguri',  duration:'10h',  from_price:700},
  {from:'Ranchi',  to:'Patna',     duration:'6h',   from_price:450},
  {from:'Ahmedabad', to:'Udaipur', duration:'5h',   from_price:400},
  {from:'Jaipur',    to:'Jodhpur', duration:'6h',   from_price:500}
];

// ============================================================
// STATE
// ============================================================
let authUser      = null;
let registeredUsers = [];
let myBookings    = [];
let refundRequests = [];   // { id, bookingId, userId, userName, from, to, bus, amount, refundAmount, reason, description, proofName, status, payMethod, submittedAt, reviewedAt, adminNote, gatewayRef }
let walletBalance = 0;
let loyaltyPoints = 0;
let wishlisted    = new Set();
let compareList   = [];
let notifications = [];
let chatOpen      = false;
let chatHistory   = [];
let qrTimerInterval  = null;
let currentTxn    = null;
let txnDB         = [];
let extraPassengers = [];

const MERCHANT_UPI  = '7620827589-4@ybl';
const MERCHANT_NAME = 'BusGo Technologies';

let state = {
  from:'', to:'', date:'', busTypeSearch:'',
  selectedBus:null, selectedSeats:[], discount:0,
  passenger:{}, payMethod:'card', selectedUPIApp:null
};
let activePriceFilter = 3000;
let activeTimeFilter  = 'all';

// ============================================================
// INIT
// ============================================================
window.addEventListener('load', () => {
  const today = new Date().toISOString().split('T')[0];
  const dateEl = document.getElementById('travelDate');
  if (dateEl) { dateEl.value = today; dateEl.min = today; }
  renderPopularRoutes();
  initCardFormatting();
  initNotifications();
  initTicker();
  initFeatures();
  initTestimonials();
  initCountUp();

  document.addEventListener('click', e => {
    if (!e.target.closest('.field-wrap'))      closeDropdowns();
    if (!e.target.closest('.user-avatar-wrap')) document.getElementById('userDropdown')?.classList.remove('open');
    if (!e.target.closest('#notifWrap'))        document.getElementById('notifPanel')?.classList.remove('open');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeAuth(); closePage(); closeUPIModal(); closeWallet(); closeRewards(); closeCompare(); }
  });
  window.addEventListener('scroll', () => {
    document.getElementById('scrollTopBtn')?.classList.toggle('visible', window.scrollY > 400);
  });
});

// ============================================================
// DARK MODE
// ============================================================
function toggleDark() {
  const t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', t);
  document.getElementById('darkBtn').textContent = t === 'dark' ? '☀️' : '🌙';
}

// ============================================================
// MOBILE MENU
// ============================================================
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ============================================================
// POPULAR ROUTES
// ============================================================
function renderPopularRoutes() {
  const c = document.getElementById('popularRoutes');
  if (!c) return;
  c.innerHTML = POPULAR_ROUTES.map(r => `
    <div class="route-card" onclick="quickSearch('${r.from}','${r.to}')">
      <div class="route-cities">${r.from} → ${r.to}</div>
      <div class="route-info">⏱ ${r.duration}</div>
      <div class="route-price">From ₹${r.from_price}</div>
    </div>`).join('');
}

// ============================================================
// CITY AUTOCOMPLETE
// ============================================================
function showSuggestions(type, val) {
  const id = type === 'from' ? 'fromDropdown' : 'toDropdown';
  const el = document.getElementById(id);
  if (!el) return;
  const filtered = CITIES.filter(c => c.toLowerCase().startsWith(val.toLowerCase())).slice(0, 6);
  if (!filtered.length || !val) { el.classList.remove('open'); return; }
  el.innerHTML = filtered.map(c => `<div class="dropdown-item" onclick="selectCity('${type}','${c}')"><span class="icon">📍</span>${c}</div>`).join('');
  el.classList.add('open');
}
function selectCity(type, city) {
  if (type === 'from') { document.getElementById('fromCity').value = city; state.from = city; }
  else                  { document.getElementById('toCity').value   = city; state.to   = city; }
  closeDropdowns();
}
function closeDropdowns() {
  document.querySelectorAll('.dropdown-list').forEach(d => d.classList.remove('open'));
}
function swapCities() {
  const f = document.getElementById('fromCity').value;
  const t = document.getElementById('toCity').value;
  document.getElementById('fromCity').value = t;
  document.getElementById('toCity').value   = f;
  state.from = t; state.to = f;
}
function quickSearch(from, to) {
  document.getElementById('fromCity').value = from;
  document.getElementById('toCity').value   = to;
  state.from = from; state.to = to;
  searchBuses();
}

// ============================================================
// SEARCH & FILTER
// ============================================================
function searchBuses() {
  state.from          = document.getElementById('fromCity').value.trim();
  state.to            = document.getElementById('toCity').value.trim();
  state.date          = document.getElementById('travelDate').value;
  state.busTypeSearch = document.getElementById('busTypeFilter').value;
  if (!state.from || !state.to) { showToast('⚠️ Please enter From and To cities'); return; }
  if (state.from === state.to)  { showToast('⚠️ From and To cities must be different'); return; }
  showResults();
}
function showResults() {
  showPage('results-page');
  document.getElementById('resultsTitle').textContent = `${state.from} → ${state.to}`;
  const d = state.date ? new Date(state.date).toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short',year:'numeric'}) : '';
  document.getElementById('resultsMeta').textContent = `${d} · ${BUS_DATA.length} buses found`;
  applyFilters();
}
function applyFilters() {
  let buses = [...BUS_DATA];
  const checkedTypes = [...document.querySelectorAll('.filter-options input[type=checkbox]:checked')].map(x => x.value);
  if (checkedTypes.length) buses = buses.filter(b => checkedTypes.includes(b.type));
  buses = buses.filter(b => b.price <= activePriceFilter);
  if (activeTimeFilter !== 'all') {
    buses = buses.filter(b => {
      const h = parseInt(b.dep.split(':')[0]);
      if (activeTimeFilter === 'morning')   return h >= 5  && h < 12;
      if (activeTimeFilter === 'afternoon') return h >= 12 && h < 17;
      if (activeTimeFilter === 'evening')   return h >= 17 && h < 21;
      if (activeTimeFilter === 'night')     return h >= 21 || h < 5;
      return true;
    });
  }
  const minRating = parseFloat(document.querySelector('input[name="rating"]:checked')?.value || 0);
  if (minRating > 0) buses = buses.filter(b => b.rating >= minRating);
  const sort = document.getElementById('sortBy')?.value || 'price';
  if (sort === 'price')       buses.sort((a,b) => a.price  - b.price);
  else if (sort === 'price-desc') buses.sort((a,b) => b.price  - a.price);
  else if (sort === 'departure')  buses.sort((a,b) => a.dep.localeCompare(b.dep));
  else if (sort === 'rating')     buses.sort((a,b) => b.rating - a.rating);
  renderBuses(buses);
}
function updatePrice(val) {
  activePriceFilter = parseInt(val);
  document.getElementById('priceLabel').textContent = `₹${val}`;
  applyFilters();
}
function filterTime(el, t) {
  document.querySelectorAll('.time-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  activeTimeFilter = t;
  applyFilters();
}
function renderBuses(buses) {
  const c = document.getElementById('busList');
  if (!c) return;
  if (!buses.length) {
    c.innerHTML = '<div style="text-align:center;padding:60px 20px;color:var(--text2)"><div style="font-size:3rem;margin-bottom:12px">🚫</div><h3>No buses found</h3><p>Try adjusting your filters</p></div>';
    return;
  }
  c.innerHTML = buses.map((b, i) => `
    <div class="bus-card" style="animation-delay:${i*0.06}s">
      <div class="bus-card-header">
        <div>
          <div class="bus-name">${b.name}</div>
          <div class="bus-type-badge">${b.type}</div>
        </div>
        <div class="bus-rating">⭐ ${b.rating}</div>
        <div style="display:flex;gap:24px;align-items:center">
          <div class="time-block"><div class="time">${b.dep}</div><div class="label">Dep</div></div>
          <div class="duration-block">
            <div class="duration-line"><div class="dur-dash"></div><div class="dur-icon">🚌</div><div class="dur-dash"></div></div>
            <div class="dur">${b.dur}</div>
          </div>
          <div class="time-block"><div class="time">${b.arr}</div><div class="label">Arr</div></div>
        </div>
        <div class="price-block"><div class="from">from</div><div class="amount">₹${b.price}</div></div>
        <button class="btn-view-seats" onclick="selectBus(${b.id})">Select Seats →</button>
      </div>
      <div class="bus-card-footer">
        <div class="seat-count">🪑 <span class="num">${b.seats - b.booked.length}</span> seats available</div>
        <div class="amenities">${b.amenities.map(a => `<span class="amenity">${a}</span>`).join('')}</div>
      </div>
      <div class="bus-card-actions">
        <button class="btn-wishlist ${wishlisted.has(b.id)?'active':''}" id="wish${b.id}" onclick="toggleWishlist(${b.id},this)" title="Save route">${wishlisted.has(b.id)?'♥':'♡'}</button>
        <button class="add-compare-btn" onclick="addToCompare(${b.id})">⚖️ Compare</button>
      </div>
    </div>`).join('');
}

// ============================================================
// SEAT SELECTION
// ============================================================
function selectBus(id) {
  state.selectedBus   = BUS_DATA.find(b => b.id === id);
  state.selectedSeats = [];
  state.discount      = 0;
  document.getElementById('couponInput').value            = '';
  document.getElementById('couponSuccess').style.display  = 'none';
  document.getElementById('discountRow').style.display    = 'none';
  showPage('seat-page');
  renderStepBar('stepBar', 2);
  renderSeatGrid();
  updateSummary();
}
function renderSeatGrid() {
  const bus = state.selectedBus;
  document.getElementById('seatPanelTitle').textContent = `${bus.name} – ${bus.type}`;
  document.getElementById('sumBusName').textContent = bus.name;
  document.getElementById('sumRoute').textContent   = `${state.from} → ${state.to}`;
  document.getElementById('sumDate').textContent    = state.date ? new Date(state.date).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : '—';
  document.getElementById('sumDep').textContent     = bus.dep;
  const grid = document.getElementById('seatGrid');
  grid.innerHTML = '';
  for (let i = 1; i <= bus.seats; i++) {
    const col = ((i-1) % 4) + 1;
    if (col === 3) grid.insertAdjacentHTML('beforeend', `<div class="seat seat-aisle"></div>`);
    const cls = bus.booked.includes(i) ? 'booked' : wishlisted.has(bus.id) ? 'available' : 'available';
    grid.insertAdjacentHTML('beforeend', `<div class="seat ${cls}" id="s${i}" onclick="toggleSeat(${i})">${i}</div>`);
  }
}
function toggleSeat(num) {
  const bus = state.selectedBus;
  if (bus.booked.includes(num)) return;
  const idx = state.selectedSeats.indexOf(num);
  if (idx > -1) {
    state.selectedSeats.splice(idx, 1);
    document.getElementById('s'+num).className = 'seat available';
  } else {
    if (state.selectedSeats.length >= 6) { showToast('⚠️ Max 6 seats per booking'); return; }
    state.selectedSeats.push(num);
    document.getElementById('s'+num).className = 'seat selected';
  }
  updateSummary();
}
function updateSummary() {
  const bus  = state.selectedBus;
  const cnt  = state.selectedSeats.length;
  const chips = document.getElementById('selectedChips');
  if (chips) chips.innerHTML = cnt ? state.selectedSeats.map(s=>`<div class="seat-chip">S${s}</div>`).join('') : '<span style="color:var(--text3);font-size:0.82rem">No seats selected</span>';
  const subtotal = bus.price * cnt;
  const total    = Math.max(0, subtotal - state.discount);
  const totalEl  = document.getElementById('totalAmt');
  if (totalEl) totalEl.textContent = `₹${total}`;
  const sumPrice = document.getElementById('sumPrice');
  if (sumPrice) sumPrice.textContent = `₹${bus.price}`;
  const sumSeats = document.getElementById('sumSeats');
  if (sumSeats) sumSeats.textContent = cnt;
  const procBtn = document.getElementById('proceedBtn');
  if (procBtn) procBtn.disabled = cnt === 0;
}

// ============================================================
// COUPON
// ============================================================
function applyCoupon() {
  const code = document.getElementById('couponInput')?.value.trim().toUpperCase();
  const coupons = { 'BUSGO10':100, 'FIRST50':50, 'SAVE20':200, 'WELCOME':150, 'FESTIVE15':150, 'REFER100':100 };
  if (coupons[code]) {
    state.discount = coupons[code];
    if (document.getElementById('discountAmt'))   document.getElementById('discountAmt').textContent   = coupons[code];
    if (document.getElementById('couponSuccess')) document.getElementById('couponSuccess').style.display = 'block';
    if (document.getElementById('discountRow'))   document.getElementById('discountRow').style.display   = 'flex';
    if (document.getElementById('discountDisplay')) document.getElementById('discountDisplay').textContent = `-₹${coupons[code]}`;
    updateSummary();
    showToast('🎉 Coupon applied!');
  } else {
    showToast('❌ Invalid coupon code');
    state.discount = 0;
    if (document.getElementById('couponSuccess')) document.getElementById('couponSuccess').style.display = 'none';
    if (document.getElementById('discountRow'))   document.getElementById('discountRow').style.display   = 'none';
    updateSummary();
  }
}

// ============================================================
// DETAILS & PAYMENT
// ============================================================
function goDetails() {
  if (state.selectedSeats.length === 0) { showToast('⚠️ Please select at least one seat'); return; }
  showPage('details-page');
  renderStepBar('stepBar2', 3);
  // Pre-fill from logged-in user
  if (authUser) {
    if (document.getElementById('pName'))  document.getElementById('pName').value  = authUser.name  || '';
    if (document.getElementById('pEmail')) document.getElementById('pEmail').value = authUser.email || '';
    if (document.getElementById('pPhone') && authUser.phone) document.getElementById('pPhone').value = authUser.phone;
  }
  // Update total shown on details page
  const total = Math.max(0, state.selectedBus.price * state.selectedSeats.length - state.discount);
  const detailTotal = document.getElementById('detailTotal');
  if (detailTotal) detailTotal.textContent = `₹${total}`;
  // Reset extra passengers
  extraPassengers = [];
  const epContainer = document.getElementById('extraPassengersContainer');
  if (epContainer) epContainer.innerHTML = '';
}

function selectPay(el, method) {
  document.querySelectorAll('.pay-method').forEach(m => m.classList.remove('active'));
  el.classList.add('active');
  state.payMethod = method;
  const cardFields   = document.getElementById('cardFields');
  const upiField     = document.getElementById('upiField');
  const walletField  = document.getElementById('walletField');
  if (cardFields)  cardFields.style.display  = method === 'card'   ? 'block' : 'none';
  if (upiField)    upiField.style.display    = method === 'upi'    ? 'block' : 'none';
  if (walletField) walletField.style.display = method === 'wallet' ? 'block' : 'none';
  const total = Math.max(0, state.selectedBus.price * state.selectedSeats.length - state.discount);
  const detailTotal = document.getElementById('detailTotal');
  if (detailTotal) detailTotal.textContent = `₹${total}`;
  // Show wallet balance info when wallet selected
  if (method === 'wallet') {
    const wBal  = document.getElementById('walletBalanceDisplay');
    const wNote = document.getElementById('walletPayNote');
    if (wBal) wBal.textContent = `₹${walletBalance.toLocaleString('en-IN')}`;
    if (wNote) {
      if (!authUser) {
        wNote.textContent = '⚠️ Please login to use wallet';
        wNote.style.color = 'var(--red)';
      } else if (walletBalance < total) {
        wNote.innerHTML = `⚠️ Insufficient balance (₹${walletBalance}). <span style="color:var(--accent);cursor:pointer;font-weight:700" onclick="openWallet()">Add Money →</span>`;
        wNote.style.color = 'var(--red)';
      } else {
        wNote.textContent = `✅ Sufficient balance. ₹${total} will be deducted.`;
        wNote.style.color = 'var(--green)';
      }
    }
  }
}

function processPayment() {
  const name  = document.getElementById('pName')?.value.trim()  || '';
  const phone = document.getElementById('pPhone')?.value.trim() || '';
  const email = document.getElementById('pEmail')?.value.trim() || '';
  const age   = document.getElementById('pAge')?.value          || '';
  let ok = true;
  ['ff-name','ff-phone','ff-email','ff-age'].forEach(id => document.getElementById(id)?.classList.remove('error'));
  if (!name)                                                { document.getElementById('ff-name')?.classList.add('error');  ok = false; }
  if (!/^\d{10}$/.test(phone))                             { document.getElementById('ff-phone')?.classList.add('error'); ok = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))          { document.getElementById('ff-email')?.classList.add('error'); ok = false; }
  if (!age || parseInt(age) < 5 || parseInt(age) > 100)   { document.getElementById('ff-age')?.classList.add('error');   ok = false; }
  // Card validation
  if (state.payMethod === 'card') {
    const card   = document.getElementById('pCard')?.value.replace(/\s/g,'') || '';
    const expiry = document.getElementById('pExpiry')?.value || '';
    const cvv    = document.getElementById('pCVV')?.value    || '';
    if (card.length < 15 || card.length > 19 || !/^\d+$/.test(card)) {
      document.getElementById('ff-card')?.classList.add('error'); ok = false;
      showToast('❌ Enter a valid card number');
    } else if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      showToast('❌ Enter expiry as MM/YY'); ok = false;
    } else if (!/^\d{3,4}$/.test(cvv)) {
      showToast('❌ Enter a valid CVV'); ok = false;
    } else {
      const [mm, yy] = expiry.split('/').map(Number);
      const now = new Date();
      if (mm < 1 || mm > 12 || yy < (now.getFullYear() % 100) || (yy === (now.getFullYear() % 100) && mm < now.getMonth()+1)) {
        showToast('❌ Card has expired'); ok = false;
      }
    }
  }
  if (!ok) return;
  state.passenger = { name, phone, email, age: parseInt(age) };

  if (state.payMethod === 'upi') {
    const total = Math.max(0, state.selectedBus.price * state.selectedSeats.length - state.discount);
    openUPIGateway(total, state.selectedBus, state.selectedSeats, state.passenger);
    return;
  }

  if (state.payMethod === 'wallet') {
    if (!authUser) { showToast('⚠️ Please login to use wallet'); openAuth('login'); return; }
    const total = Math.max(0, state.selectedBus.price * state.selectedSeats.length - state.discount);
    if (walletBalance < total) {
      showToast(`❌ Insufficient wallet balance (₹${walletBalance}). Please add ₹${total - walletBalance} more.`);
      openWallet(); return;
    }
    // Deduct and proceed
    walletBalance -= total;
    walletTxns.unshift({ icon:'🎫', bg:'rgba(232,82,26,0.1)', title:'Ticket Payment', date:'Just now', amt:-total, type:'debit' });
    document.getElementById('walletAmt').textContent = `₹${walletBalance.toLocaleString('en-IN')}`;
    document.getElementById('payLoader').classList.add('show');
    setTimeout(() => { document.getElementById('payLoader').classList.remove('show'); showConfirmation(); }, 1500);
    return;
  }
  document.getElementById('payLoader').classList.add('show');
  setTimeout(() => {
    document.getElementById('payLoader').classList.remove('show');
    showConfirmation();
  }, 2200);
}

// ============================================================
// CONFIRMATION & TICKET
// ============================================================
function showConfirmation() {
  const b     = state.selectedBus;
  const p     = state.passenger;
  const seats = state.selectedSeats;
  const total = Math.max(0, b.price * seats.length - state.discount);
  const bid   = 'BG' + Date.now().toString().slice(-8);

  document.getElementById('ticketId').textContent  = bid;
  document.getElementById('tcFrom').textContent    = state.from;
  document.getElementById('tcTo').textContent      = state.to;
  document.getElementById('tcDep').textContent     = b.dep;
  document.getElementById('tcArr').textContent     = b.arr;
  document.getElementById('tcName').textContent    = p.name;
  document.getElementById('tcBus').textContent     = b.name;
  document.getElementById('tcSeats').textContent   = seats.join(', ');
  document.getElementById('tcDate').textContent    = state.date ? new Date(state.date).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : 'Today';
  document.getElementById('tcPhone').textContent   = p.phone;
  document.getElementById('tcAmount').textContent  = `₹${total}`;

  // Ticket QR Code
  const qrEl = document.getElementById('qrCode');
  qrEl.innerHTML = '';
  qrEl.className = 'ticket-qr-real';
  const ticketUrl = `https://busgo.in/ticket?id=${bid}&from=${encodeURIComponent(state.from)}&to=${encodeURIComponent(state.to)}`;
  try {
    new QRCode(qrEl, { text: ticketUrl, width:120, height:120, colorDark:'#1a1814', colorLight:'#ffffff', correctLevel: QRCode.CorrectLevel.M });
    const cap = document.createElement('div');
    cap.className = 'qr-caption';
    cap.textContent = `Ticket QR · ${bid}`;
    qrEl.appendChild(cap);
  } catch(e) { qrEl.textContent = `📱 ${bid}`; }

  // Save booking (in-memory)
  const bookingRecord = {
    id:bid, from:state.from, to:state.to, bus:b.name, type:b.type,
    date:state.date, dep:b.dep, arr:b.arr, seats:seats.join(', '),
    amount:total, status:'confirmed', passenger:p.name, payMethod:state.payMethod,
    createdAt:Date.now()
  };
  myBookings.unshift(bookingRecord);

  // Save booking to MongoDB (runs in background, does not block UI)
  if (typeof saveBookingToDB === 'function') {
    saveBookingToDB(bookingRecord, state, total);
  }

  showPage('confirm-page');
  launchConfetti();

  // Award loyalty points: 1pt per ₹10
  const pts = Math.floor(total / 10);
  if (pts > 0) setTimeout(() => awardPoints(pts), 2500);

  // Show invoice button
  setTimeout(() => {
    const actions = document.querySelector('.ticket-actions');
    if (actions && !document.getElementById('invoiceBtn')) {
      const btn = document.createElement('button');
      btn.id = 'invoiceBtn'; btn.className = 'btn-invoice';
      btn.style.cssText = 'padding:13px 24px;font-size:0.92rem';
      btn.innerHTML = '🧾 View Invoice';
      btn.onclick = () => openPage('transactions');
      actions.appendChild(btn);
    }
  }, 200);

  // Carbon tracker
  setTimeout(() => showCarbonTracker(), 400);

  // Push notification
  pushNotif('✅','rgba(45,158,107,0.1)','Booking Confirmed!',`${state.from} → ${state.to} · ₹${total} · Seats: ${seats.join(',')}`);
}

// ============================================================
// CONFETTI
// ============================================================
function launchConfetti() {
  const wrap = document.getElementById('confettiWrap');
  if (!wrap) return;
  wrap.innerHTML = '';
  const colors = ['#e8521a','#f07c4a','#2d9e6b','#f0b429','#4a90e2','#e040fb'];
  for (let i = 0; i < 80; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.cssText = `left:${Math.random()*100}%;top:${-10-Math.random()*20}px;background:${colors[Math.floor(Math.random()*colors.length)]};animation-delay:${Math.random()*2}s;animation-duration:${2+Math.random()*2}s;width:${6+Math.random()*8}px;height:${6+Math.random()*8}px;border-radius:${Math.random()>0.5?'50%':'2px'}`;
    wrap.appendChild(p);
  }
  setTimeout(() => { if (wrap) wrap.innerHTML = ''; }, 5000);
}

// ============================================================
// STEP BAR
// ============================================================
function renderStepBar(id, active) {
  const steps = ['Search','Seats','Details','Payment'];
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = steps.map((s,i) => {
    const n   = i+1;
    const cls = n < active ? 'done' : n === active ? 'active' : '';
    return `<div class="step ${cls}"><div class="step-num">${n < active ? '✓' : n}</div><div class="step-label">${s}</div></div>${i < steps.length-1 ? `<div class="step-line ${n < active ? 'done' : ''}"></div>` : ''}`;
  }).join('');
}

// ============================================================
// PAGE NAVIGATION
// ============================================================
function showPage(id) {
  ['home-page','results-page','seat-page','details-page','confirm-page'].forEach(p => {
    const el = document.getElementById(p);
    if (el) el.style.display = p === id ? 'block' : 'none';
  });
  const footer = document.getElementById('site-footer');
  if (footer) footer.style.display = id === 'home-page' ? 'block' : 'none';
  window.scrollTo(0, 0);
}
function goHome()    { showPage('home-page');    document.getElementById('mobileMenu')?.classList.remove('open'); }
function goResults() { showPage('results-page'); }
function goSeat()    { showPage('seat-page');    }

// ============================================================
// TOAST
// ============================================================
let toastTimeout = null;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.querySelector('#toastMsg').textContent = msg;
  t.classList.add('show');
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => t.classList.remove('show'), 3200);
}

// ============================================================
// CARD INPUT FORMATTING
// ============================================================
function initCardFormatting() {
  const cardEl = document.getElementById('pCard');
  if (cardEl) {
    cardEl.addEventListener('input', function() {
      let v = this.value.replace(/\D/g,'').slice(0,16);
      this.value = v.replace(/(.{4})/g,'$1 ').trim();
    });
  }
  const expiryEl = document.getElementById('pExpiry');
  if (expiryEl) {
    expiryEl.addEventListener('input', function() {
      let v = this.value.replace(/\D/g,'');
      if (v.length >= 3) v = v.slice(0,2) + '/' + v.slice(2,4);
      this.value = v;
    });
  }
}

// ============================================================
// AUTH SYSTEM
// ============================================================
function openAuth(tab = 'login') {
  document.getElementById('authOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  switchAuthTab(tab);
}
function closeAuth() {
  document.getElementById('authOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
  clearAuthErrors();
}
function handleAuthOverlayClick(e) {
  if (e.target === document.getElementById('authOverlay')) closeAuth();
}
function switchAuthTab(tab) {
  const isLogin = tab === 'login';
  document.getElementById('tabLogin')?.classList.toggle('active', isLogin);
  document.getElementById('tabSignup')?.classList.toggle('active', !isLogin);
  document.getElementById('loginForm').style.display  = isLogin ? 'block' : 'none';
  document.getElementById('signupForm').style.display = isLogin ? 'none'  : 'block';
  clearAuthErrors();
}
function clearAuthErrors() {
  document.querySelectorAll('.auth-field').forEach(f => f.classList.remove('error'));
}
function togglePw(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
  btn.textContent = input.type === 'password' ? '👁' : '🙈';
}
function showForgot() { showToast('📧 Password reset link sent to your email!'); }

function doLogin() {
  const email    = document.getElementById('lEmail').value.trim();
  const password = document.getElementById('lPassword').value;
  let ok = true;
  document.getElementById('af-lemail')?.classList.remove('error');
  document.getElementById('af-lpassword')?.classList.remove('error');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))  { document.getElementById('af-lemail')?.classList.add('error');    ok = false; }
  if (password.length < 6)                          { document.getElementById('af-lpassword')?.classList.add('error'); ok = false; }
  if (!ok) return;
  const user = registeredUsers.find(u => u.email === email && u.password === password);
  if (user) {
    loginSuccess(user);
  } else if (registeredUsers.some(u => u.email === email)) {
    document.getElementById('af-lpassword')?.classList.add('error');
    showToast('❌ Incorrect password');
  } else {
    const newUser = { name: email.split('@')[0].replace(/[._]/g,' '), email, phone:'', password };
    registeredUsers.push(newUser);
    loginSuccess(newUser);
  }
}
function doSignup() {
  const name     = document.getElementById('sName').value.trim();
  const email    = document.getElementById('sEmail').value.trim();
  const phone    = document.getElementById('sPhone').value.trim();
  const password = document.getElementById('sPassword').value;
  let ok = true;
  ['af-sname','af-semail','af-sphone','af-spassword'].forEach(id => document.getElementById(id)?.classList.remove('error'));
  if (!name || name.length < 2)                        { document.getElementById('af-sname')?.classList.add('error');     ok = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))       { document.getElementById('af-semail')?.classList.add('error');    ok = false; }
  if (!/^\d{10}$/.test(phone))                          { document.getElementById('af-sphone')?.classList.add('error');   ok = false; }
  if (password.length < 6)                              { document.getElementById('af-spassword')?.classList.add('error'); ok = false; }
  if (!ok) return;
  if (registeredUsers.some(u => u.email === email)) {
    document.getElementById('af-semail')?.classList.add('error');
    showToast('⚠️ Email already registered. Please login.'); return;
  }
  const newUser = { name, email, phone, password };
  registeredUsers.push(newUser);
  loginSuccess(newUser);
}
function doSocialLogin(provider) {
  const mockUser = { name:'Demo User', email:'demo@busgo.in', phone:'9876543210', password:'' };
  if (!registeredUsers.find(u => u.email === mockUser.email)) registeredUsers.push(mockUser);
  loginSuccess(mockUser);
}
function loginSuccess(user) {
  authUser = user;
  // Award welcome points on first login
  if (loyaltyPoints === 0) {
    loyaltyPoints = 150;
    walletBalance = 50; // welcome wallet credit
  }
  closeAuth();
  updateAuthUI();
  showToast(`🎉 Welcome back, ${user.name.split(' ')[0]}!`);
  pushNotif('🎉','rgba(232,82,26,0.1)','Welcome back!',`Hi ${user.name.split(' ')[0]}! You have ${loyaltyPoints} loyalty points.`);
}
function updateAuthUI() {
  if (authUser) {
    document.getElementById('loginBtn').style.display        = 'none';
    document.getElementById('mobileLoginBtn').style.display  = 'none';
    document.getElementById('userAvatarWrap').style.display  = 'block';
    const initials = authUser.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();
    document.getElementById('userAvatar').textContent = initials;
    document.getElementById('ddName').textContent     = authUser.name;
    document.getElementById('ddEmail').textContent    = authUser.email;
    // Show wallet + loyalty pills
    const wp = document.getElementById('walletPill');
    if (wp) { wp.style.display = 'flex'; document.getElementById('walletAmt').textContent = `₹${walletBalance.toLocaleString('en-IN')}`; }
    updateLoyaltyUI();
  } else {
    document.getElementById('loginBtn').style.display        = 'block';
    document.getElementById('mobileLoginBtn').style.display  = 'block';
    document.getElementById('userAvatarWrap').style.display  = 'none';
    const wp = document.getElementById('walletPill');  if (wp)  wp.style.display  = 'none';
    const lp = document.getElementById('loyaltyPill'); if (lp)  lp.style.display  = 'none';
  }
}
function toggleUserDD() { document.getElementById('userDropdown')?.classList.toggle('open'); }
function logout() {
  authUser = null;
  updateAuthUI();
  document.getElementById('userDropdown')?.classList.remove('open');
  showToast('👋 Logged out successfully');
}

// ============================================================
// PAGE DRAWER
// ============================================================
function openPage(pageId) {
  const overlay = document.getElementById('pageOverlay');
  const body    = document.getElementById('pageBody');
  const titles  = {
    bookings:       { title:'🎫 My Bookings',       subtitle:'View and manage your trips' },
    refundRequests: { title:'↩️ My Refunds',        subtitle:'Track your refund requests' },
    refundForm:     { title:'↩️ Request a Refund',  subtitle:'Submit your refund request' },
    transactions:   { title:'💸 Payment History',   subtitle:'All your UPI & card transactions' },
    admin:          { title:'⚙️ Admin Panel',        subtitle:'Transaction & payment dashboard' },
    priceAlerts:  { title:'🔔 Price Alerts',    subtitle:'Track fares & get notified' },
    referral:     { title:'🎁 Refer & Earn',    subtitle:'Share BusGo, earn rewards' },
    wishlist:     { title:'❤️ Saved Routes',    subtitle:'Your favourite journeys' },
    offers:       { title:'🏷️ Offers & Deals',  subtitle:'Exclusive discounts for you' },
    track:        { title:'📍 Track Bus',        subtitle:'Real-time bus location' },
    about:        { title:'🏢 About BusGo',      subtitle:'Our story and mission' },
    blog:         { title:'📝 BusGo Blog',       subtitle:'Travel tips and stories' },
    careers:      { title:'💼 Careers',           subtitle:'Join our growing team' },
    press:        { title:'📰 Press Room',         subtitle:'News and media coverage' },
    help:         { title:'❓ Help Center',        subtitle:'FAQs and support guides' },
    contact:      { title:'📞 Contact Us',         subtitle:"We're here to help 24/7" },
    refund:       { title:'↩️ Refund Policy',     subtitle:'Cancellations & refunds' },
    terms:        { title:'📋 Terms & Privacy',   subtitle:'Legal information' },
  };
  const page = titles[pageId];
  if (!page) return;
  document.getElementById('pageTitle').textContent    = page.title;
  document.getElementById('pageSubtitle').textContent = page.subtitle;
  body.innerHTML = getPageContent(pageId);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (pageId === 'help')   initFAQItems();
  if (pageId === 'track')  setTimeout(()=>{ /* track ready */ }, 100);
}
function closePage() {
  document.getElementById('pageOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}
function handlePageOverlayClick(e) {
  if (e.target === document.getElementById('pageOverlay')) closePage();
}

function getPageContent(id) {
  switch(id) {
    case 'bookings':        return getBookingsContent();
    case 'refundRequests':  return getRefundRequestsContent();
    case 'refundForm':      return getRefundFormContent(window._refundFormBookingId || null);
    case 'transactions':    return getTransactionsContent();
    case 'admin':        return getAdminContent();
    case 'priceAlerts':  return getPriceAlertsContent();
    case 'referral':     return getReferralContent();
    case 'wishlist':     return getWishlistContent();
    case 'offers':       return getOffersContent();
    case 'track':        return getTrackContent();
    case 'about':        return getAboutContent();
    case 'blog':         return getBlogContent();
    case 'careers':      return getCareersContent();
    case 'press':        return getPressContent();
    case 'help':         return getHelpContent();
    case 'contact':      return getContactContent();
    case 'refund':       return getRefundContent();
    case 'terms':        return getTermsContent();
    default:             return '<p style="padding:20px;color:var(--text2)">Coming soon.</p>';
  }
}

// ============================================================
// PAGE CONTENT
// ============================================================
function getBookingsContent() {
  if (!authUser) return `<div class="empty-state"><div class="icon">🔐</div><h3>Login to view your bookings</h3><p>Sign in to access your booking history.</p><button class="btn-search" style="margin-top:20px" onclick="closePage();openAuth('login')">Login / Sign Up →</button></div>`;
  if (!myBookings.length) return `<div class="empty-state"><div class="icon">🎫</div><h3>No bookings yet</h3><p>Your booked tickets will appear here.</p><button class="btn-search" style="margin-top:20px" onclick="closePage();goHome()">Search Buses →</button></div>`;
  return myBookings.map(b => {
    const rr = refundRequests.find(r => r.bookingId === b.id && r.userId === authUser.email);
    const statusBadge = rr ? `<div class="booking-status refund-${rr.status}">↩️ Refund ${rr.status.charAt(0).toUpperCase()+rr.status.slice(1)}</div>` : `<div class="booking-status confirmed">✓ Confirmed</div>`;
    const refundBtn = !rr
      ? `<button class="btn-refund-req" onclick="openRefundForm('${b.id}')">↩️ Request Refund</button>`
      : `<button class="btn-refund-req secondary" onclick="openPage('refundRequests')">↩️ View Refund Status</button>`;
    return `
    <div class="booking-card ${rr ? 'has-refund' : ''}">
      <div class="booking-card-top">
        <div class="bid">Booking ID: <span>${b.id}</span></div>
        ${statusBadge}
      </div>
      <div class="booking-card-body">
        <div class="booking-route">${b.from} → ${b.to}</div>
        <div class="booking-meta">
          <span>🚌 ${b.bus}</span>
          <span>📅 ${b.date ? new Date(b.date).toLocaleDateString('en-IN',{day:'numeric',month:'short'}) : 'Today'}</span>
          <span>⏰ ${b.dep}</span><span>🪑 Seats: ${b.seats}</span>
          <span style="color:var(--accent);font-weight:700">₹${b.amount}</span>
        </div>
        <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn-download" style="flex:unset;padding:8px 16px;font-size:0.8rem" onclick="showToast('📥 Downloading ticket...')">📥 Download</button>
          ${!rr ? `<button class="btn-print" style="flex:unset;padding:8px 16px;font-size:0.8rem" onclick="cancelBooking('${b.id}')">Cancel</button>` : ''}
          ${refundBtn}
        </div>
      </div>
    </div>`;
  }).join('');
}

function cancelBooking(id) {
  const idx = myBookings.findIndex(b => b.id === id);
  if (idx > -1) {
    const booking = myBookings[idx];
    myBookings.splice(idx, 1);
    showToast('❌ Booking cancelled. Refund initiated within 5–7 business days.');
    const body = document.getElementById('pageBody');
    if (body) body.innerHTML = getBookingsContent();
    // Cancel in MongoDB (runs in background)
    if (typeof cancelBookingInDB === 'function' && booking._mongoId) {
      cancelBookingInDB(booking._mongoId);
    }
  }
}

function getOffersContent() {
  return `
    <div style="margin-bottom:20px;padding:16px;background:linear-gradient(135deg,rgba(232,82,26,0.1),rgba(240,124,74,0.05));border:1px solid rgba(232,82,26,0.2);border-radius:var(--radius)">
      <p style="font-size:0.85rem;color:var(--text2)">🎁 Tap any code to copy, then enter at checkout to save!</p>
    </div>
    ${[
      {pct:'10% OFF',  title:'First Booking',    desc:'10% off your first BusGo booking',          code:'BUSGO10',  exp:'Valid till 31 June 2026',  min:'Min. ₹300'},
      {pct:'₹50 OFF',  title:'Weekend Special',  desc:'Book any weekend trip and save ₹50',         code:'FIRST50',  exp:'Weekends only',           min:'Min. ₹200'},
      {pct:'₹200 OFF', title:'Premium Traveller',desc:'₹200 off on Volvo or Premium AC buses',      code:'SAVE20',   exp:'Volvo/AC buses',          min:'Min. ₹800'},
      {pct:'₹150 OFF', title:'Welcome Discount', desc:'New users get ₹150 off their first booking', code:'WELCOME',  exp:'New users only',          min:'Min. ₹500'},
      {pct:'15% OFF',  title:'Festive Special',  desc:'Celebrate the season with 15% off',          code:'FESTIVE15',exp:'Limited time',            min:'Min. ₹400'},
      {pct:'₹100 OFF', title:'Referral Reward',  desc:'Refer a friend, both save ₹100',             code:'REFER100', exp:'1 use per referral',      min:'Any amount'},
    ].map(o => `
      <div class="offer-card">
        <div class="offer-badge">${o.pct}</div>
        <div class="offer-info">
          <h4>${o.title}</h4><p>${o.desc}</p>
          <span class="offer-code" onclick="copyCode('${o.code}')">${o.code} 📋</span>
          <div style="font-size:0.72rem;color:var(--text3);margin-top:6px">${o.exp} · ${o.min}</div>
        </div>
      </div>`).join('')}`;
}

function copyCode(code) {
  navigator.clipboard.writeText(code).catch(() => {});
  showToast(`✅ Coupon "${code}" copied! Paste it at checkout.`);
}

function getTrackContent() {
  return `
    <div class="track-input-row">
      <input type="text" id="trackInput" placeholder="Enter Booking ID (e.g. BG12345678)">
      <button class="btn-search" style="padding:12px 20px;white-space:nowrap" onclick="doTrack()">Track →</button>
    </div>
    <div id="trackResult">
      <div class="track-map-placeholder"><span style="font-size:2.5rem">🗺️</span><span>Enter your booking ID to see live location</span></div>
      <p style="font-size:0.85rem;color:var(--text2);text-align:center">Try any Booking ID from My Bookings</p>
    </div>`;
}

function doTrack() {
  const input  = document.getElementById('trackInput');
  if (!input) return;
  const bid    = input.value.trim();
  const result = document.getElementById('trackResult');
  if (!bid) { showToast('⚠️ Please enter a booking ID'); return; }
  const booking = myBookings.find(b => b.id === bid);
  const busName = booking ? booking.bus : 'Royal Travels — Volvo AC';
  const route   = booking ? `${booking.from} → ${booking.to}` : 'Mumbai → Pune';
  result.innerHTML = `
    <div style="background:linear-gradient(135deg,rgba(45,158,107,0.1),rgba(232,82,26,0.05));border:1px solid rgba(45,158,107,0.2);border-radius:var(--radius);padding:16px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center">
      <div><div style="font-weight:700">🚌 ${busName}</div><div style="font-size:0.8rem;color:var(--text2);margin-top:4px">${route} · ID: ${bid}</div></div>
      <div style="background:rgba(45,158,107,0.2);color:var(--green);padding:6px 14px;border-radius:50px;font-size:0.78rem;font-weight:700">🟢 ON TIME</div>
    </div>
    <div style="background:var(--bg2);border-radius:var(--radius);padding:20px;margin-bottom:20px;text-align:center">
      <div style="font-size:2.5rem;margin-bottom:8px">📍</div>
      <div style="font-weight:700">Currently near Khopoli</div>
      <div style="font-size:0.82rem;color:var(--text2);margin-top:4px">ETA: ~1 hour 20 mins</div>
    </div>
    <h4 style="margin-bottom:16px;font-size:0.95rem">Route Timeline</h4>
    <div class="track-timeline">
      ${[
        {name:'Departure Point',  time:'07:30 AM', done:true,  current:false, eta:'Departed'},
        {name:'Khopoli (Current)',time:'—',         done:false, current:true,  eta:'Passing now'},
        {name:'Destination',      time:'02:30 PM',  done:false, current:false, eta:'~1h 20m away'},
      ].map((s,i,arr) => `
        <div class="track-stop">
          <div class="track-dot-wrap">
            <div class="track-dot ${s.done?'done':s.current?'current':''}"></div>
            ${i < arr.length-1 ? `<div class="track-line ${s.done?'done':''}"></div>` : ''}
          </div>
          <div class="track-stop-info"><h4>${s.name}</h4><p>${s.time}</p><div class="eta">${s.eta}</div></div>
        </div>`).join('')}
    </div>`;
}

function getAboutContent() {
  return `
    <div class="content-section"><h3>Our Story</h3><p>BusGo was founded in 2025 with a simple mission: make bus travel as seamless as possible for every Indian. We started as a small team in Pune, frustrated by unreliable booking platforms. Today, we serve millions of passengers across 500+ cities.</p></div>
    <div class="stat-row">
      <div class="stat-box"><div class="num">10M+</div><div class="lbl">Happy Passengers</div></div>
      <div class="stat-box"><div class="num">500+</div><div class="lbl">Cities Connected</div></div>
      <div class="stat-box"><div class="num">2000+</div><div class="lbl">Bus Routes</div></div>
      <div class="stat-box"><div class="num">50+</div><div class="lbl">Bus Partners</div></div>
    </div>
    <div class="content-grid" style="margin-top:24px">
      ${[{icon:'🌍',title:'Our Mission',text:'Democratise long-distance travel by making it affordable, reliable and transparent.'},{icon:'🔒',title:'Trust & Safety',text:'Every bus operator is verified. Every payment is secured with bank-grade encryption.'},{icon:'🚀',title:'Innovation',text:'From UPI QR payments to live GPS tracking — we build for India\'s next billion travellers.'},{icon:'🤝',title:'24/7 Support',text:'Our support team is always ready to help, day or night.'}].map(c=>`<div class="content-card"><div class="icon">${c.icon}</div><h4>${c.title}</h4><p>${c.text}</p></div>`).join('')}
</div>
<div class="content-section" style="margin-top:28px">
      <h3>Leadership Team</h3>
      <div class="content-grid">
        <div class="content-card"><div class="icon">🧑‍💻</div><h4>Niteen Wadhai</h4><p>CEO & Co-founder. Ex-Google, IIT Bombay alumnus.</p></div>
        <div class="content-card"><div class="icon">👨‍💻</div><h4>Prajwal Thakare</h4><p>CTO & Co-founder. Ex-Flipkart, IIT Delhi alumnus.</p></div>
        <div class="content-card"><div class="icon">👩‍💼</div><h4>Shrushti Paunikar</h4><p>COO. Built operations from 0 to 500+ cities.</p></div>
        <div class="content-card"><div class="icon">👩‍💼</div><h4>Payal Yadav</h4><p>CPO. Obsessed with user experience and product design.</p></div>
      </div>
<div class="content-section" style="margin-top:28px">
      <h3>Core Team</h3>
      <div class="content-grid">
         <div class="content-card"><div class="icon">👨‍💻</div><h4>Rutwik Chavan</h4><p>Full-Stack Developer, IIT Patna alumnus.</p></div>
    <div class="content-card"><div class="icon">👨‍💻</div><h4>Sunil Kotkar</h4><p>Software Developer, NIT Nagpur  alumnus.</p></div>
          <div class="content-card"><div class="icon">👩‍💼</div><h4>Taniya Sune</h4><p>UI / UX Designer, IIT Kharagpur alumna.</p></div>
   </div>
</div>`;
}

function getBlogContent() {
  return [
    {emoji:'🏔️',tag:'Travel Tips',title:'10 Best Bus Routes for a Weekend Getaway',desc:'From misty hill stations to sun-soaked beaches — the top routes Indians love.',date:'Dec 10, 2025'},
    {emoji:'💡',tag:'Tech',title:'How BusGo\'s UPI QR System Works',desc:'A deep dive into our NPCI-compliant payment infrastructure.',date:'Dec 5, 2025'},
    {emoji:'🌱',tag:'Sustainability',title:'Why Taking a Bus is the Greenest Way to Travel',desc:'The carbon math behind choosing bus over flight or car.',date:'Nov 28, 2025'},
    {emoji:'🎯',tag:'Features',title:'New: Bus Comparison & Price Alerts Are Here',desc:'Everything you need to know about our newest booking tools.',date:'Nov 20, 2025'},
  ].map(b => `
    <div class="blog-card">
      <div class="blog-img" style="background:var(--bg2)">${b.emoji}</div>
      <div class="blog-content">
        <div class="blog-tag">${b.tag}</div>
        <h4>${b.title}</h4>
        <p>${b.desc}</p>
        <div class="blog-meta">${b.date}</div>
      </div>
    </div>`).join('');
}

function getCareersContent() {
  const jobs = [
    {title:'Senior Full-Stack Engineer',dept:'Engineering',loc:'Pune / Remote'},
    {title:'Product Manager — Growth',  dept:'Product',    loc:'Bangalore'},
    {title:'iOS Developer',             dept:'Engineering',loc:'Remote'},
    {title:'Data Scientist',            dept:'Analytics',  loc:'Pune / Remote'},
    {title:'UX Designer',               dept:'Design',     loc:'Remote'},
    {title:'Business Development Mgr',  dept:'Partnerships',loc:'Delhi'},
  ];
  return `
    <div class="content-section"><h3>Join Our Team</h3><p>We're a fast-growing team building India's most-loved travel platform. Work on real problems, ship fast, grow faster.</p></div>
    <h3 style="margin-bottom:16px;font-size:0.95rem">Open Roles</h3>
    ${jobs.map(j => `<div class="job-card" onclick="showToast('📧 Application sent for: ${j.title}')"><h4>${j.title}</h4><p style="font-size:0.82rem;color:var(--text2);margin-top:4px">${j.dept}</p><div class="job-tags"><span class="job-tag">📍 ${j.loc}</span><span class="job-tag green">🟢 Full-time</span></div></div>`).join('')}`;
}

function getPressContent() {
  return `
    <div class="press-logo-grid">${['TechCrunch','YourStory','ET Tech','Mint','Inc42','Forbes India'].map(n=>`<div class="press-logo">${n}</div>`).join('')}</div>
    <div style="margin-top:24px">
      ${[
        {title:'BusGo raises $40M Series B to expand across South Asia',source:'TechCrunch',date:'Nov 2025'},
        {title:'How BusGo turned bus travel into a tech-first experience',source:'YourStory', date:'Oct 2025'},
        {title:'BusGo\'s UPI-first payment system sees 98% success rate',source:'ET Tech',   date:'Sep 2025'},
      ].map(a => `<div class="press-article"><div><h4>${a.title}</h4><p>${a.date}</p></div><span class="press-source">${a.source}</span></div>`).join('')}
    </div>`;
}

function getHelpContent() {
  const faqs = [
    {q:'How do I cancel my booking?',         a:'Go to My Bookings, find your booking, and tap Cancel. Refunds are processed in 1–7 business days depending on your payment method.'},
    {q:'What is the refund timeline?',         a:'UPI/Net Banking: 1–3 days. Card: 5–7 days. BusGo Wallet: instant. All timelines are from the date of cancellation confirmation.'},
    {q:'Can I change my travel date?',         a:'Date changes are not directly supported yet. Please cancel your booking and rebook for the new date. Cancellation charges may apply.'},
    {q:'My payment failed but amount deducted?',a:'Amounts are auto-reversed within 3–5 business days. If not, contact support with your bank reference number and we\'ll expedite it.'},
    {q:'How do I track my bus?',               a:'Go to Track Bus (menu or My Bookings → Track), enter your Booking ID, and get live GPS location and ETA updates.'},
    {q:'What is BusGo Wallet?',                a:'BusGo Wallet is a prepaid wallet for faster checkout. Add money once, pay instantly — and earn 2% cashback on every wallet payment.'},
    {q:'How do loyalty points work?',          a:'Earn 1 point per ₹10 spent. Redeem points for discounts, free upgrades, and cashback. Progress through Bronze → Silver → Gold → Platinum tiers.'},
  ];
  return `
    <div class="contact-channels">
      <div class="channel-card"><div class="ic">📞</div><h4>Call Us</h4><p>1800-123-4567 · 24/7 Free</p></div>
      <div class="channel-card"><div class="ic">💬</div><h4>Live Chat</h4><p>Avg reply &lt;2 min</p></div>
      <div class="channel-card"><div class="ic">📧</div><h4>Email</h4><p>help@busgo.in</p></div>
    </div>
    <h3 style="margin-bottom:16px;font-size:0.95rem">Frequently Asked Questions</h3>
    <div id="faqContainer">
      ${faqs.map((f,i) => `
        <div class="faq-item">
          <div class="faq-q" id="fq${i}" onclick="toggleFAQ(${i})">${f.q}<span class="arr">▼</span></div>
          <div class="faq-a" id="fa${i}">${f.a}</div>
        </div>`).join('')}
    </div>`;
}

function initFAQItems() { /* FAQ already rendered inline */ }

function toggleFAQ(i) {
  const q = document.getElementById('fq'+i);
  const a = document.getElementById('fa'+i);
  if (!q || !a) return;
  const isOpen = a.classList.contains('open');
  document.querySelectorAll('.faq-a').forEach(el => el.classList.remove('open'));
  document.querySelectorAll('.faq-q').forEach(el => el.classList.remove('open'));
  if (!isOpen) { a.classList.add('open'); q.classList.add('open'); }
}

function getContactContent() {
  return `
    <div class="contact-channels">
      <div class="channel-card"><div class="ic">📞</div><h4>Phone</h4><p>1800-123-4567<br>24/7 Toll Free</p></div>
      <div class="channel-card"><div class="ic">📧</div><h4>Email</h4><p>help@busgo.in<br>Reply within 4 hrs</p></div>
      <div class="channel-card"><div class="ic">💬</div><h4>WhatsApp</h4><p>+91-9699827589<br>Mon–Sat 9am–9pm</p></div>
    </div>
    <h3 style="margin-bottom:16px;font-size:0.95rem">Send a Message</h3>
    <div class="contact-grid">
      <div class="c-field"><label>Name</label><input type="text" id="cName" placeholder="Your name"></div>
      <div class="c-field"><label>Email</label><input type="email" id="cEmail" placeholder="you@email.com"></div>
      <div class="c-field">
        <label>Subject</label>
        <select id="cSubject">
          <option>Booking Issue</option><option>Refund Request</option><option>Payment Problem</option>
          <option>Bus Operator Complaint</option><option>App Feedback</option><option>Other</option>
        </select>
      </div>
      <div class="c-field"><label>Booking ID (if applicable)</label><input type="text" placeholder="e.g. BG12345678"></div>
    </div>
    <div class="c-field" style="margin-top:14px"><label>Message</label><textarea rows="4" id="cMessage" placeholder="Describe your issue in detail..."></textarea></div>
    <button class="btn-search" style="margin-top:16px;width:100%" onclick="submitContact()">Send Message →</button>`;
}

function submitContact() {
  const name    = document.getElementById('cName')?.value.trim();
  const email   = document.getElementById('cEmail')?.value.trim();
  const message = document.getElementById('cMessage')?.value.trim();
  if (!name || !email || !message) { showToast('⚠️ Please fill in all required fields'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast('⚠️ Please enter a valid email'); return; }
  showToast('✅ Message sent! We\'ll reply within 4 hours.');
}

function getRefundContent() {
  return `
    <div class="legal-section"><h3>Cancellation Window</h3>
      <div style="margin-top:12px;overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;font-size:0.85rem">
          <thead><tr style="background:var(--bg2)">
            <th style="padding:10px 14px;text-align:left;font-weight:600;border:1px solid var(--border)">Cancellation Time</th>
            <th style="padding:10px 14px;text-align:left;font-weight:600;border:1px solid var(--border)">Refund Amount</th>
          </tr></thead>
          <tbody>
            ${[['More than 48 hours','100% refund'],['24–48 hours','75% refund'],['12–24 hours','50% refund'],['4–12 hours','25% refund'],['Less than 4 hours','No refund']].map(([t,r])=>`<tr><td style="padding:10px 14px;border:1px solid var(--border);color:var(--text2)">${t} before departure</td><td style="padding:10px 14px;border:1px solid var(--border);color:var(--green);font-weight:600">${r}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div class="legal-section"><h3>Refund Processing Times</h3><ul><li>Credit/Debit Card: 5–7 business days</li><li>UPI / Net Banking: 1–3 business days</li><li>BusGo Wallet: Instant</li></ul></div>
    <div class="legal-section"><h3>Special Circumstances</h3><p>If your bus is cancelled by the operator or delayed by more than 2 hours, you're entitled to a full refund regardless of when you cancel.</p></div>`;
}

function getTermsContent() {
  return `
    <p style="font-size:0.8rem;color:var(--text3);margin-bottom:20px">Last updated: December 1, 2025</p>
    ${[
      {h:'1. Acceptance of Terms',         p:'By using BusGo services, you agree to these Terms. If you do not agree, please do not use our services.'},
      {h:'2. User Accounts',               p:'You must be 18+ to create an account. You are responsible for maintaining account confidentiality. Provide accurate registration information.'},
      {h:'3. Booking & Payment',           p:'All bookings are subject to availability. Payment must be made in full at booking. BusGo acts as an agent and is not responsible for operator service quality.'},
      {h:'4. Privacy Policy',              p:'We collect name, email, phone, and payment information to provide our services. We do not sell your data. Data is protected with industry-standard encryption.'},
      {h:'5. Limitation of Liability',     p:'BusGo is a marketplace. Maximum liability is limited to the booking amount for the affected trip.'},
      {h:'6. Contact',                     p:'legal@busgo.in · BusGo Technologies Pvt. Ltd., 5th Floor, Tech Park, Nagpur – 440024, India.'},
    ].map(s=>`<div class="legal-section"><h3>${s.h}</h3><p>${s.p}</p></div>`).join('')}`;
}

// ── NEW PAGE CONTENT ────────────────────────────────────────

function getTransactionsContent() {
  if (!authUser) return `<div class="empty-state"><div class="icon">🔐</div><h3>Login to view payment history</h3><button class="btn-search" style="margin-top:20px" onclick="closePage();openAuth('login')">Login →</button></div>`;
  const allTxns = [...txnDB, ...myBookings.map(b => ({
    ref:b.id, txnId:'TXN'+b.id.slice(-8), amount:b.amount,
    method:b.payMethod||'card', status:'success',
    route:`${b.from} → ${b.to}`, bus:b.bus, passenger:b.passenger, createdAt:b.createdAt||Date.now()
  }))];
  if (!allTxns.length) return `<div class="empty-state"><div class="icon">💸</div><h3>No transactions yet</h3><p>Your payment history will appear here after your first booking.</p></div>`;
  const total = allTxns.filter(t=>t.status==='success').reduce((s,t)=>s+t.amount,0);
  return `
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px">
      <div class="admin-stat"><div class="aval">${allTxns.length}</div><div class="albl">Total Txns</div></div>
      <div class="admin-stat"><div class="aval">₹${total.toLocaleString('en-IN')}</div><div class="albl">Total Paid</div></div>
      <div class="admin-stat"><div class="aval">${allTxns.filter(t=>t.status==='success').length}</div><div class="albl">Successful</div></div>
    </div>
    ${allTxns.map(t => `
    <div class="txn-card">
      <div class="txn-info">
        <div class="txn-id-txt">${t.txnId||t.ref}</div>
        <div class="txn-route">${t.route}</div>
        <div class="txn-meta">🚌 ${t.bus||'—'} · 👤 ${t.passenger||'—'}</div>
      </div>
      <div class="txn-right">
        <div class="txn-amount">₹${t.amount.toLocaleString('en-IN')}</div>
        <div class="txn-method-badge ${t.method}">${t.method==='upi'?'📱 UPI':t.method==='card'?'💳 Card':'👛 Wallet'}</div>
        <div style="font-size:0.72rem;margin-top:3px"><span class="txn-status-dot ${t.status}"></span>${t.status}</div>
      </div>
    </div>`).join('')}`;
}

function getAdminContent() {
  const mockTxns = [
    {ref:'BG99120001',txnId:'TXN9912000100',amount:850, method:'upi',    status:'success', route:'Mumbai → Pune',       bus:'Royal Travels', passenger:'Rahul Sharma'},
    {ref:'BG99120002',txnId:'TXN9912000200',amount:320, method:'card',   status:'success', route:'Delhi → Jaipur',       bus:'SRS Travels',   passenger:'Priya Singh'},
    {ref:'BG99120003',txnId:'TXN9912000300',amount:1540,method:'upi',    status:'pending', route:'Bangalore → Chennai',  bus:'Orange Tours',  passenger:'Amit Kumar'},
    {ref:'BG99120004',txnId:'TXN9912000400',amount:680, method:'wallet', status:'success', route:'Hyderabad → Bangalore',bus:'VRL Express',   passenger:'Sneha Patel'},
    {ref:'BG99120005',txnId:'TXN9912000500',amount:420, method:'upi',    status:'failed',  route:'Pune → Goa',           bus:'Paulo Travels', passenger:'Raj Mehta'},
    {ref:'BG99120006',txnId:'TXN9912000600',amount:920, method:'card',   status:'success', route:'Chennai → Coimbatore', bus:'Neeta Tours',   passenger:'Kavya Reddy'},
  ];
  const data  = [...txnDB, ...myBookings.map(b=>({ref:b.id,txnId:'TXN'+b.id.slice(-8),amount:b.amount,method:b.payMethod||'card',status:'success',route:`${b.from}→${b.to}`,bus:b.bus,passenger:b.passenger})), ...mockTxns];
  const total = data.filter(t=>t.status==='success').reduce((s,t)=>s+t.amount,0);
  const pendingRefunds = refundRequests.filter(r=>r.status==='pending').length;
  const approvedRefunds = refundRequests.filter(r=>r.status==='approved').length;
  const totalRefunded = refundRequests.filter(r=>r.status==='approved').reduce((s,r)=>s+r.refundAmount,0);

  const refundRows = refundRequests.length ? refundRequests.map(r => `
    <tr>
      <td style="font-family:monospace;font-size:0.72rem">${r.id}</td>
      <td>${r.bookingId}</td>
      <td>${r.userName||'—'}</td>
      <td>${r.from} → ${r.to}</td>
      <td style="font-weight:700">₹${r.refundAmount.toLocaleString('en-IN')}</td>
      <td><span class="refund-reason-chip">${r.reason}</span></td>
      <td><span class="status-pill refund-status-${r.status}">${r.status}</span></td>
      <td style="font-size:0.72rem;color:var(--text3)">${new Date(r.submittedAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}</td>
      <td>
        ${r.status==='pending' ? `
          <div style="display:flex;gap:6px">
            <button class="btn-admin-approve" onclick="adminReviewRefund('${r.id}','approved')">✓ Approve</button>
            <button class="btn-admin-reject"  onclick="adminReviewRefund('${r.id}','rejected')">✗ Reject</button>
          </div>` : `<span style="font-size:0.75rem;color:var(--text3)">${r.reviewedAt ? new Date(r.reviewedAt).toLocaleDateString('en-IN',{day:'numeric',month:'short'}) : '—'}</span>`}
      </td>
    </tr>`).join('')
    : `<tr><td colspan="9" style="text-align:center;padding:32px;color:var(--text3)">No refund requests yet</td></tr>`;

  return `
    <div class="admin-tabs">
      <button class="admin-tab active" onclick="switchAdminTab('overview',this)">Overview</button>
      <button class="admin-tab" onclick="switchAdminTab('transactions',this)">Transactions</button>
      <button class="admin-tab" onclick="switchAdminTab('refunds',this)">
        Refunds${pendingRefunds > 0 ? ` <span class="admin-refund-badge">${pendingRefunds}</span>` : ''}
      </button>
      <button class="admin-tab" onclick="switchAdminTab('upi',this)">UPI Config</button>
    </div>
    <div id="adminTabOverview">
      <div class="admin-grid">
        <div class="admin-stat"><div class="aval">${data.length}</div><div class="albl">Total Txns</div></div>
        <div class="admin-stat"><div class="aval" style="color:var(--green)">₹${(total/1000).toFixed(0)}K</div><div class="albl">Revenue</div></div>
        <div class="admin-stat"><div class="aval" style="color:var(--yellow)">${data.filter(t=>t.status==='pending').length}</div><div class="albl">Pending</div></div>
        <div class="admin-stat"><div class="aval" style="color:var(--red)">${data.filter(t=>t.status==='failed').length}</div><div class="albl">Failed</div></div>
        <div class="admin-stat"><div class="aval" style="color:var(--yellow)">${pendingRefunds}</div><div class="albl">Pending Refunds</div></div>
        <div class="admin-stat"><div class="aval" style="color:var(--red)">₹${(totalRefunded/1000).toFixed(1)}K</div><div class="albl">Refunded</div></div>
        <div class="admin-stat"><div class="aval">${data.filter(t=>t.method==='upi').length}</div><div class="albl">UPI Txns</div></div>
        <div class="admin-stat"><div class="aval">${Math.round((data.filter(t=>t.status==='success').length/Math.max(data.length,1))*100)}%</div><div class="albl">Success Rate</div></div>
      </div>
      ${pendingRefunds > 0 ? `<div class="admin-alert-banner">⚠️ <strong>${pendingRefunds} refund request${pendingRefunds>1?'s':''}</strong> awaiting your review. <button onclick="switchAdminTab('refunds',document.querySelectorAll('.admin-tab')[2])" style="background:none;border:none;color:var(--accent);font-weight:700;cursor:pointer;font-family:inherit">Review now →</button></div>` : ''}
    </div>
    <div id="adminTabTransactions" style="display:none">
      <div style="overflow-x:auto">
        <table class="admin-table"><thead><tr>
          <th>Txn ID</th><th>Route</th><th>Passenger</th><th>Amount</th><th>Method</th><th>Status</th>
        </tr></thead><tbody>
          ${data.map(t=>`<tr><td style="font-family:monospace;font-size:0.72rem">${t.txnId||t.ref}</td><td>${t.route}</td><td>${t.passenger||'—'}</td><td style="font-weight:700">₹${t.amount.toLocaleString('en-IN')}</td><td><span class="txn-method-badge ${t.method}">${t.method.toUpperCase()}</span></td><td><span class="status-pill ${t.status}">${t.status}</span></td></tr>`).join('')}
        </tbody></table>
      </div>
    </div>
    <div id="adminTabRefunds" style="display:none">
      <div class="admin-grid" style="margin-bottom:20px">
        <div class="admin-stat"><div class="aval">${refundRequests.length}</div><div class="albl">Total Requests</div></div>
        <div class="admin-stat"><div class="aval" style="color:var(--yellow)">${pendingRefunds}</div><div class="albl">Pending</div></div>
        <div class="admin-stat"><div class="aval" style="color:var(--green)">${approvedRefunds}</div><div class="albl">Approved</div></div>
        <div class="admin-stat"><div class="aval" style="color:var(--red)">₹${totalRefunded.toLocaleString('en-IN')}</div><div class="albl">Total Refunded</div></div>
      </div>
      <div style="overflow-x:auto">
        <table class="admin-table"><thead><tr>
          <th>Refund ID</th><th>Booking ID</th><th>Passenger</th><th>Route</th><th>Amount</th><th>Reason</th><th>Status</th><th>Submitted</th><th>Action</th>
        </tr></thead><tbody>${refundRows}</tbody></table>
      </div>
    </div>
    <div id="adminTabUpi" style="display:none">
      <div style="padding:16px;background:var(--bg);border-radius:var(--radius);border:1px solid var(--border);margin-bottom:16px">
        <h4 style="margin-bottom:12px;font-size:0.9rem">Merchant UPI Configuration</h4>
        ${[['Merchant UPI VPA',MERCHANT_UPI],['Merchant Name',MERCHANT_NAME],['Currency','INR'],['QR Standard','NPCI Bharat QR'],['Supported Apps','GPay · PhonePe · Paytm · BHIM · Amazon Pay'],['Webhook','✅ HMAC-SHA256 Active'],['Duplicate Guard','✅ 5-min TTL window']].map(([k,v])=>`<div class="invoice-row"><span>${k}</span><strong style="font-family:monospace;font-size:0.82rem">${v}</strong></div>`).join('')}
      </div>
      <div style="padding:16px;background:var(--bg);border-radius:var(--radius);border:1px solid var(--border)">
        <h4 style="margin-bottom:12px;font-size:0.9rem">Generate Test QR</h4>
        <div style="display:flex;gap:10px;margin-bottom:14px;align-items:flex-end">
          <div class="form-field" style="flex:1;margin:0"><input type="number" id="adminQRAmount" placeholder=" " min="1" max="100000"><label>Test Amount (₹)</label></div>
          <button class="btn-verify-upi" onclick="renderAdminQR()">Generate QR</button>
        </div>
        <div id="adminQROutput" style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:16px;background:#fff;border-radius:var(--radius-sm);border:1px solid #e0ddd8;min-height:60px"></div>
      </div>
    </div>`;
}

function switchAdminTab(tab, btn) {
  document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  ['Overview','Transactions','Refunds','Upi'].forEach(t => {
    const el = document.getElementById('adminTab'+t);
    if (el) el.style.display = t.toLowerCase() === tab ? 'block' : 'none';
  });
}

function adminReviewRefund(refundId, decision) {
  const rr = refundRequests.find(r => r.id === refundId);
  if (!rr) return;
  if (rr.status !== 'pending') { showToast('⚠️ This request has already been reviewed'); return; }

  // Simulate payment gateway processing
  const processingMsg = decision === 'approved'
    ? `⏳ Processing refund of ₹${rr.refundAmount} via ${rr.payMethod?.toUpperCase() || 'UPI'}…`
    : '⏳ Processing rejection…';
  showToast(processingMsg);

  setTimeout(() => {
    rr.status     = decision;
    rr.reviewedAt = Date.now();
    rr.gatewayRef = 'GW' + Math.random().toString(36).slice(2,10).toUpperCase();

    if (decision === 'approved') {
      // Simulate refund to wallet or original payment method
      if (rr.payMethod === 'wallet') {
        walletBalance += rr.refundAmount;
      }
      showToast(`✅ Refund of ₹${rr.refundAmount} approved & processed! Gateway ref: ${rr.gatewayRef}`);
      pushNotif('✅','rgba(45,158,107,0.1)','Refund Approved',`Your refund of ₹${rr.refundAmount} for ${rr.from} → ${rr.to} has been approved. Ref: ${rr.gatewayRef}`);
    } else {
      showToast(`❌ Refund request ${refundId} has been rejected.`);
      pushNotif('❌','rgba(220,53,69,0.1)','Refund Rejected',`Your refund request for ${rr.from} → ${rr.to} was not approved. Contact support for details.`);
    }
    // Refresh admin panel
    const body = document.getElementById('pageBody');
    if (body) {
      body.innerHTML = getAdminContent();
      setTimeout(() => switchAdminTab('refunds', document.querySelectorAll('.admin-tab')[2]), 50);
    }
  }, 1800);
}

function renderAdminQR() {
  const amt = parseFloat(document.getElementById('adminQRAmount')?.value || 0);
  if (!amt || amt < 1) { showToast('⚠️ Enter a valid amount'); return; }
  const ref  = 'TEST' + Date.now().toString().slice(-8);
  const out  = document.getElementById('adminQROutput');
  if (!out) return;
  out.innerHTML = '<div style="color:#999;font-size:0.82rem">Generating…</div>';
  setTimeout(() => {
    out.innerHTML = '';
    const upiUrl = buildUPIUrl(MERCHANT_UPI, MERCHANT_NAME, amt, ref, 'BusGo Test Payment');
    try {
      new QRCode(out, { text:upiUrl, width:160, height:160, colorDark:'#000', colorLight:'#fff', correctLevel: QRCode.CorrectLevel.M });
      const lbl = document.createElement('div');
      lbl.style.cssText = 'font-size:0.7rem;color:#666;text-align:center;margin-top:6px;word-break:break-all;max-width:200px';
      lbl.textContent = `${MERCHANT_UPI} · ₹${amt} · Ref: ${ref}`;
      out.appendChild(lbl);
    } catch(e) { out.textContent = upiUrl; }
    showToast('🔲 QR generated!');
  }, 300);
}

// ============================================================
// REFUND SYSTEM
// ============================================================

const REFUND_REASONS = [
  { value: 'bus_cancelled',    label: '🚫 Bus Cancelled by Operator' },
  { value: 'delay_2hrs',       label: '⏱️ Bus Delayed > 2 Hours' },
  { value: 'wrong_booking',    label: '❌ Booked Wrong Trip' },
  { value: 'medical',          label: '🏥 Medical Emergency' },
  { value: 'duplicate',        label: '🔁 Duplicate Booking' },
  { value: 'service_quality',  label: '😞 Poor Service / AC Not Working' },
  { value: 'overcharged',      label: '💸 Overcharged / Payment Error' },
  { value: 'other',            label: '📝 Other Reason' },
];

// Refund percentage based on reason / policy
function calcRefundAmount(booking, reason) {
  const fullRefundReasons = ['bus_cancelled', 'delay_2hrs', 'duplicate', 'overcharged'];
  if (fullRefundReasons.includes(reason)) return booking.amount;
  // Time-based sliding scale (use booking date as proxy since no departure time stored)
  const now  = Date.now();
  const dep  = new Date(booking.date || now).getTime();
  const diff = dep - now; // ms
  const hrs  = diff / 3600000;
  if (hrs > 48)  return Math.round(booking.amount * 1.00);
  if (hrs > 24)  return Math.round(booking.amount * 0.75);
  if (hrs > 12)  return Math.round(booking.amount * 0.50);
  if (hrs > 4)   return Math.round(booking.amount * 0.25);
  return 0;
}

function openRefundForm(bookingId) {
  if (!authUser) { openAuth('login'); return; }
  window._refundFormBookingId = bookingId;
  openPage('refundForm');
}

function getRefundFormContent(bookingId) {
  if (!authUser) return `<div class="empty-state"><div class="icon">🔐</div><h3>Login to request a refund</h3><button class="btn-search" style="margin-top:20px" onclick="closePage();openAuth('login')">Login →</button></div>`;

  // Pre-fill from booking if provided
  const booking = bookingId ? myBookings.find(b => b.id === bookingId) : null;
  // Check if already has a pending/approved refund
  if (booking) {
    const existing = refundRequests.find(r => r.bookingId === booking.id && r.userId === authUser.email);
    if (existing) {
      return `<div class="empty-state"><div class="icon">↩️</div><h3>Refund Already Requested</h3>
        <p>A refund request for booking <strong>${booking.id}</strong> is currently <strong>${existing.status}</strong>.</p>
        <button class="btn-search" style="margin-top:20px" onclick="openPage('refundRequests')">View Refund Status →</button>
      </div>`;
    }
  }

  const bookingOptions = myBookings
    .filter(b => !refundRequests.find(r => r.bookingId === b.id && r.userId === authUser.email))
    .map(b => `<option value="${b.id}" ${booking?.id === b.id ? 'selected' : ''}>${b.id} — ${b.from} → ${b.to} (₹${b.amount})</option>`)
    .join('');

  if (!bookingOptions) return `<div class="empty-state"><div class="icon">🎫</div><h3>No eligible bookings</h3><p>All your bookings already have refund requests, or you have no bookings yet.</p><button class="btn-search" style="margin-top:20px" onclick="closePage();goHome()">Search Buses →</button></div>`;

  return `
    <div class="refund-form-wrap">
      <div class="refund-info-banner">
        <span>ℹ️</span>
        <p>Refunds are processed within <strong>1–7 business days</strong> depending on your payment method. UPI/Wallet refunds are fastest.</p>
      </div>

      <div class="form-field" style="margin-bottom:20px">
        <select id="rfBookingId" onchange="refreshRefundEstimate()" style="padding:14px 14px 14px;">
          <option value="">— Select a Booking —</option>
          ${bookingOptions}
        </select>
        <label style="top:6px;font-size:0.7rem;color:var(--accent);font-weight:600">Booking ID</label>
      </div>

      <div id="refundBookingPreview" style="display:none;margin-bottom:20px;padding:14px;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-sm)"></div>

      <div class="form-field" style="margin-bottom:20px">
        <select id="rfReason" onchange="refreshRefundEstimate()">
          <option value="">— Select a Reason —</option>
          ${REFUND_REASONS.map(r=>`<option value="${r.value}">${r.label}</option>`).join('')}
        </select>
        <label style="top:6px;font-size:0.7rem;color:var(--accent);font-weight:600">Reason for Refund</label>
      </div>

      <div class="form-field" style="margin-bottom:20px">
        <textarea id="rfDescription" rows="3" placeholder=" " style="width:100%;padding:22px 14px 8px;border-radius:var(--radius-sm);background:var(--bg);border:1.5px solid var(--border);color:var(--text);font-family:'DM Sans',sans-serif;font-size:0.95rem;outline:none;resize:vertical;transition:border-color 0.2s" onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='var(--border)'"></textarea>
        <label>Describe your issue (optional)</label>
      </div>

      <div class="refund-proof-upload" id="rfProofZone">
        <input type="file" id="rfProofFile" accept="image/*,.pdf" style="display:none" onchange="handleProofUpload(event)">
        <div class="proof-upload-inner" onclick="document.getElementById('rfProofFile').click()">
          <div style="font-size:2rem;margin-bottom:8px">📎</div>
          <p style="font-weight:600;font-size:0.9rem">Attach Proof (Optional)</p>
          <p style="font-size:0.78rem;color:var(--text3);margin-top:4px">Screenshot, photo, or PDF · Max 5MB</p>
        </div>
        <div id="rfProofPreview" style="display:none;margin-top:12px;padding:10px;background:var(--bg2);border-radius:var(--radius-sm);font-size:0.82rem;color:var(--text2);display:flex;align-items:center;gap:8px"></div>
      </div>

      <div id="refundEstimateBox" style="display:none;margin:20px 0;padding:16px;border-radius:var(--radius);border:2px solid var(--green);background:rgba(45,158,107,0.06)">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-size:0.78rem;color:var(--text3);margin-bottom:2px">Estimated Refund</div>
            <div id="refundEstimateAmt" style="font-size:1.6rem;font-weight:800;color:var(--green);font-family:'Syne',sans-serif">₹0</div>
          </div>
          <div style="text-align:right">
            <div id="refundEstimateMethod" style="font-size:0.78rem;color:var(--text3)">Back to original method</div>
            <div id="refundEstimateDays" style="font-size:0.82rem;font-weight:600;color:var(--text2);margin-top:2px"></div>
          </div>
        </div>
        <div id="refundEstimateNote" style="font-size:0.75rem;color:var(--text3);margin-top:8px;border-top:1px solid rgba(45,158,107,0.2);padding-top:8px"></div>
      </div>

      <div id="rfNoRefundWarning" style="display:none;margin:20px 0;padding:14px;border-radius:var(--radius);border:2px solid var(--red);background:rgba(220,53,69,0.06)">
        <strong style="color:var(--red)">⚠️ No Refund Eligible</strong>
        <p style="font-size:0.82rem;color:var(--text2);margin-top:4px">Based on our cancellation policy, this booking is not eligible for a refund. You can still submit a request and our team will review it manually.</p>
      </div>

      <button class="btn-search" style="width:100%;margin-top:8px" onclick="submitRefundRequest()">Submit Refund Request →</button>

      <p style="font-size:0.75rem;color:var(--text3);text-align:center;margin-top:14px">
        By submitting, you agree to our <a onclick="openPage('refund')" style="color:var(--accent);cursor:pointer">Refund Policy</a>. 
        Fraudulent requests may result in account suspension.
      </p>
    </div>`;
}

function refreshRefundEstimate() {
  const bid    = document.getElementById('rfBookingId')?.value;
  const reason = document.getElementById('rfReason')?.value;
  const preview = document.getElementById('refundBookingPreview');
  const estBox  = document.getElementById('refundEstimateBox');
  const noBox   = document.getElementById('rfNoRefundWarning');

  if (!bid) { if(preview) preview.style.display='none'; return; }

  const booking = myBookings.find(b => b.id === bid);
  if (!booking) return;

  // Show booking preview
  if (preview) {
    preview.style.display = 'block';
    preview.innerHTML = `
      <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px">
        <div>
          <div style="font-weight:700;font-size:0.95rem">${booking.from} → ${booking.to}</div>
          <div style="font-size:0.8rem;color:var(--text2);margin-top:3px">🚌 ${booking.bus} · 📅 ${booking.date ? new Date(booking.date).toLocaleDateString('en-IN',{day:'numeric',month:'short'}) : 'Today'} · 🪑 ${booking.seats}</div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:800;color:var(--accent);font-size:1.1rem">₹${booking.amount}</div>
          <div style="font-size:0.72rem;color:var(--text3)">${(booking.payMethod||'card').toUpperCase()}</div>
        </div>
      </div>`;
  }

  if (!reason) { if(estBox) estBox.style.display='none'; if(noBox) noBox.style.display='none'; return; }

  const amt = calcRefundAmount(booking, reason);
  const methodTimeline = {card:'5–7 business days', upi:'1–3 business days', wallet:'Instant', netbanking:'1–3 business days'};
  const days = methodTimeline[booking.payMethod] || '5–7 business days';

  if (amt === 0) {
    if(estBox) estBox.style.display='none';
    if(noBox) noBox.style.display='block';
  } else {
    if(noBox) noBox.style.display='none';
    if (estBox) {
      estBox.style.display = 'block';
      document.getElementById('refundEstimateAmt').textContent  = `₹${amt.toLocaleString('en-IN')}`;
      document.getElementById('refundEstimateMethod').textContent = `Back to ${(booking.payMethod||'card').toUpperCase()}`;
      document.getElementById('refundEstimateDays').textContent   = `⏱️ ${days}`;
      const pct = Math.round((amt/booking.amount)*100);
      document.getElementById('refundEstimateNote').textContent   = `${pct}% of ₹${booking.amount} · Booking ID: ${booking.id}`;
    }
  }
}

function handleProofUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) { showToast('⚠️ File too large. Max 5MB allowed.'); return; }
  window._rfProofFileName = file.name;
  const preview = document.getElementById('rfProofPreview');
  if (preview) {
    preview.style.display = 'flex';
    preview.innerHTML = `<span style="font-size:1.2rem">${file.type.includes('pdf') ? '📄' : '🖼️'}</span> <span><strong>${file.name}</strong><br><span style="color:var(--text3)">${(file.size/1024).toFixed(0)} KB</span></span> <button onclick="clearProof()" style="margin-left:auto;background:none;border:none;cursor:pointer;color:var(--text3);font-size:1rem">✕</button>`;
  }
  showToast('✅ Proof attached!');
}

function clearProof() {
  window._rfProofFileName = null;
  const preview = document.getElementById('rfProofPreview');
  if (preview) { preview.style.display='none'; preview.innerHTML=''; }
  const input = document.getElementById('rfProofFile');
  if (input) input.value = '';
}

function submitRefundRequest() {
  const bid         = document.getElementById('rfBookingId')?.value?.trim();
  const reason      = document.getElementById('rfReason')?.value;
  const description = document.getElementById('rfDescription')?.value?.trim();

  // Validation
  if (!bid)    { showToast('⚠️ Please select a booking'); return; }
  if (!reason) { showToast('⚠️ Please select a reason for your refund'); return; }

  const booking = myBookings.find(b => b.id === bid);
  if (!booking) { showToast('⚠️ Booking not found'); return; }

  const existing = refundRequests.find(r => r.bookingId === bid && r.userId === authUser.email);
  if (existing) { showToast('⚠️ A refund request already exists for this booking'); return; }

  const refundAmt = calcRefundAmount(booking, reason);
  const refundId  = 'RF' + Date.now().toString().slice(-10);

  const rr = {
    id:           refundId,
    bookingId:    bid,
    userId:       authUser.email,
    userName:     authUser.name,
    from:         booking.from,
    to:           booking.to,
    bus:          booking.bus,
    amount:       booking.amount,
    refundAmount: refundAmt,
    reason,
    description:  description || '',
    proofName:    window._rfProofFileName || null,
    status:       'pending',
    payMethod:    booking.payMethod || 'card',
    submittedAt:  Date.now(),
    reviewedAt:   null,
    adminNote:    '',
    gatewayRef:   null,
  };

  refundRequests.unshift(rr);
  window._rfProofFileName = null;

  // Save refund request to MongoDB (runs in background)
  if (typeof saveRefundToDB === 'function') {
    saveRefundToDB(rr, booking);
  }

  // Notification
  pushNotif('↩️','rgba(232,82,26,0.1)','Refund Requested',`Your refund request (${refundId}) for ₹${refundAmt} has been submitted and is under review.`);
  showToast(`✅ Refund request submitted! ID: ${refundId}`);

  // Auto-approve full-refund reasons after simulated gateway delay
  const autoApproveReasons = ['bus_cancelled','delay_2hrs','duplicate'];
  if (autoApproveReasons.includes(reason)) {
    setTimeout(() => {
      rr.status     = 'approved';
      rr.reviewedAt = Date.now();
      rr.gatewayRef = 'GW' + Math.random().toString(36).slice(2,10).toUpperCase();
      if (rr.payMethod === 'wallet') walletBalance += rr.refundAmount;
      pushNotif('✅','rgba(45,158,107,0.1)','Refund Approved',`Your refund of ₹${rr.refundAmount} for ${rr.from}→${rr.to} has been auto-approved. Ref: ${rr.gatewayRef}`);
      showToast(`🎉 Refund of ₹${rr.refundAmount} auto-approved! Ref: ${rr.gatewayRef}`);
    }, 4000);
  }

  openPage('refundRequests');
}

function getRefundRequestsContent() {
  if (!authUser) return `<div class="empty-state"><div class="icon">🔐</div><h3>Login to view refund requests</h3><button class="btn-search" style="margin-top:20px" onclick="closePage();openAuth('login')">Login →</button></div>`;
  const mine = refundRequests.filter(r => r.userId === authUser.email);
  if (!mine.length) return `<div class="empty-state"><div class="icon">↩️</div><h3>No refund requests yet</h3><p>Refund requests you submit will appear here.</p><button class="btn-search" style="margin-top:20px" onclick="openPage('bookings')">Go to My Bookings →</button></div>`;

  const statusMeta = {
    pending:  { icon:'⏳', color:'var(--yellow)', label:'Under Review',  bg:'rgba(255,193,7,0.1)',  border:'rgba(255,193,7,0.3)'  },
    approved: { icon:'✅', color:'var(--green)',  label:'Approved',      bg:'rgba(45,158,107,0.08)',border:'rgba(45,158,107,0.3)' },
    rejected: { icon:'❌', color:'var(--red)',    label:'Not Approved',  bg:'rgba(220,53,69,0.06)', border:'rgba(220,53,69,0.25)' },
  };
  const methodTimeline = {card:'5–7 business days', upi:'1–3 business days', wallet:'Instant', netbanking:'1–3 business days'};

  return mine.map(r => {
    const sm   = statusMeta[r.status] || statusMeta.pending;
    const days = methodTimeline[r.payMethod] || '5–7 business days';
    const reasonLabel = REFUND_REASONS.find(x=>x.value===r.reason)?.label || r.reason;
    return `
    <div class="refund-status-card" style="border-color:${sm.border};background:${sm.bg}">
      <div class="refund-status-card-header">
        <div>
          <div class="refund-id-chip">${r.id}</div>
          <div style="font-size:0.78rem;color:var(--text3);margin-top:4px">Booking: <strong>${r.bookingId}</strong></div>
        </div>
        <div class="refund-status-badge" style="color:${sm.color};background:${sm.bg};border-color:${sm.border}">
          ${sm.icon} ${sm.label}
        </div>
      </div>
      <div class="refund-route-row">${r.from} → ${r.to} <span>🚌 ${r.bus}</span></div>
      <div class="refund-detail-grid">
        <div class="refund-detail-item"><div class="rdi-label">Booking Amount</div><div class="rdi-val">₹${r.amount.toLocaleString('en-IN')}</div></div>
        <div class="refund-detail-item"><div class="rdi-label">Refund Amount</div><div class="rdi-val" style="color:var(--green);font-weight:800">₹${r.refundAmount.toLocaleString('en-IN')}</div></div>
        <div class="refund-detail-item"><div class="rdi-label">Reason</div><div class="rdi-val" style="font-size:0.78rem">${reasonLabel}</div></div>
        <div class="refund-detail-item"><div class="rdi-label">Payment Method</div><div class="rdi-val">${(r.payMethod||'card').toUpperCase()}</div></div>
        <div class="refund-detail-item"><div class="rdi-label">Submitted</div><div class="rdi-val" style="font-size:0.78rem">${new Date(r.submittedAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</div></div>
        ${r.gatewayRef ? `<div class="refund-detail-item"><div class="rdi-label">Gateway Ref</div><div class="rdi-val" style="font-family:monospace;font-size:0.75rem">${r.gatewayRef}</div></div>` : ''}
      </div>
      ${r.status === 'pending' ? `
        <div class="refund-timeline-bar">
          <div class="rtb-step done">📋 Submitted</div>
          <div class="rtb-line active"></div>
          <div class="rtb-step active">🔍 Under Review</div>
          <div class="rtb-line"></div>
          <div class="rtb-step">💳 Processing</div>
          <div class="rtb-line"></div>
          <div class="rtb-step">✅ Credited</div>
        </div>
        <p style="font-size:0.75rem;color:var(--text3);text-align:center;margin-top:8px">Typical review time: 24–48 hours · Credited in ${days}</p>
      ` : r.status === 'approved' ? `
        <div class="refund-timeline-bar">
          <div class="rtb-step done">📋 Submitted</div>
          <div class="rtb-line done"></div>
          <div class="rtb-step done">🔍 Reviewed</div>
          <div class="rtb-line done"></div>
          <div class="rtb-step done">💳 Processing</div>
          <div class="rtb-line ${r.payMethod==='wallet'?'done':'active'}"></div>
          <div class="rtb-step ${r.payMethod==='wallet'?'done':'active'}">✅ Credited</div>
        </div>
        <p style="font-size:0.75rem;color:var(--green);text-align:center;margin-top:8px;font-weight:600">
          ${r.payMethod==='wallet' ? '🎉 Refund credited to your BusGo Wallet instantly!' : `⏱️ Refund will reflect in ${days}`}
        </p>
      ` : `
        <div style="margin-top:12px;padding:10px 14px;background:rgba(220,53,69,0.08);border-radius:var(--radius-sm);font-size:0.82rem;color:var(--red)">
          ❌ This refund request was not approved. Please <a onclick="openPage('contact')" style="color:var(--accent);cursor:pointer;font-weight:600">contact support</a> if you believe this is incorrect.
        </div>
      `}
      ${r.proofName ? `<div style="margin-top:10px;font-size:0.75rem;color:var(--text3)">📎 Proof attached: ${r.proofName}</div>` : ''}
    </div>`;
  }).join('');
}

// ============================================================

function getPriceAlertsContent() {
  if (!authUser) return `<div class="empty-state"><div class="icon">🔔</div><h3>Login to set price alerts</h3><button class="btn-search" style="margin-top:20px" onclick="closePage();openAuth('login')">Login →</button></div>`;
  const alerts = [
    { id:1, from:'Mumbai', to:'Pune',      targetPrice:120, currentPrice:150, active:true  },
    { id:2, from:'Delhi',  to:'Jaipur',    targetPrice:280, currentPrice:300, active:true  },
    { id:3, from:'Bangalore', to:'Chennai',targetPrice:400, currentPrice:450, active:false },
  ];
  return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
      <p style="font-size:0.85rem;color:var(--text2)">Get notified when fares drop to your target price.</p>
      <button class="btn-verify-upi" onclick="showToast('💡 Set a target price from the search results page')">+ New Alert</button>
    </div>
    ${alerts.map(a => `
    <div class="alert-card">
      <div>
        <div class="aroute">${a.from} → ${a.to}</div>
        <div class="ameta">Target: ₹${a.targetPrice} · Current: <span style="color:${a.currentPrice<=a.targetPrice?'var(--green)':'var(--text)'};font-weight:700">₹${a.currentPrice}</span></div>
        ${a.currentPrice <= a.targetPrice ? '<div style="font-size:0.72rem;color:var(--green);font-weight:600;margin-top:4px">🎉 Target met! Book now.</div>' : ''}
      </div>
      <div style="display:flex;align-items:center;gap:12px">
        ${a.currentPrice<=a.targetPrice?`<button class="btn-search" style="padding:6px 14px;font-size:0.78rem" onclick="closePage();quickSearch('${a.from}','${a.to}')">Book →</button>`:''}
        <label class="toggle-sw"><input type="checkbox" ${a.active?'checked':''} onchange="showToast(this.checked?'🔔 Alert activated':'🔕 Alert paused')"><span class="toggle-knob"></span></label>
      </div>
    </div>`).join('')}
    <div style="margin-top:20px;padding:16px;background:var(--bg);border-radius:var(--radius);border:1px solid var(--border)">
      <h4 style="font-size:0.88rem;margin-bottom:8px">How it works</h4>
      <p style="font-size:0.8rem;color:var(--text2);line-height:1.6">We check fares every 15 minutes. When the price hits your target, you get an SMS + email instantly.</p>
    </div>`;
}

function getReferralContent() {
  const code = authUser ? 'BUSGO' + authUser.name.replace(/\s/g,'').slice(0,4).toUpperCase() : 'BUSGOREF';
  return `
    <div class="referral-card">
      <div style="font-size:2rem;margin-bottom:8px">🎁</div>
      <h3 style="font-weight:800;margin-bottom:8px">Refer & Earn ₹100 Each!</h3>
      <p style="font-size:0.85rem;color:var(--text2);margin-bottom:16px">Share your unique code. Both you and your friend get ₹100 wallet credit when they complete their first booking.</p>
      <div class="referral-code" onclick="copyReferral('${code}')">${code}</div>
      <p style="font-size:0.72rem;color:var(--text3);margin-top:6px">Tap to copy</p>
      <div class="share-btns">
        <button class="share-btn wa" onclick="shareReferral('whatsapp','${code}')">📱 WhatsApp</button>
        <button class="share-btn tw" onclick="shareReferral('twitter','${code}')">𝕏 Twitter</button>
        <button class="share-btn cp" onclick="copyReferral('${code}')">📋 Copy Code</button>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:20px">
      <div class="admin-stat"><div class="aval" style="color:var(--accent)">0</div><div class="albl">Referred</div></div>
      <div class="admin-stat"><div class="aval" style="color:var(--green)">₹0</div><div class="albl">Earned</div></div>
      <div class="admin-stat"><div class="aval">0</div><div class="albl">Pending</div></div>
    </div>`;
}

function getWishlistContent() {
  if (!wishlisted.size) return `<div class="empty-state"><div class="icon">❤️</div><h3>No saved routes yet</h3><p>Heart ♡ any bus on the search results to save it here.</p><button class="btn-search" style="margin-top:20px" onclick="closePage();goHome()">Search Buses →</button></div>`;
  return [...wishlisted].map(id => {
    const b = BUS_DATA.find(x => x.id === id);
    if (!b) return '';
    return `
      <div class="booking-card">
        <div class="booking-card-top"><div class="bid">Bus: <span>${b.name}</span></div><div class="booking-status confirmed">${b.type}</div></div>
        <div class="booking-card-body">
          <div class="booking-route">${b.name}</div>
          <div class="booking-meta"><span>⭐ ${b.rating}</span><span>⏰ ${b.dep}</span><span>⏱ ${b.dur}</span><span style="color:var(--accent);font-weight:700">₹${b.price}</span></div>
          <div style="margin-top:12px"><button class="btn-search" style="padding:8px 18px;font-size:0.82rem" onclick="selectBus(${b.id});closePage()">Book Now →</button></div>
        </div>
      </div>`;
  }).join('');
}

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; }
  });
}, { threshold: 0.1 });

// ============================================================
// UPI PAYMENT GATEWAY
// ============================================================
const UPI_APPS = {
  gpay:    { name:'Google Pay',  scheme:'tez://upi/pay' },
  phonepe: { name:'PhonePe',     scheme:'phonepe://pay' },
  paytm:   { name:'Paytm',       scheme:'paytmmp://pay' },
  bhim:    { name:'BHIM UPI',    scheme:'upi://pay'     },
  amazon:  { name:'Amazon Pay',  scheme:'upi://pay'     },
  other:   { name:'UPI',         scheme:'upi://pay'     },
};

function generateTxnId() {
  return 'TXN' + Date.now() + Math.random().toString(36).slice(2,5).toUpperCase();
}
function buildUPIUrl(vpa, name, amount, txnRef, note) {
  return `upi://pay?pa=${encodeURIComponent(vpa)}&pn=${encodeURIComponent(name)}&am=${parseFloat(amount).toFixed(2)}&cu=INR&tn=${encodeURIComponent(note||'BusGo Payment')}&tr=${txnRef}&mc=7523`;
}
function buildAppUPIUrl(appKey, amount, txnRef, note) {
  const base = `pa=${encodeURIComponent(MERCHANT_UPI)}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${parseFloat(amount).toFixed(2)}&cu=INR&tn=${encodeURIComponent(note)}&tr=${txnRef}`;
  const scheme = UPI_APPS[appKey]?.scheme || 'upi://pay';
  return `${scheme}?${base}`;
}
function sanitiseInput(str) { return String(str).replace(/<[^>]*>/g,'').replace(/['"`;]/g,'').trim(); }
function validateUPIId(id)  { return /^[a-zA-Z0-9._-]{3,}@[a-zA-Z]{3,}$/.test(id.trim()); }
function validateAmount(n)  { const v=parseFloat(n); return !isNaN(v) && v>0 && v<=100000; }
function isDuplicateTxn(ref){ return txnDB.some(t=>t.ref===ref && (Date.now()-t.createdAt)<300000); }

function openUPIGateway(amount, bus, seats, passenger) {
  if (!validateAmount(amount)) { showToast('❌ Invalid payment amount'); return; }
  const txnRef = generateTxnId();
  const note   = sanitiseInput(`BusGo ${state.from}-${state.to} Seats:${seats.join(',')}`);
  currentTxn = { ref:txnRef, amount, bus, seats, passenger, note, status:'pending', createdAt:Date.now(),
    upiUrl: buildUPIUrl(MERCHANT_UPI, MERCHANT_NAME, amount, txnRef, note) };
  document.getElementById('modalAmount').textContent = `₹${amount.toLocaleString('en-IN')}`;
  document.getElementById('modalRef').textContent    = `Ref: ${txnRef}`;
  document.getElementById('modalMerchantUPI').textContent = MERCHANT_UPI;
  resetUPIModal();
  document.getElementById('upiModalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  generatePaymentQR(currentTxn.upiUrl);
  startQRCountdown(600);
}

function generatePaymentQR(upiUrl) {
  const container = document.getElementById('modalQRCode');
  if (!container) return;
  container.innerHTML = '';
  try {
    new QRCode(container, { text:upiUrl, width:200, height:200, colorDark:'#000', colorLight:'#fff', correctLevel: QRCode.CorrectLevel.M });
  } catch(e) {
    container.innerHTML = `<div style="width:200px;height:200px;display:flex;flex-direction:column;align-items:center;justify-content:center;border:2px solid #ccc;border-radius:8px;background:#fff;color:#333;text-align:center;padding:12px;gap:6px"><div style="font-size:2rem">🔲</div><div style="font-weight:700;font-size:0.9rem">Scan to Pay</div><div style="font-size:0.7rem;color:#666">${MERCHANT_UPI}</div><div style="font-weight:800;color:#e8521a">₹${currentTxn?.amount||0}</div></div>`;
  }
}

function startQRCountdown(seconds) {
  clearInterval(qrTimerInterval);
  let remaining = seconds;
  const bar = document.getElementById('countdownBar');
  const timer = document.getElementById('qrTimer');
  qrTimerInterval = setInterval(() => {
    remaining--;
    const m = String(Math.floor(remaining/60)).padStart(2,'0');
    const s = String(remaining%60).padStart(2,'0');
    if (timer) timer.textContent = `${m}:${s}`;
    if (bar)   bar.style.width   = `${(remaining/seconds)*100}%`;
    if (remaining <= 0) {
      clearInterval(qrTimerInterval);
      if (timer) timer.textContent = 'Expired';
      if (bar)   bar.style.width   = '0%';
      showToast('⏰ QR expired. Click Retry to generate a new one.');
    }
  }, 1000);
}

// UPI ID verify (details page)
function verifyUPIId() {
  const upiId = sanitiseInput(document.getElementById('pUPI')?.value || '');
  if (!validateUPIId(upiId)) { showToast('❌ Invalid UPI ID. Use format: name@bank'); return; }
  showToast('🔄 Verifying…');
  setTimeout(() => { document.getElementById('upiVerifiedBadge')?.classList.add('show'); showToast(`✅ UPI ID verified: ${upiId}`); }, 1200);
}
function resetUPIVerify() { document.getElementById('upiVerifiedBadge')?.classList.remove('show'); }

// Modal UPI ID verify
function verifyModalUPI() {
  const upiId = sanitiseInput(document.getElementById('modalUPIInput')?.value || '');
  const err   = document.getElementById('modalUPIError');
  const ok    = document.getElementById('modalUPIVerified');
  if (err) err.style.display = 'none';
  ok?.classList.remove('show');
  if (!validateUPIId(upiId)) { if (err) err.style.display = 'block'; return; }
  showToast('🔄 Verifying…');
  setTimeout(() => { ok?.classList.add('show'); showToast(`✅ Verified: ${upiId}`); }, 1200);
}
function resetModalVerify() {
  document.getElementById('modalUPIError')?.style && (document.getElementById('modalUPIError').style.display = 'none');
  document.getElementById('modalUPIVerified')?.classList.remove('show');
}

function selectUPIApp(appKey) {
  document.querySelectorAll('.upi-app-btn').forEach(b => b.classList.remove('active'));
  const id = 'upiApp' + appKey.charAt(0).toUpperCase() + appKey.slice(1);
  document.getElementById(id)?.classList.add('active');
  state.selectedUPIApp = appKey;
  showToast(`✅ ${UPI_APPS[appKey]?.name || 'UPI'} selected`);
}

function openUPIQRPanel() {
  const name  = document.getElementById('pName')?.value.trim();
  const phone = document.getElementById('pPhone')?.value.trim();
  const email = document.getElementById('pEmail')?.value.trim();
  const age   = document.getElementById('pAge')?.value;
  if (!name || !phone || !email || !age) { showToast('⚠️ Fill passenger details first'); return; }
  state.payMethod = 'upi';
  processPayment();
}

function deepLinkUPI(appKey) {
  if (!currentTxn) return;
  const url = buildAppUPIUrl(appKey, currentTxn.amount, currentTxn.ref, currentTxn.note);
  showToast(`📲 Opening ${UPI_APPS[appKey]?.name}…`);
  const link = document.createElement('a');
  link.href = url; link.style.display = 'none';
  document.body.appendChild(link); link.click(); document.body.removeChild(link);
  // Switch to QR tab so UTR field is visible on return
  setTimeout(() => {
    switchPayTab('qr', document.querySelector('.pay-tab'));
    showToast('📋 Return here and enter your UTR number to confirm booking');
    const utrInput = document.getElementById('utrInput');
    if (utrInput) { utrInput.style.borderColor = 'var(--accent)'; utrInput.focus(); }
  }, 1500);
}

function copyUPIId() {
  navigator.clipboard.writeText(MERCHANT_UPI).catch(() => {});
  showToast(`📋 Copied: ${MERCHANT_UPI}`);
}

function switchPayTab(tab, btnEl) {
  document.querySelectorAll('.pay-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.pay-tab-content').forEach(c => c.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  const content = document.getElementById('tab' + tab.charAt(0).toUpperCase() + tab.slice(1));
  if (content) content.classList.add('active');
}

// ── UTR Verification ─────────────────────────────────────────
function onUTRInput(input) {
  const val = input.value.replace(/[^a-zA-Z0-9]/g,'');
  input.value = val;
  const btn = document.getElementById('utrVerifyBtn');
  const hasEnough = val.length >= 10;
  if (btn) { btn.disabled = !hasEnough; btn.style.opacity = hasEnough ? '1' : '0.45'; btn.style.cursor = hasEnough ? 'pointer' : 'not-allowed'; }
  document.getElementById('utrError').style.display = 'none';
}

function validateUTR(utr) { return /^[a-zA-Z0-9]{10,22}$/.test(utr.trim()); }

function verifyAndConfirmPayment() {
  if (!currentTxn) return;
  const utr = (document.getElementById('utrInput')?.value || '').trim().toUpperCase();
  const err = document.getElementById('utrError');
  if (!validateUTR(utr)) {
    if (err) err.style.display = 'block';
    document.getElementById('utrInput').style.borderColor = 'var(--red)';
    return;
  }
  if (err) err.style.display = 'none';
  document.getElementById('utrInput').style.borderColor = 'var(--green)';
  const verifyBtn = document.getElementById('utrVerifyBtn');
  if (verifyBtn) { verifyBtn.disabled = true; verifyBtn.textContent = 'Verifying…'; }
  currentTxn.utr = utr;
  document.getElementById('payActionBtns').style.display = 'none';
  document.getElementById('payStatusSection').style.display = 'block';
  document.querySelectorAll('.pay-tab-content').forEach(c => c.classList.remove('active'));
  // Animate steps
  const steps = ['step1','step2','step3','step4'];
  let i = 0;
  const delays = [800, 1200, 1400, 1000];
  const advance = () => {
    if (i > 0) document.getElementById(steps[i-1])?.classList.remove('active');
    if (i < steps.length) {
      document.getElementById(steps[i])?.classList.add('active');
      i++;
      setTimeout(advance, delays[i-1] || 1000);
    } else {
      steps.forEach(s => { document.getElementById(s)?.classList.remove('active'); document.getElementById(s)?.classList.add('done'); });
      finishPayment('success');
    }
  };
  advance();
}

function finishPayment(result) {
  clearInterval(qrTimerInterval);
  if (result === 'success') {
    currentTxn.status = 'success';
    currentTxn.txnId  = 'UPI' + Date.now().toString().slice(-10);
    currentTxn.paidAt = new Date().toISOString();
    txnDB.unshift({
      ref:currentTxn.ref, txnId:currentTxn.txnId, utr:currentTxn.utr||'—',
      amount:currentTxn.amount, method:'upi', status:'success',
      route:`${state.from} → ${state.to}`, bus:currentTxn.bus?.name,
      passenger:currentTxn.passenger?.name, createdAt:currentTxn.createdAt, paidAt:Date.now()
    });
    document.getElementById('payStatusSection').style.display = 'none';
    document.getElementById('paySuccessResult').classList.add('show');
    document.getElementById('paySuccessTxnId').textContent = `Txn ID: ${currentTxn.txnId}  ·  UTR: ${currentTxn.utr}`;
    setTimeout(() => {
      closeUPIModal();
      document.getElementById('payLoader').classList.add('show');
      setTimeout(() => { document.getElementById('payLoader').classList.remove('show'); showConfirmation(); }, 1000);
    }, 2000);
  } else {
    currentTxn.status = 'failed';
    document.getElementById('payStatusSection').style.display = 'none';
    document.getElementById('payFailResult').classList.add('show');
  }
}

function startPaymentPolling() {
  // Disabled — payment confirmed only by UTR entry
  showToast('💡 Complete payment in your UPI app, then enter the UTR number below');
}

function retryPayment() {
  document.getElementById('payFailResult').classList.remove('show');
  document.getElementById('payActionBtns').style.display = 'block';
  document.getElementById('payStatusSection').style.display = 'none';
  const utrInput = document.getElementById('utrInput');
  if (utrInput) { utrInput.value = ''; utrInput.style.borderColor = 'var(--border)'; }
  const utrBtn = document.getElementById('utrVerifyBtn');
  if (utrBtn) { utrBtn.disabled = true; utrBtn.style.opacity = '0.45'; utrBtn.style.cursor = 'not-allowed'; utrBtn.textContent = 'Confirm →'; }
  const utrErr = document.getElementById('utrError');
  if (utrErr) utrErr.style.display = 'none';
  if (currentTxn) {
    currentTxn.ref    = generateTxnId();
    currentTxn.status = 'pending';
    currentTxn.upiUrl = buildUPIUrl(MERCHANT_UPI, MERCHANT_NAME, currentTxn.amount, currentTxn.ref, currentTxn.note);
    generatePaymentQR(currentTxn.upiUrl);
    startQRCountdown(600);
    document.getElementById('modalRef').textContent = `Ref: ${currentTxn.ref}`;
  }
  switchPayTab('qr', document.querySelector('.pay-tab'));
  document.querySelector('.pay-tab')?.classList.add('active');
  showToast('🔄 New payment session started');
}

function resetUPIModal() {
  clearInterval(qrTimerInterval);
  document.getElementById('payActionBtns').style.display = 'block';
  document.getElementById('payStatusSection').style.display = 'none';
  document.getElementById('paySuccessResult').classList.remove('show');
  document.getElementById('payFailResult').classList.remove('show');
  const mi = document.getElementById('modalUPIInput'); if (mi) mi.value = '';
  resetModalVerify();
  const utrInput = document.getElementById('utrInput');
  if (utrInput) { utrInput.value = ''; utrInput.style.borderColor = 'var(--border)'; }
  const utrBtn = document.getElementById('utrVerifyBtn');
  if (utrBtn) { utrBtn.disabled = true; utrBtn.style.opacity = '0.45'; utrBtn.style.cursor = 'not-allowed'; utrBtn.textContent = 'Confirm →'; }
  const utrErr = document.getElementById('utrError'); if (utrErr) utrErr.style.display = 'none';
  // Reset step states
  ['step1','step2','step3','step4'].forEach(s => { document.getElementById(s)?.classList.remove('active','done'); });
  document.querySelectorAll('.pay-tab').forEach((b,i) => b.classList.toggle('active', i===0));
  document.querySelectorAll('.pay-tab-content').forEach((c,i) => c.classList.toggle('active', i===0));
}

function closeUPIModal() {
  clearInterval(qrTimerInterval);
  document.getElementById('upiModalOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('upiModalOverlay')?.addEventListener('click', function(e) {
  if (e.target === this) closeUPIModal();
});

// ============================================================
// WALLET
// ============================================================
const walletTxns = [
  { icon:'💚', bg:'rgba(45,158,107,0.1)', title:'Welcome Credit',  date:'Today',     amt:50,   type:'credit' },
  { icon:'🎁', bg:'rgba(240,180,41,0.1)', title:'Referral Bonus', date:'3 days ago', amt:100,  type:'credit' },
];
function openWallet() {
  if (!authUser) { openAuth('login'); return; }
  document.getElementById('walletDisplay').textContent  = walletBalance.toLocaleString('en-IN');
  document.getElementById('walletUserName').textContent = authUser.name;
  renderWalletTxns();
  switchWalletTab('add');
  document.getElementById('walletOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeWallet() {
  document.getElementById('walletOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}
function switchWalletTab(tab) {
  const addEl  = document.getElementById('walletTabAdd');
  const txnEl  = document.getElementById('walletTabTxns');
  if (addEl)  addEl.style.display  = tab === 'add'  ? 'block' : 'none';
  if (txnEl)  txnEl.style.display  = tab === 'txns' ? 'block' : 'none';
}
function renderWalletTxns() {
  const list = document.getElementById('walletTxnList');
  if (!list) return;
  const all = [...walletTxns];
  list.innerHTML = all.length ? all.map(t => `
    <div class="wallet-txn-item">
      <div class="wtxn-icon" style="background:${t.bg}">${t.icon}</div>
      <div class="wtxn-info"><div class="wtxn-title">${t.title}</div><div class="wtxn-date">${t.date}</div></div>
      <div class="wtxn-amt ${t.type}">${t.type==='credit'?'+':''}₹${Math.abs(t.amt)}</div>
    </div>`).join('') : '<p style="color:var(--text3);text-align:center;padding:20px;font-size:0.85rem">No transactions yet</p>';
}
function setAddAmt(val) {
  const inp = document.getElementById('addMoneyInput');
  if (inp) inp.value = val;
}
function addWalletMoney() {
  const amt = parseFloat(document.getElementById('addMoneyInput')?.value || 0);
  if (!amt || amt < 1 || amt > 50000) { showToast('⚠️ Enter a valid amount (₹1–₹50,000)'); return; }
  walletBalance += amt;
  walletTxns.unshift({ icon:'➕', bg:'rgba(74,144,226,0.1)', title:'Money Added', date:'Just now', amt, type:'credit' });
  document.getElementById('walletDisplay').textContent = walletBalance.toLocaleString('en-IN');
  document.getElementById('walletAmt').textContent     = `₹${walletBalance.toLocaleString('en-IN')}`;
  document.getElementById('addMoneyInput').value = '';
  renderWalletTxns();
  showToast(`✅ ₹${amt} added to wallet!`);
  pushNotif('💚','rgba(45,158,107,0.1)','Wallet Topped Up',`₹${amt} added to your BusGo Wallet.`);
  // Persist wallet balance to MongoDB (runs in background)
  if (typeof saveWalletToDB === 'function') saveWalletToDB(amt);
}

// ============================================================
// LOYALTY / REWARDS
// ============================================================
const TIERS = [
  { name:'Bronze',   min:0,    max:499,  icon:'🥉', cls:'bronze',   perks:['5% cashback on wallet pay','Priority seat selection','Birthday 10% discount'] },
  { name:'Silver',   min:500,  max:1999, icon:'🥈', cls:'silver',   perks:['8% cashback','Free seat upgrade x2/year','Lounge access on partner buses'] },
  { name:'Gold',     min:2000, max:4999, icon:'🥇', cls:'gold',     perks:['12% cashback','Free cancellation x4/year','Dedicated support line'] },
  { name:'Platinum', min:5000, max:Infinity, icon:'💎', cls:'platinum', perks:['15% cashback','Unlimited free cancellations','VIP boarding + free meals'] },
];
function getCurrentTier() { return TIERS.find(t => loyaltyPoints >= t.min && loyaltyPoints <= t.max) || TIERS[0]; }
function updateLoyaltyUI() {
  const tier = getCurrentTier();
  const pill = document.getElementById('loyaltyPill');
  const lbl  = document.getElementById('loyaltyTierLabel');
  if (pill) { pill.className = `loyalty-pill ${tier.cls}`; pill.style.display = 'flex'; }
  if (lbl)  lbl.textContent = tier.name;
}
function awardPoints(pts) {
  loyaltyPoints += pts;
  updateLoyaltyUI();
  showToast(`⭐ +${pts} BusGo Points earned!`);
  pushNotif('⭐','rgba(240,180,41,0.1)','Points Earned',`You earned ${pts} BusGo Points on your last trip!`);
}
function openRewards() {
  if (!authUser) { openAuth('login'); return; }
  const tier    = getCurrentTier();
  const nextIdx = TIERS.indexOf(tier) + 1;
  const nextTier = TIERS[nextIdx];
  const pct = nextTier ? Math.min(((loyaltyPoints - tier.min) / Math.max(tier.max - tier.min, 1)) * 100, 100) : 100;
  const badge = document.getElementById('rewardsTierBadge');
  if (badge) { badge.className = `tier-badge-large ${tier.cls}`; badge.textContent = `${tier.icon} ${tier.name} Member`; }
  const pts = document.getElementById('rewardsPoints'); if (pts) pts.textContent = loyaltyPoints.toLocaleString();
  const nxt = document.getElementById('rewardsTierNext');
  if (nxt) nxt.textContent = nextTier ? `Earn ${nextTier.min - loyaltyPoints} more points to reach ${nextTier.name}` : "🎉 You've reached the top tier!";
  setTimeout(() => { const bar = document.getElementById('rewardsTierBar'); if (bar) bar.style.width = pct + '%'; }, 300);

  const perksEl  = document.getElementById('rewardsTabPerks');
  const earnEl   = document.getElementById('rewardsTabEarn');
  const redeemEl = document.getElementById('rewardsTabRedeem');
  if (perksEl) perksEl.innerHTML = tier.perks.map(p => `<div class="perk-item"><div class="perk-icon" style="background:rgba(232,82,26,0.08)">✅</div><div class="perk-info"><h4>${p}</h4><p>Active for ${tier.name} members</p></div></div>`).join('');
  if (earnEl)  earnEl.innerHTML  = [
    {icon:'🎫',bg:'rgba(232,82,26,0.08)',title:'Book a ticket',      desc:'Earn 1 pt per ₹10 spent',          pts:'+10–50 pts'},
    {icon:'⭐',bg:'rgba(240,180,41,0.08)',title:'Rate your journey', desc:'Leave a review after travel',       pts:'+25 pts'},
    {icon:'👥',bg:'rgba(74,144,226,0.08)',title:'Refer a friend',    desc:'When they complete first booking',  pts:'+200 pts'},
    {icon:'📱',bg:'rgba(45,158,107,0.08)',title:'Download app',      desc:'Install the BusGo mobile app',     pts:'+50 pts'},
  ].map(e=>`<div class="perk-item"><div class="perk-icon" style="background:${e.bg}">${e.icon}</div><div class="perk-info"><h4>${e.title}</h4><p>${e.desc}</p><div class="perk-pts">${e.pts}</div></div></div>`).join('');
  if (redeemEl) redeemEl.innerHTML = [
    { title:'₹50 off next booking',  desc:'Min. booking ₹300', pts:100 },
    { title:'₹100 off next booking', desc:'Min. booking ₹500', pts:200 },
    { title:'Free seat upgrade',     desc:'Valid on Volvo/AC',  pts:300 },
    { title:'₹250 wallet credit',    desc:'Instant credit',     pts:500 },
  ].map(r => {
    const avail = loyaltyPoints >= r.pts;
    return `<div class="redeem-item"><div class="redeem-info"><h4>${r.title}</h4><p>${r.desc} · ${r.pts} pts required</p></div><button class="redeem-btn" ${!avail?'disabled':''} onclick="redeemReward('${r.title}',${r.pts})">${avail?'Redeem':'Need '+r.pts+' pts'}</button></div>`;
  }).join('');

  document.getElementById('rewardsOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeRewards() {
  document.getElementById('rewardsOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}
function switchRewardsTab(tab, btn) {
  document.querySelectorAll('.rewards-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const perksEl  = document.getElementById('rewardsTabPerks');
  const earnEl   = document.getElementById('rewardsTabEarn');
  const redeemEl = document.getElementById('rewardsTabRedeem');
  if (perksEl)  perksEl.style.display  = tab==='perks'  ? 'block' : 'none';
  if (earnEl)   earnEl.style.display   = tab==='earn'   ? 'block' : 'none';
  if (redeemEl) redeemEl.style.display = tab==='redeem' ? 'block' : 'none';
}
function redeemReward(title, pts) {
  if (loyaltyPoints < pts) { showToast('❌ Not enough points'); return; }
  loyaltyPoints -= pts;
  showToast(`🎉 "${title}" redeemed! Check your email.`);
  openRewards();
  updateLoyaltyUI();
}

// ============================================================
// COMPARISON
// ============================================================
function addToCompare(busId) {
  if (compareList.includes(busId)) { showToast('⚠️ Already in comparison'); return; }
  if (compareList.length >= 3)     { showToast('⚠️ Max 3 buses at once'); return; }
  compareList.push(busId);
  const countEl = document.getElementById('compareCount');
  if (countEl) countEl.textContent = compareList.length;
  const fab = document.getElementById('compareFab');
  if (fab) fab.classList.add('visible');
  showToast(`✅ Added to compare (${compareList.length}/3)`);
}
function openCompare() {
  if (compareList.length < 2) { showToast('⚠️ Add at least 2 buses to compare'); return; }
  const buses = compareList.map(id => BUS_DATA.find(b => b.id === id)).filter(Boolean);
  const header = `<tr><th style="min-width:100px">Feature</th>${buses.map(b=>`<th>${b.name}<br><span style="font-weight:400;color:var(--text3);font-size:0.72rem">${b.type}</span></th>`).join('')}</tr>`;
  const rows = [
    { label:'Rating',    vals: buses.map(b=>b.rating), fmt: v=>`⭐ ${v}`, dir:'high', bar: v=>(v/5)*100, barColor:'var(--yellow)' },
    { label:'Price',     vals: buses.map(b=>b.price),  fmt: v=>`₹${v}`,  dir:'low',  bar: v=>(v/Math.max(...buses.map(b=>b.price)))*100, barColor:'var(--accent)' },
    { label:'Departure', vals: buses.map(b=>b.dep),    fmt: v=>v },
    { label:'Duration',  vals: buses.map(b=>b.dur),    fmt: v=>v },
    { label:'Seats Left',vals: buses.map(b=>b.seats-b.booked.length), fmt: v=>v, dir:'high', bar: v=>(v/40)*100, barColor:'var(--green)' },
    { label:'Amenities', vals: buses.map(b=>b.amenities.join(', ')), fmt: v=>v },
  ];
  const body = rows.map(row => {
    let bestIdx = -1;
    if (row.dir && typeof row.vals[0]==='number') {
      bestIdx = row.dir==='high' ? row.vals.indexOf(Math.max(...row.vals)) : row.vals.indexOf(Math.min(...row.vals));
    }
    return `<tr><td style="font-weight:600;font-size:0.82rem;color:var(--text2);padding:12px 16px">${row.label}</td>${row.vals.map((v,i)=>{
      const cls = bestIdx===i ? 'compare-winner' : '';
      const barHtml = row.bar ? `<div class="compare-bar-wrap"><div class="compare-bar" style="width:${row.bar(v)}%;background:${cls?row.barColor:'var(--border)'}"></div></div>` : '';
      return `<td class="${cls}" style="padding:12px 16px">${row.fmt(v)}${barHtml}</td>`;
    }).join('')}</tr>`;
  }).join('');
  const bookRow = `<tr><td></td>${buses.map(b=>`<td style="padding:12px 16px"><button class="btn-search" style="padding:8px 14px;font-size:0.78rem" onclick="selectBus(${b.id});closeCompare()">Book This →</button></td>`).join('')}</tr>`;
  document.getElementById('compareTableWrap').innerHTML = `<table class="compare-table"><thead>${header}</thead><tbody>${body}${bookRow}</tbody></table>`;
  document.getElementById('compareOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCompare() {
  document.getElementById('compareOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}
function clearComparison() {
  compareList = [];
  const countEl = document.getElementById('compareCount');
  if (countEl) countEl.textContent = '0';
  document.getElementById('compareFab')?.classList.remove('visible');
  closeCompare();
  showToast('🗑 Comparison cleared');
}

// ============================================================
// WISHLIST
// ============================================================
function toggleWishlist(busId, btn) {
  if (wishlisted.has(busId)) {
    wishlisted.delete(busId);
    if (btn) { btn.textContent = '♡'; btn.classList.remove('active'); }
    showToast('Removed from saved routes');
  } else {
    wishlisted.add(busId);
    if (btn) { btn.textContent = '♥'; btn.classList.add('active'); }
    showToast('❤️ Saved to My Routes!');
  }
}

// ============================================================
// NOTIFICATIONS
// ============================================================
const DEMO_NOTIFS = [
  { icon:'🎉', bg:'rgba(232,82,26,0.1)',  title:'Flash Deal Alert',   desc:'Mumbai→Pune fare dropped to ₹99! Limited seats.',   time:'2 min ago',  unread:true  },
  { icon:'✅', bg:'rgba(45,158,107,0.1)', title:'Welcome to BusGo',   desc:'Your account is ready. Start booking now!',          time:'Just now',   unread:true  },
  { icon:'⭐', bg:'rgba(240,180,41,0.1)', title:'Loyalty Points',     desc:'You have 150 welcome points. Open Rewards to redeem.',time:'Just now',   unread:true  },
  { icon:'🏷️', bg:'rgba(74,144,226,0.1)', title:'New Offer',         desc:'Use FESTIVE15 for 15% off your next booking.',        time:'1 hr ago',   unread:false },
];
function initNotifications() {
  notifications = [...DEMO_NOTIFS];
  renderNotifications();
  updateNotifBadge();
}
function renderNotifications() {
  const list = document.getElementById('notifList');
  if (!list) return;
  if (!notifications.length) { list.innerHTML = '<div class="notif-empty">🎉 All caught up!</div>'; return; }
  list.innerHTML = notifications.map((n,i) => `
    <div class="notif-item ${n.unread?'unread':''}" onclick="markNotifRead(${i})">
      <div class="notif-icon-wrap" style="background:${n.bg}">${n.icon}</div>
      <div class="notif-body">
        <div class="ntitle">${n.title}</div>
        <div class="ndesc">${n.desc}</div>
        <div class="ntime">${n.time}</div>
      </div>
    </div>`).join('');
}
function updateNotifBadge() {
  const badge = document.getElementById('notifBadge');
  const cnt   = notifications.filter(n => n.unread).length;
  if (badge) { badge.textContent = cnt; badge.style.display = cnt ? 'flex' : 'none'; }
}
function toggleNotifPanel() { document.getElementById('notifPanel')?.classList.toggle('open'); }
function markNotifRead(i)   { if (notifications[i]) { notifications[i].unread = false; renderNotifications(); updateNotifBadge(); } }
function clearNotifs()      { notifications.forEach(n => n.unread = false); renderNotifications(); updateNotifBadge(); showToast('✅ All cleared'); }
function pushNotif(icon, bg, title, desc) {
  notifications.unshift({ icon, bg, title, desc, time:'Just now', unread:true });
  updateNotifBadge();
  renderNotifications();
}

// ============================================================
// CHAT
// ============================================================
const BOT_RESPONSES = {
  track:   'To track your bus: open **My Bookings** → select booking → Track Bus. Or use Track Bus in the menu with your Booking ID. 📍',
  cancel:  'To cancel: **My Bookings** → select trip → Cancel Booking. Refunds in 1–7 business days. UPI refunds are fastest (1–3 days). 💸',
  refund:  'Refunds timeline: UPI/Net Banking 1–3 days · Card 5–7 days · BusGo Wallet instant. Share your Booking ID and we can check the status for you.',
  payment: 'For payment issues: ensure your UPI ID is correct and bank app is updated. Try a different payment method. Share the error message for faster help.',
  offer:   'Current offers: **BUSGO10** (10% off), **SAVE20** (₹200 off Volvo), **WELCOME** (₹150 off new users), **FESTIVE15** (15% off). Open Offers in the menu! 🏷️',
  wallet:  'BusGo Wallet is a prepaid wallet for faster checkout. Add money, pay instantly, and earn 2% cashback. Open Wallet from your profile icon! 💚',
  points:  'Loyalty Points: earn 1 pt per ₹10 spent. Redeem for discounts and upgrades. You progress Bronze → Silver → Gold → Platinum. Open Rewards to check your balance! ⭐',
  default: 'Thanks for reaching out! Our support team is here 24/7. For urgent help: **1800-123-4567** (toll free). How can I help you further? 😊',
};
function toggleChat() {
  chatOpen = !chatOpen;
  const panel = document.getElementById('chatPanel');
  if (panel) panel.classList.toggle('open', chatOpen);
  if (chatOpen && chatHistory.length === 0) {
    setTimeout(() => addBotMessage("👋 Hi! I'm BusGo's virtual assistant. How can I help you today?"), 300);
    setTimeout(() => addBotMessage('Ask me about tracking, cancellations, refunds, offers, or wallet!'), 1000);
  }
}
function addBotMessage(text) {
  chatHistory.push({ role:'bot', text, time:new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}) });
  renderChat();
}
function sendChatMsg() {
  const inp  = document.getElementById('chatInput');
  if (!inp) return;
  const text = inp.value.trim();
  if (!text) return;
  inp.value = '';
  chatHistory.push({ role:'user', text, time:new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}) });
  renderChat();
  showTypingIndicator();
  setTimeout(() => {
    const lc = text.toLowerCase();
    let resp = BOT_RESPONSES.default;
    if (lc.includes('track') || lc.includes('location') || lc.includes('where'))    resp = BOT_RESPONSES.track;
    else if (lc.includes('cancel'))                                                  resp = BOT_RESPONSES.cancel;
    else if (lc.includes('refund') || lc.includes('money back'))                    resp = BOT_RESPONSES.refund;
    else if (lc.includes('pay') || lc.includes('upi') || lc.includes('error'))     resp = BOT_RESPONSES.payment;
    else if (lc.includes('offer') || lc.includes('coupon') || lc.includes('deal'))  resp = BOT_RESPONSES.offer;
    else if (lc.includes('wallet') || lc.includes('balance'))                       resp = BOT_RESPONSES.wallet;
    else if (lc.includes('point') || lc.includes('reward') || lc.includes('tier'))  resp = BOT_RESPONSES.points;
    addBotMessage(resp);
  }, 1000 + Math.random() * 800);
}
function sendQuickMsg(msg) {
  const inp = document.getElementById('chatInput');
  if (inp) inp.value = msg;
  sendChatMsg();
}
function showTypingIndicator() {
  const msgs = document.getElementById('chatMessages');
  if (!msgs) return;
  const existing = document.getElementById('typingIndicator');
  if (existing) existing.remove();
  const typing = document.createElement('div');
  typing.className = 'chat-msg bot'; typing.id = 'typingIndicator';
  typing.innerHTML = '<div class="chat-typing"><span></span><span></span><span></span></div>';
  msgs.appendChild(typing);
  msgs.scrollTop = msgs.scrollHeight;
  setTimeout(() => { document.getElementById('typingIndicator')?.remove(); }, 2200);
}
function renderChat() {
  const msgs = document.getElementById('chatMessages');
  if (!msgs) return;
  msgs.innerHTML = chatHistory.map(m => `
    <div class="chat-msg ${m.role}">
      <div class="chat-bubble">${m.text.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')}</div>
      <div class="chat-time">${m.time}</div>
    </div>`).join('');
  msgs.scrollTop = msgs.scrollHeight;
}

// ============================================================
// TICKER / FEATURES / TESTIMONIALS
// ============================================================
function initTicker() {
  const items = [
    '🔥 Flash Sale: Mumbai→Pune from ₹99','✅ 10 Million+ happy passengers',
    '🏷️ Code BUSGO10: 10% off all routes','🆕 New route: Nagpur→Hyderabad launched',
    '⭐ Rated 4.8★ by 2M+ travellers','📱 Download app: Extra ₹50 off first booking',
    '🚌 Volvo AC Sleepers: Book 7 days ahead & save 25%','💚 Use Wallet & earn 2% cashback',
    '🎁 Refer a friend: Both get ₹100 wallet credit','🔔 Delhi→Jaipur fare dropped to ₹259',
  ];
  const track = document.getElementById('tickerTrack');
  if (!track) return;
  const doubled = [...items, ...items];
  track.innerHTML = doubled.map(t => `<span class="ticker-item"><span class="ticker-sep">◆</span>${t}</span>`).join('');
}
function initFeatures() {
  const features = [
    { icon:'⚡', bg:'rgba(240,180,41,0.1)', title:'Instant Booking',   desc:'Book in under 60 seconds. Choose seat, pay, get ticket.',         badge:'live',  badgeText:'Live'    },
    { icon:'🔲', bg:'rgba(232,82,26,0.1)',  title:'UPI QR Payments',   desc:'NPCI-compliant QR codes. Pay with any UPI app instantly.',        badge:'new',   badgeText:'New'     },
    { icon:'📍', bg:'rgba(74,144,226,0.1)', title:'Live Bus Tracking', desc:'Real-time GPS tracking with ETA updates.',                        badge:'live',  badgeText:'Live'    },
    { icon:'⚖️', bg:'rgba(45,158,107,0.1)', title:'Bus Comparison',   desc:'Compare up to 3 buses on price, rating, and amenities.',          badge:'new',   badgeText:'New'     },
    { icon:'⭐', bg:'rgba(160,100,240,0.1)',title:'Loyalty Rewards',   desc:'Earn points every booking. Redeem for discounts and upgrades.',   badge:'hot',   badgeText:'Popular' },
    { icon:'💚', bg:'rgba(45,158,107,0.1)', title:'BusGo Wallet',     desc:'Pay instantly. Earn 2% cashback on every wallet payment.',        badge:'',      badgeText:''        },
    { icon:'🌱', bg:'rgba(45,158,107,0.1)', title:'Carbon Tracker',   desc:'See CO₂ savings vs flying. Travel greener, feel better.',        badge:'new',   badgeText:'New'     },
    { icon:'🔔', bg:'rgba(232,82,26,0.1)',  title:'Price Alerts',     desc:'Get notified the moment your route fare drops.',                  badge:'',      badgeText:''        },
    { icon:'👥', bg:'rgba(74,144,226,0.1)', title:'Group Bookings',   desc:'Book for the whole crew. Multiple passengers, one booking.',      badge:'hot',   badgeText:'Popular' },
  ];
  const grid = document.getElementById('featuresGrid');
  if (!grid) return;
  grid.innerHTML = features.map(f => `
    <div class="feature-card">
      <div class="feature-icon" style="background:${f.bg}">${f.icon}</div>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
      ${f.badge ? `<span class="feature-badge ${f.badge}">${f.badgeText}</span>` : ''}
    </div>`).join('');
}
function initTestimonials() {
  const testimonials = [
    { stars:5, text:'Booked a last-minute Pune→Mumbai ticket in 40 seconds. UPI QR was instant and live tracking was spot on!', name:'Rahul S.',  route:'Mumbai → Pune',       color:'#e8521a' },
    { stars:5, text:'BusGo Wallet is a game changer. Topped up once, now booking takes 2 taps. Cashback credited instantly!',    name:'Priya M.',  route:'Delhi → Jaipur',       color:'#2d9e6b' },
    { stars:5, text:'Used bus comparison to pick between 3 Volvos. Saved ₹200. The rating breakdown is super useful.',           name:'Amit K.',   route:'Bangalore → Chennai',  color:'#4a90e2' },
    { stars:5, text:'Price alert notified me at 6am when fare dropped. Got my ticket at ₹149 instead of ₹400. Brilliant!',       name:'Sneha P.',  route:'Hyderabad → Pune',     color:'#f0b429' },
    { stars:5, text:'Group booking for 6 people was smooth. Selected seats for everyone in one go, paid via wallet.',             name:'Vikram R.', route:'Chennai → Coimbatore', color:'#e040fb' },
    { stars:4, text:'Loyalty points add up quickly. Redeemed 500 points for ₹250 wallet credit. Will keep booking with BusGo.', name:'Rohan G.',  route:'Ahmedabad → Mumbai',   color:'#e8521a' },
    { stars:5, text:'Carbon tracker showed I saved 45kg CO₂ vs flying. Good for the planet and wallet!',                         name:'Ananya T.', route:'Delhi → Agra',         color:'#2d9e6b' },
  ];
  const track = document.getElementById('testimonialTrack');
  if (!track) return;
  const doubled = [...testimonials, ...testimonials];
  track.innerHTML = doubled.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-stars">${'★'.repeat(t.stars)}${'☆'.repeat(5-t.stars)}</div>
      <div class="testimonial-text">"${t.text}"</div>
      <div class="testimonial-author">
        <div class="t-avatar" style="background:${t.color}">${t.name[0]}</div>
        <div><div class="t-name">${t.name}</div><div class="t-route">${t.route}</div></div>
      </div>
    </div>`).join('');
}

// ============================================================
// COUNT-UP ANIMATION
// ============================================================
function initCountUp() {
  const els = document.querySelectorAll('.count-up');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target);
      const start  = performance.now();
      const dur    = 2000;
      const tick   = ts => {
        const p    = Math.min((ts - start) / dur, 1);
        const ease = 1 - Math.pow(1-p, 3);
        const val  = Math.round(ease * target);
        el.textContent = val >= 1000000 ? (val/1000000).toFixed(1)+'M' : val >= 1000 ? (val/1000).toFixed(0)+'K' : val;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  els.forEach(el => obs.observe(el));
}

// ============================================================
// CARBON TRACKER
// ============================================================
function showCarbonTracker() {
  const card = document.getElementById('carbonCard');
  if (!card) return;
  const DIST = {'Mumbai-Pune':150,'Delhi-Jaipur':280,'Bangalore-Chennai':350,'Hyderabad-Bangalore':570,'Pune-Goa':450,'Ahmedabad-Mumbai':530,'Delhi-Agra':210,'Chennai-Coimbatore':490};
  const key  = `${state.from}-${state.to}`;
  const dist = DIST[key] || Math.round(150 + Math.random() * 300);
  const n    = state.selectedSeats.length || 1;
  const busCO2    = (dist * 0.03  * n).toFixed(1);
  const flightCO2 = (dist * 0.255 * n).toFixed(1);
  const carCO2    = (dist * 0.171 * n).toFixed(1);
  const savedFly  = (parseFloat(flightCO2) - parseFloat(busCO2)).toFixed(1);
  const savedCar  = (parseFloat(carCO2)    - parseFloat(busCO2)).toFixed(1);
  const trees     = (parseFloat(savedFly) / 21).toFixed(2);
  const savedEl = document.getElementById('carbonSaved');   if (savedEl)  savedEl.textContent  = `${savedFly} kg less`;
  const drivEl  = document.getElementById('carbonDriving'); if (drivEl)   drivEl.textContent   = `${savedCar} kg less`;
  const treesEl = document.getElementById('carbonTrees');   if (treesEl)  treesEl.textContent  = `${trees} trees/year`;
  const msgEl   = document.getElementById('carbonMsg');
  if (msgEl) msgEl.innerHTML = `🌍 Your bus journey emits only <strong>${busCO2} kg CO₂</strong> vs <strong>${flightCO2} kg</strong> by air — <strong>${Math.round((parseFloat(savedFly)/parseFloat(flightCO2))*100)}% fewer emissions</strong>. Great choice!`;
  card.style.display = 'block';
}

// ============================================================
// SOCIAL SHARE
// ============================================================
function shareTrip(platform) {
  const b = state.selectedBus;
  const msg = encodeURIComponent(`Just booked my trip from ${state.from} to ${state.to} on ${b?.name||'BusGo'}! 🚌 Book at busgo.in`);
  if (platform === 'whatsapp') window.open(`https://wa.me/?text=${msg}`, '_blank');
  else if (platform === 'twitter') window.open(`https://twitter.com/intent/tweet?text=${msg}`, '_blank');
  else { navigator.clipboard.writeText(`https://busgo.in`).catch(()=>{}); showToast('📋 Link copied!'); return; }
  showToast('🔗 Sharing your trip!');
}
function copyReferral(code) { navigator.clipboard.writeText(code).catch(()=>{}); showToast(`📋 Code "${code}" copied!`); }
function shareReferral(platform, code) {
  const msg = encodeURIComponent(`Use my BusGo code ${code} and get ₹100 off your first bus ticket! 🚌 busgo.in/ref/${code}`);
  if (platform === 'whatsapp') window.open(`https://wa.me/?text=${msg}`, '_blank');
  else if (platform === 'twitter') window.open(`https://twitter.com/intent/tweet?text=${msg}`, '_blank');
  showToast('🔗 Share link opened!');
}

// ============================================================
// GROUP BOOKING
// ============================================================
function addPassengerRow() {
  const idx = extraPassengers.length;
  extraPassengers.push({});
  let container = document.getElementById('extraPassengersContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'extraPassengersContainer';
    const formCard = document.querySelector('#details-page .form-card');
    if (formCard) formCard.appendChild(container);
    else return;
  }
  const row = document.createElement('div');
  row.className = 'passenger-row'; row.id = `prow${idx}`;
  row.innerHTML = `
    <div class="passenger-row-head">
      <span style="font-size:0.85rem;font-weight:700">Passenger ${idx+2}</span>
      <button class="remove-passenger" onclick="removePassenger(${idx})">✕ Remove</button>
    </div>
    <div class="form-grid">
      <div class="form-field"><input type="text"   id="ep_name${idx}" placeholder=" "><label>Full Name *</label></div>
      <div class="form-field"><input type="number" id="ep_age${idx}"  placeholder=" " min="5" max="100"><label>Age *</label></div>
    </div>`;
  container.appendChild(row);
  showToast(`👥 Passenger ${idx+2} added`);
}
function removePassenger(idx) {
  document.getElementById(`prow${idx}`)?.remove();
  showToast('Passenger removed');
}

// ============================================================
// PAGE-SPECIFIC INIT (after DOM ready)
// ============================================================
window.addEventListener('load', () => {
  // Add group booking button to details page
  const detailsFirstCard = document.querySelector('#details-page .form-card');
  if (detailsFirstCard) {
    const groupBtn = document.createElement('button');
    groupBtn.className = 'add-compare-btn';
    groupBtn.style.cssText = 'margin:0 0 14px;padding:9px 18px';
    groupBtn.innerHTML = '👥 Add Another Passenger';
    groupBtn.onclick   = addPassengerRow;
    detailsFirstCard.insertBefore(groupBtn, detailsFirstCard.firstChild);
  }
  // Attach scroll reveal after initial render
  attachScrollReveal();
  console.log('%c🚌 BusGo v3.0 loaded successfully', 'color:#e8521a;font-weight:bold;font-size:14px');
});

// ============================================================
// SCROLL REVEAL
// ============================================================
function attachScrollReveal() {
  document.querySelectorAll('.route-card, .feature-card, .stat-card').forEach(el => {
    if (el.dataset.revealed) return;
    el.dataset.revealed = '1';
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObserver.observe(el);
  });
}
const _origRenderPopular = renderPopularRoutes;
renderPopularRoutes = function() { _origRenderPopular(); setTimeout(attachScrollReveal, 50); };
const _origRenderBuses   = renderBuses;
renderBuses = function(b) { _origRenderBuses(b); setTimeout(attachScrollReveal, 50); };
const _origInitFeatures  = initFeatures;
initFeatures = function() { _origInitFeatures(); setTimeout(attachScrollReveal, 50); };

// ============================================================
// WALLET PAYMENT — update goDetails to refresh wallet display
// ============================================================
const _origGoDetails = goDetails;
goDetails = function() {
  _origGoDetails();
  if (state.payMethod === 'wallet') {
    const el = document.querySelector('.pay-method[onclick*="wallet"]');
    if (el) selectPay(el, 'wallet');
  }
};

// ============================================================
// TOAST QUEUE
// ============================================================
let _toastQueue   = [];
let _toastRunning = false;
const _rawShowToast = showToast;
showToast = function(msg, duration) {
  duration = duration || 3200;
  _toastQueue.push({ msg, duration });
  if (!_toastRunning) _drainToast();
};
function _drainToast() {
  if (!_toastQueue.length) { _toastRunning = false; return; }
  _toastRunning = true;
  const { msg, duration } = _toastQueue.shift();
  const t = document.getElementById('toast');
  if (!t) { _toastRunning = false; return; }
  t.querySelector('#toastMsg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => { t.classList.remove('show'); setTimeout(_drainToast, 350); }, duration);
}

// ============================================================
// KEYBOARD SHORTCUT: Ctrl+K = focus search
// ============================================================
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const fromInput = document.getElementById('fromCity');
    const hp        = document.getElementById('home-page');
    if (fromInput && hp && hp.style.display !== 'none') { fromInput.focus(); fromInput.select(); showToast('🔍 Search focused (Ctrl+K)', 1500); }
  }
});

// ============================================================
// OFFLINE DETECTION
// ============================================================
function _showOfflineBanner() {
  let b = document.getElementById('offlineBanner');
  if (!b) {
    b = document.createElement('div');
    b.id = 'offlineBanner';
    b.style.cssText = 'position:fixed;top:var(--nav-h);left:0;right:0;z-index:9999;background:#d64444;color:#fff;text-align:center;padding:10px;font-size:0.85rem;font-weight:600';
    b.textContent = '⚠️ You are offline. Some features may not work.';
    document.body.appendChild(b);
  }
  b.style.display = 'block';
}
window.addEventListener('offline', _showOfflineBanner);
window.addEventListener('online', () => {
  const b = document.getElementById('offlineBanner');
  if (b) b.style.display = 'none';
  showToast('✅ Back online!', 2000);
});

// ============================================================
// RECENT SEARCHES (localStorage)
// ============================================================
const _SEARCH_KEY = 'busgo_searches';
function _saveSearch(from, to) {
  if (!from || !to || from === to) return;
  try {
    const r  = JSON.parse(localStorage.getItem(_SEARCH_KEY) || '[]');
    const e  = `${from}→${to}`;
    const f  = r.filter(x => x !== e).slice(0, 4);
    f.unshift(e);
    localStorage.setItem(_SEARCH_KEY, JSON.stringify(f));
  } catch(err) {}
}
function _getRecent() {
  try { return JSON.parse(localStorage.getItem(_SEARCH_KEY) || '[]'); } catch(e) { return []; }
}
function _showRecent(type) {
  const recent = _getRecent();
  if (!recent.length) return;
  const id = type === 'from' ? 'fromDropdown' : 'toDropdown';
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = `<div style="padding:8px 16px;font-size:0.68rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.5px;font-weight:600">Recent Searches</div>` +
    recent.map(r => {
      const parts = r.split('→');
      const city  = type === 'from' ? parts[0]?.trim() : parts[1]?.trim();
      return city ? `<div class="dropdown-item" onclick="selectCity('${type}','${city}')"><span class="icon">🕐</span>${city}</div>` : '';
    }).filter(Boolean).join('');
  el.classList.add('open');
}
// Patch searchBuses to save
const _origSearchBuses = searchBuses;
searchBuses = function() {
  _saveSearch(document.getElementById('fromCity')?.value?.trim(), document.getElementById('toCity')?.value?.trim());
  _origSearchBuses();
};
// Wire focus to show recent
['fromCity','toCity'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('focus', () => { if (!el.value) _showRecent(id === 'fromCity' ? 'from' : 'to'); });
});

// ============================================================
// PAGE VISIBILITY — pause scroll animations
// ============================================================
document.addEventListener('visibilitychange', () => {
  const p = document.hidden ? 'paused' : 'running';
  ['testimonialTrack','tickerTrack'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.animationPlayState = p;
  });
});

// ============================================================
// BROWSER BACK = close modal
// ============================================================
window.addEventListener('popstate', () => {
  if (document.getElementById('upiModalOverlay')?.classList.contains('open')) { closeUPIModal(); return; }
  if (document.getElementById('walletOverlay')?.classList.contains('open'))   { closeWallet();   return; }
  if (document.getElementById('rewardsOverlay')?.classList.contains('open'))  { closeRewards();  return; }
  if (document.getElementById('compareOverlay')?.classList.contains('open'))  { closeCompare();  return; }
  if (document.getElementById('pageOverlay')?.classList.contains('open'))     { closePage();     return; }
  if (document.getElementById('authOverlay')?.classList.contains('open'))     { closeAuth();     return; }
  if (document.getElementById('otpOverlay')?.classList.contains('open'))      { closeOTP();      return; }
  if (document.getElementById('reviewOverlay')?.classList.contains('open'))   { closeReview();   return; }
});

// ============================================================
// PHONE NUMBER FORMATTING
// ============================================================
function initPhoneFormatting() {
  const phones = ['pPhone', 'sPhone'];
  phones.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', function() {
      let v = this.value.replace(/\D/g,'').slice(0,10);
      this.value = v;
    });
    el.addEventListener('paste', function(e) {
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData).getData('text');
      this.value = pasted.replace(/\D/g,'').slice(0,10);
    });
  });
}

// ============================================================
// OTP SYSTEM
// ============================================================
let _otpValue      = '';
let _otpExpiry     = null;
let _otpTimer      = null;
let _otpCallback   = null;
let _otpCountdown  = 30;

function openOTP(phone, callback) {
  _otpCallback  = callback;
  _otpValue     = String(Math.floor(100000 + Math.random() * 900000)); // 6-digit mock OTP
  _otpExpiry    = Date.now() + 300000;
  _otpCountdown = 30;
  const sub = document.getElementById('otpSubtitle');
  if (sub) sub.textContent = `Enter the 6-digit OTP sent to ${phone || 'your mobile'}`;
  for (let i = 1; i <= 6; i++) {
    const inp = document.getElementById('otp'+i);
    if (inp) { inp.value = ''; inp.classList.remove('filled'); }
  }
  document.getElementById('otpResendBtn').disabled  = true;
  document.getElementById('otpVerifyBtn').disabled  = false;
  document.getElementById('otpOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('otp1')?.focus(), 300);
  _startOTPTimer();
  // For demo: show OTP in toast after 1s
  setTimeout(() => showToast(`📱 Demo OTP: ${_otpValue}`, 8000), 1000);
}

function closeOTP() {
  clearInterval(_otpTimer);
  document.getElementById('otpOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function _startOTPTimer() {
  clearInterval(_otpTimer);
  _otpTimer = setInterval(() => {
    _otpCountdown--;
    const cd = document.getElementById('otpCountdown');
    const timerEl = document.getElementById('otpTimer');
    const resendBtn = document.getElementById('otpResendBtn');
    if (cd) cd.textContent = _otpCountdown;
    if (_otpCountdown <= 0) {
      clearInterval(_otpTimer);
      if (timerEl)   timerEl.textContent    = 'OTP expired.';
      if (resendBtn) resendBtn.disabled     = false;
    }
  }, 1000);
}

function otpInput(el, idx) {
  const v = el.value.replace(/\D/g,'');
  el.value = v.slice(-1);
  el.classList.toggle('filled', !!el.value);
  if (el.value && idx < 6) document.getElementById('otp'+(idx+1))?.focus();
  // Auto-verify when all filled
  if (idx === 6 && el.value) {
    const full = Array.from({length:6}, (_,i) => document.getElementById('otp'+(i+1))?.value || '').join('');
    if (full.length === 6) setTimeout(verifyOTP, 200);
  }
}

function otpKeydown(e, idx) {
  if (e.key === 'Backspace' && !document.getElementById('otp'+idx)?.value && idx > 1) {
    document.getElementById('otp'+(idx-1))?.focus();
  }
  if (e.key === 'ArrowLeft'  && idx > 1) document.getElementById('otp'+(idx-1))?.focus();
  if (e.key === 'ArrowRight' && idx < 6) document.getElementById('otp'+(idx+1))?.focus();
}

function verifyOTP() {
  const entered = Array.from({length:6}, (_,i) => document.getElementById('otp'+(i+1))?.value || '').join('');
  if (entered.length < 6) { showToast('⚠️ Enter all 6 digits'); return; }
  if (Date.now() > _otpExpiry) { showToast('⏰ OTP expired. Please resend.'); return; }
  if (entered === _otpValue) {
    closeOTP();
    showToast('✅ Phone verified successfully!');
    if (typeof _otpCallback === 'function') _otpCallback(true);
  } else {
    showToast('❌ Incorrect OTP. Try again.');
    for (let i = 1; i <= 6; i++) {
      const inp = document.getElementById('otp'+i);
      if (inp) { inp.style.borderColor = 'var(--red)'; setTimeout(() => inp.style.borderColor = 'var(--border)', 1500); }
    }
  }
}

function resendOTP() {
  _otpValue     = String(Math.floor(100000 + Math.random() * 900000));
  _otpExpiry    = Date.now() + 300000;
  _otpCountdown = 30;
  document.getElementById('otpResendBtn').disabled = true;
  const timerEl = document.getElementById('otpTimer');
  if (timerEl) timerEl.innerHTML = 'Resend in <span id="otpCountdown">30</span>s';
  _startOTPTimer();
  showToast(`📱 New OTP sent! Demo: ${_otpValue}`, 8000);
}

// ============================================================
// REVIEW / RATING SYSTEM
// ============================================================
let _currentRating   = 0;
let _catRatings      = {};
let _reviewBookingId = null;

function openReviewModal(bookingId) {
  _currentRating   = 0;
  _catRatings      = {};
  _reviewBookingId = bookingId || (myBookings[0]?.id) || null;
  const booking    = myBookings.find(b => b.id === _reviewBookingId);
  const infoEl     = document.getElementById('reviewTripInfo');
  if (infoEl && booking) {
    infoEl.innerHTML = `🚌 <strong>${booking.bus}</strong> · ${booking.from} → ${booking.to} · ${booking.date ? new Date(booking.date).toLocaleDateString('en-IN',{day:'numeric',month:'short'}) : 'Recent trip'}`;
  } else if (infoEl && state.selectedBus) {
    infoEl.innerHTML = `🚌 <strong>${state.selectedBus.name}</strong> · ${state.from} → ${state.to}`;
  }
  // Reset stars
  document.querySelectorAll('#starRow .star-btn').forEach(b => b.textContent = '☆');
  document.querySelectorAll('.review-cat-stars .cat-star').forEach(s => s.textContent = '☆');
  const txt = document.getElementById('reviewText'); if (txt) txt.value = '';
  document.getElementById('reviewOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeReview() {
  document.getElementById('reviewOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function setRating(n) {
  _currentRating = n;
  document.querySelectorAll('#starRow .star-btn').forEach((b,i) => {
    b.textContent = i < n ? '⭐' : '☆';
    b.classList.toggle('active', i < n);
  });
}

function setCatRating(cat, n) {
  _catRatings[cat] = n;
  document.querySelectorAll(`.review-cat-stars[data-cat="${cat}"] .cat-star`).forEach((s,i) => {
    s.textContent = i < n ? '⭐' : '☆';
  });
}

function submitReview() {
  if (_currentRating === 0) { showToast('⚠️ Please select an overall rating'); return; }
  const text  = document.getElementById('reviewText')?.value.trim() || '';
  const anon  = document.getElementById('reviewAnon')?.checked;
  const btn   = document.getElementById('reviewSubmitBtn');
  if (btn) { btn.disabled = true; btn.textContent = 'Submitting…'; }
  setTimeout(() => {
    closeReview();
    awardPoints(25); // Award 25 pts for writing review
    showToast('🙏 Thank you! Your review has been submitted. +25 pts earned!');
    if (btn) { btn.disabled = false; btn.textContent = 'Submit Review →'; }
  }, 1000);
}

// ============================================================
// PDF TICKET DOWNLOAD (simulated with browser print API)
// ============================================================
function downloadTicketPDF() {
  const btn    = document.getElementById('pdfDownloadBtn');
  const prog   = document.getElementById('dlProgress');
  const bar    = document.getElementById('dlBar');
  const pct    = document.getElementById('dlPct');
  if (btn)  { btn.disabled = true; btn.innerHTML = '⏳ Generating…'; }
  if (prog) prog.classList.add('show');
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 25 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      if (bar) bar.style.width = '100%';
      if (pct) pct.textContent = '100%';
      setTimeout(() => {
        if (prog) prog.classList.remove('show');
        if (btn)  { btn.disabled = false; btn.innerHTML = '📥 Download Ticket'; }
        // Trigger browser print as PDF workaround
        const ticketId = document.getElementById('ticketId')?.textContent || 'BG-TICKET';
        showToast(`✅ Ticket ${ticketId} ready. Opening print dialog…`);
        setTimeout(() => window.print(), 500);
      }, 500);
    }
    if (bar) bar.style.width = progress + '%';
    if (pct) pct.textContent = Math.round(progress) + '%';
  }, 120);
}

// ============================================================
// BUS DETAIL EXPAND (click bus card name to expand)
// ============================================================
function toggleBusDetail(id) {
  const el = document.getElementById('busDetail' + id);
  if (!el) return;
  el.classList.toggle('open');
}

// ============================================================
// SLEEPER SEAT LAYOUT (for Sleeper buses)
// ============================================================
function renderSleeperLayout() {
  const bus = state.selectedBus;
  if (!bus || bus.type !== 'Sleeper') return;
  const panel = document.getElementById('seatPanel');
  if (!panel) return;
  // Add type legend
  const legend = document.createElement('div');
  legend.className = 'seat-type-legend';
  legend.innerHTML = `
    <span><span class="seat-type-dot" style="background:rgba(74,144,226,0.3);border:1px solid rgba(74,144,226,0.5)"></span> Upper Berth</span>
    <span><span class="seat-type-dot" style="background:rgba(45,158,107,0.3);border:1px solid rgba(45,158,107,0.5)"></span> Lower Berth</span>
    <span><span class="seat-type-dot" style="background:var(--bg2);border:1px solid var(--border)"></span> Booked</span>`;
  panel.insertBefore(legend, panel.querySelector('.seat-bus-top'));
}

// ============================================================
// ENHANCED AUTOCOMPLETE WITH HIGHLIGHTING
// ============================================================
function showSuggestionsHighlighted(type, val) {
  const id = type === 'from' ? 'fromDropdown' : 'toDropdown';
  const el = document.getElementById(id);
  if (!el) return;
  if (!val) { _showRecent(type); return; }
  const filtered = CITIES.filter(c => c.toLowerCase().includes(val.toLowerCase())).slice(0, 8);
  if (!filtered.length) { el.classList.remove('open'); return; }
  const re = new RegExp(`(${val.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi');
  el.innerHTML = filtered.map(c => `
    <div class="dropdown-item" onclick="selectCity('${type}','${c}')">
      <span class="icon">📍</span>${c.replace(re, '<mark>$1</mark>')}
    </div>`).join('');
  el.classList.add('open');
}

// Override showSuggestions with highlighted version
const _origShowSugg = showSuggestions;
showSuggestions = showSuggestionsHighlighted;

// ============================================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================================
function addARIA() {
  // Nav
  const nav = document.getElementById('nav');
  if (nav) nav.setAttribute('role','navigation');
  // Search form
  const fromCity = document.getElementById('fromCity');
  if (fromCity) { fromCity.setAttribute('aria-label','Departure city'); fromCity.setAttribute('aria-autocomplete','list'); fromCity.setAttribute('aria-expanded','false'); }
  const toCity   = document.getElementById('toCity');
  if (toCity)   { toCity.setAttribute('aria-label','Destination city'); toCity.setAttribute('aria-autocomplete','list'); toCity.setAttribute('aria-expanded','false'); }
  const dateEl   = document.getElementById('travelDate');
  if (dateEl)   dateEl.setAttribute('aria-label','Travel date');
  // Buttons
  document.querySelectorAll('.btn-dark').forEach(b => { if (!b.getAttribute('aria-label')) b.setAttribute('aria-label','Toggle dark mode'); });
  document.querySelectorAll('.hamburger').forEach(b => { b.setAttribute('aria-label','Open menu'); b.setAttribute('aria-expanded','false'); });
  // Live regions
  const busList = document.getElementById('busList');
  if (busList) { busList.setAttribute('aria-live','polite'); busList.setAttribute('aria-label','Bus search results'); }
  const toast = document.getElementById('toast');
  if (toast) { toast.setAttribute('role','alert'); toast.setAttribute('aria-live','assertive'); }
}

// ============================================================
// PWA MANIFEST (inline JSON blob)
// ============================================================
function initPWAManifest() {
  const manifest = {
    name: 'BusGo – Travel Smart',
    short_name: 'BusGo',
    description: "India's #1 bus booking platform",
    start_url: '/',
    display: 'standalone',
    background_color: '#f0ede8',
    theme_color: '#e8521a',
    orientation: 'portrait-primary',
    icons: [
      { src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🚌</text></svg>', sizes: '192x192', type: 'image/svg+xml' },
      { src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🚌</text></svg>', sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable' }
    ],
    categories: ['travel', 'transportation']
  };
  const blob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const link = document.getElementById('pwaManifest');
  if (link) link.href = url;
}

// ============================================================
// ENHANCED doSignup — with OTP verification
// ============================================================
const _origDoSignup = doSignup;
doSignup = function() {
  const phone = document.getElementById('sPhone')?.value.trim() || '';
  // Validate first (original logic will run OTP after)
  const name     = document.getElementById('sName')?.value.trim()  || '';
  const email    = document.getElementById('sEmail')?.value.trim() || '';
  const password = document.getElementById('sPassword')?.value     || '';
  let ok = true;
  ['af-sname','af-semail','af-sphone','af-spassword'].forEach(id => document.getElementById(id)?.classList.remove('error'));
  if (!name || name.length < 2)                        { document.getElementById('af-sname')?.classList.add('error');     ok = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))       { document.getElementById('af-semail')?.classList.add('error');    ok = false; }
  if (!/^\d{10}$/.test(phone))                          { document.getElementById('af-sphone')?.classList.add('error');   ok = false; }
  if (password.length < 6)                              { document.getElementById('af-spassword')?.classList.add('error'); ok = false; }
  if (!ok) return;
  if (registeredUsers.some(u => u.email === email)) {
    document.getElementById('af-semail')?.classList.add('error');
    showToast('⚠️ Email already registered. Please login.'); return;
  }
  // Open OTP for phone verification
  closeAuth();
  openOTP(phone, (verified) => {
    if (verified) {
      const newUser = { name, email, phone, password };
      registeredUsers.push(newUser);
      loginSuccess(newUser);
    } else {
      openAuth('signup');
    }
  });
};

// ============================================================
// ENHANCED INIT
// ============================================================
window.addEventListener('load', () => {
  addARIA();
  initPhoneFormatting();
  initPWAManifest();
});

