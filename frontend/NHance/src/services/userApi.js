const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

// ---------------------------
// Customers
// ---------------------------
export const fetchCustomers = async () => {
  const res = await fetch(`${API}/users`);
  return res.json(); // should return an array of users
};

// Fetch all partners
export const fetchPartners = async () => {
  const res = await fetch(`${API}/partners`);
  return res.json();
};

// Invite partner by email (admin action)
export const invitePartner = async (data) => {
  try {
    const res = await fetch(`${API}/partners/invite`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error("API error:", err);
    return null;
  }
};

// Complete partner signup (after invite)
export const completePartnerSignup = async (data) => {
  const res = await fetch(`${API}/partners/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Update partner (admin edit)
export const updatePartner = async (id, data) => {
  const res = await fetch(`${API}/partners/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};


// Delete a partner
export const deletePartner = async (id) => {
  const res = await fetch(`${API}/partners/${id}`, {
    method: "DELETE",
  });
  return res.json();
};


