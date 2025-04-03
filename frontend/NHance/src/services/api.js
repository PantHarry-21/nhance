const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

// --- AUTH ---
export const signup = async (userData) => {
  const res = await fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const login = async (email, password) => {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const getProfile = async () => {
  const res = await fetch(`${API_BASE}/profile`, {
    method: "GET",
    headers: authHeaders(),
  });
  return res.json();
};

export const updateProfile = async (profileData) => {
  const res = await fetch(`${API_BASE}/profile`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(profileData),
  });
  return res.json();
};
