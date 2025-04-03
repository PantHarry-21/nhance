// === bookingApi.js ===
const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

export const fetchNewBookings = async () => {
  try {
    const res = await fetch(`${API}/booking/new`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching new bookings:", err);
    return [];
  }
};

export const fetchActiveBookings = async () => {
  const res = await fetch(`${API}/booking/active`);
  return res.json();
};

export const fetchCompletedBookings = async () => {
  const res = await fetch(`${API}/booking/completed`);
  return res.json();
};

export const fetchPartners = async () => {
  const res = await fetch(`${API}/partners`);
  return res.json();
};

export const fetchCoupons = async () => {
  const res = await fetch(`${API}/billing/coupons`);
  return res.json();
};

export const assignPartner = async (bookingId, data) => {
  const res = await fetch(`${API}/booking/${bookingId}/assign-partner`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const sendQuotation = async (bookingId, data) => {
  const res = await fetch(`${API}/booking/${bookingId}/quotation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};