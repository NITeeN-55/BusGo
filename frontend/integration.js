// integration.js — BusGo MongoDB DB Helper Functions
// Loads last. Provides saveBookingToDB, saveRefundToDB, saveWalletToDB,
// cancelBookingInDB — called directly from the patched app.js hooks.
// Also loads bookings/refunds from server when those pages open.

'use strict';

// ═══════════════════════════════════════════════════════════
// HELPER: saveBookingToDB
// Called by patched showConfirmation() in app.js after
// the booking is pushed to myBookings[] in memory.
// ═══════════════════════════════════════════════════════════
async function saveBookingToDB(bookingRecord, state, total) {
  if (!Token.exists()) {
    console.warn('DB: booking not saved — user not logged in');
    return;
  }

  const b    = state.selectedBus;
  const p    = state.passenger;
  const seats = state.selectedSeats;

  const passengers = [
    { name: p.name || 'Passenger', age: parseInt(p.age) || 25, gender: p.gender || 'Male' },
  ];
  // Include any extra passengers if app.js collects them
  if (Array.isArray(window.extraPassengers)) {
    window.extraPassengers.forEach(ep => {
      passengers.push({
        name:   ep.name   || 'Passenger',
        age:    parseInt(ep.age) || 25,
        gender: ep.gender || 'Male',
      });
    });
  }

  const payload = {
    busId:       b.id,
    busName:     b.name,
    busType:     b.type,
    from:        state.from,
    to:          state.to,
    date:        state.date,
    depTime:     b.dep,
    arrTime:     b.arr,
    duration:    b.dur,
    seats:       Array.isArray(seats) ? seats : [seats],
    passengers,
    basePrice:   b.price * (Array.isArray(seats) ? seats.length : 1),
    discount:    state.discount || 0,
    walletUsed:  state.payMethod === 'wallet' ? total : 0,
    finalAmount: total,
    payMethod:   state.payMethod || 'card',
    upiApp:      state.selectedUPIApp || null,
    txnId:       (window.currentTxn && window.currentTxn.txnId) || null,
  };

  try {
    const data = await BookingsAPI.create(payload);
    if (data?.booking) {
      // Attach MongoDB _id to the in-memory record so cancel/refund can use it
      bookingRecord._mongoId = data.booking._id;
      bookingRecord.id       = data.booking.pnr; // use real PNR from DB

      // Update the ticket ID shown on screen with the real DB PNR
      const ticketIdEl = document.getElementById('ticketId');
      if (ticketIdEl) ticketIdEl.textContent = data.booking.pnr;

      // Sync loyalty points from server
      if (data.pointsEarned) {
        loyaltyPoints += data.pointsEarned;
        if (typeof updateLoyaltyUI === 'function') updateLoyaltyUI();
        showToast(`⭐ +${data.pointsEarned} points earned!`);
      }

      console.log('✅ DB: Booking saved →', data.booking.pnr, '| Points:', data.pointsEarned);
    }
  } catch (err) {
    console.error('❌ DB: Booking save failed →', err.message);
    showToast('⚠️ Booking shown but not saved: ' + err.message);
  }
}

// ═══════════════════════════════════════════════════════════
// HELPER: saveRefundToDB
// Called by patched submitRefundRequest() in app.js after
// the refund is pushed to refundRequests[] in memory.
// ═══════════════════════════════════════════════════════════
async function saveRefundToDB(rr, booking) {
  if (!Token.exists()) {
    console.warn('DB: refund not saved — user not logged in');
    return;
  }

  // Use the MongoDB _id stored on the booking record (set by saveBookingToDB)
  // Fall back to rr.bookingId (the local PNR) if _mongoId not available
  const mongoBookingId = booking?._mongoId || rr.bookingId;

  try {
    const data = await RefundsAPI.submit(
      mongoBookingId,
      rr.reason,
      rr.description,
      rr.proofName
    );
    if (data?.refund) {
      // Store the MongoDB refund _id back on the in-memory rr object
      rr._mongoId = data.refund._id;
      console.log('✅ DB: Refund saved →', data.refund._id, '| Amount: ₹', data.refund.refundAmount);
    }
  } catch (err) {
    console.error('❌ DB: Refund save failed →', err.message);
    // Don't re-toast — app.js already showed success toast
  }
}

// ═══════════════════════════════════════════════════════════
// HELPER: saveWalletToDB
// Called by patched addWalletMoney() in app.js.
// ═══════════════════════════════════════════════════════════
async function saveWalletToDB(amount) {
  if (!Token.exists()) return;
  try {
    const data = await AuthAPI.addToWallet(amount);
    // Sync walletBalance from server (server is source of truth)
    walletBalance = data.walletBalance;
    console.log('✅ DB: Wallet updated → ₹', walletBalance);
  } catch (err) {
    console.error('❌ DB: Wallet save failed →', err.message);
  }
}

// ═══════════════════════════════════════════════════════════
// HELPER: cancelBookingInDB
// Called by patched cancelBooking() in app.js.
// ═══════════════════════════════════════════════════════════
async function cancelBookingInDB(mongoId) {
  if (!Token.exists()) return;
  try {
    await BookingsAPI.cancel(mongoId);
    console.log('✅ DB: Booking cancelled →', mongoId);
  } catch (err) {
    console.error('❌ DB: Cancel failed →', err.message);
  }
}

// ═══════════════════════════════════════════════════════════
// PATCH openPage — load live data from server when pages open
// Uses window.openPage = to avoid hoisting (NOT function declaration)
// ═══════════════════════════════════════════════════════════
const _appOpenPage = window.openPage; // capture app.js version before override

window.openPage = async function(pageId) {
  _appOpenPage(pageId); // run original first — opens the drawer immediately

  if (!Token.exists() || !authUser) return;

  // ── Bookings page: refresh from MongoDB ──────────────────
  if (pageId === 'bookings') {
    try {
      const data = await BookingsAPI.getAll();
      if (data?.bookings?.length >= 0) {
        myBookings = data.bookings.map(b => ({
          _mongoId:  b._id,
          id:        b.pnr || b._id,
          from:      b.from,
          to:        b.to,
          bus:       b.busName,
          type:      b.busType,
          date:      b.date,
          dep:       b.depTime,
          arr:       b.arrTime,
          seats:     Array.isArray(b.seats) ? b.seats.join(', ') : b.seats,
          amount:    b.finalAmount,
          status:    b.status,
          passenger: b.passengers?.[0]?.name || (authUser && authUser.name) || '',
          payMethod: b.payMethod,
          createdAt: new Date(b.createdAt).getTime(),
        }));
        const pageBody = document.getElementById('pageBody');
        if (pageBody && typeof getBookingsContent === 'function') {
          pageBody.innerHTML = getBookingsContent();
        }
        console.log('✅ DB: Loaded', myBookings.length, 'bookings');
      }
    } catch (err) {
      console.error('❌ DB: Load bookings failed →', err.message);
    }
  }

  // ── Refund Requests page: refresh from MongoDB ────────────
  if (pageId === 'refundRequests') {
    try {
      const data = await RefundsAPI.getAll();
      if (data?.refunds?.length >= 0) {
        refundRequests = data.refunds.map(r => ({
          _mongoId:     r._id,
          id:           r._id,
          bookingId:    typeof r.bookingId === 'object' ? r.bookingId.toString() : r.bookingId,
          userId:       authUser ? authUser.email : '',
          userName:     r.userName,
          from:         r.from,
          to:           r.to,
          bus:          r.busName,
          amount:       r.amount,
          refundAmount: r.refundAmount,
          reason:       r.reason,
          description:  r.description || '',
          proofName:    r.proofName || null,
          status:       r.status,
          payMethod:    r.payMethod || 'card',
          submittedAt:  new Date(r.createdAt).getTime(),
          adminNote:    r.adminNote || '',
          gatewayRef:   r.gatewayRef || null,
        }));
        const pageBody = document.getElementById('pageBody');
        if (pageBody && typeof getRefundRequestsContent === 'function') {
          pageBody.innerHTML = getRefundRequestsContent();
        }
        console.log('✅ DB: Loaded', refundRequests.length, 'refund requests');
      }
    } catch (err) {
      console.error('❌ DB: Load refunds failed →', err.message);
    }
  }
};

console.log('✅ integration.js ready — DB hooks active');
