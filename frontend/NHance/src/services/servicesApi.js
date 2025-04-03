// === serviceApi.js ===
const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

// Get all services
export const fetchServices = async () => {
  const res = await fetch(`${API_BASE}/services`);
  return await res.json();
};

// Create a service (with FormData)
export const createService = async (formData) => {
  try {
    const res = await fetch(`${API_BASE}/services`, {
      method: 'POST',
      body: formData // DO NOT add Content-Type when sending FormData
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to create service');
    return result;
  } catch (err) {
    console.error("Create Service API error:", err);
    return { error: err.message || 'Unknown error' };
  }
};

// Update service
export const updateService = async (id, formData) => {
  try {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'PUT',
      body: formData
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update service');
    return result;
  } catch (err) {
    console.error("Update Service API error:", err);
    return { error: err.message || 'Unknown error' };
  }
};

// Delete service
export const deleteService = async (id) => {
  const res = await fetch(`${API_BASE}/services/${id}`, {
    method: 'DELETE'
  });
  return res.json();
};
