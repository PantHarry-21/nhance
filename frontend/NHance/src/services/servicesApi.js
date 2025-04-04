// === serviceApi.js ===
const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

// Get all services
export const fetchServices = async () => {
  const res = await fetch(`${API_BASE}/services`);
  return await res.json();
};

export const createService = async (req, res) => {
  try {
    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILE:", req.file);

    const { name, price, category_id } = req.body;

    if (!name) return res.status(400).json({ error: 'Missing service name' });

    // continue insert...
  } catch (err) {
    console.error('Create Service Error:', err);
    res.status(500).json({ error: 'Server error while creating service.' });
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
