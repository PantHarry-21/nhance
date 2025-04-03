const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

// === COUPONS ===

// ✅ Fetch all coupons
export const fetchCoupons = async () => {
  const res = await fetch(`${API_BASE}/billing/coupons`, {
    method: "GET",
    headers: authHeaders(),
  });
  return res.json();
};

// ✅ Create coupon
export const createCoupon = async (couponData) => {
  const res = await fetch(`${API_BASE}/billing/coupons`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(couponData),
  });
  return res.json();
};

// ✅ Update coupon
export const updateCoupon = async (id, updatedData) => {
  const res = await fetch(`${API_BASE}/billing/coupons/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(updatedData),
  });
  return res.json();
};

// ✅ Delete coupon
export const deleteCoupon = async (id) => {
  const res = await fetch(`${API_BASE}/billing/coupons/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return res.json();
};

// === BILLING HISTORY ===

// ✅ Fetch billing history for completed services
export const fetchBillingHistory = async () => {
  const res = await fetch(`${API_BASE}/billing/history`, {
    method: "GET",
    headers: authHeaders(),
  });
  return res.json();
};

// === COMMISSION TRACKING ===

// ✅ Fetch commission details
export const fetchCommissions = async () => {
  const res = await fetch(`${API_BASE}/billing/commissions`, {
    method: "GET",
    headers: authHeaders(),
  });
  return res.json();
};
