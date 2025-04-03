const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

export const fetchCategories = async () => {
  const res = await fetch(`${API}/categories`);
  return res.json();
};

export const createCategory = async (data) => {
  const res = await fetch(`${API}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`POST /categories failed: ${res.status} - ${errorText}`);
  }

  return res.json();
};


export const updateCategory = async (id, data) => {
  const res = await fetch(`${API}/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteCategory = async (id) => {
  try {
    const res = await fetch(`${API}/categories/${id}`, {
      method: "DELETE",
    });

    const contentType = res.headers.get("content-type");
    if (!res.ok) {
      const errorText = await res.text();
      return { error: `Failed (${res.status}): ${errorText}` };
    }

    if (contentType && contentType.includes("application/json")) {
      return res.json();
    }

    return {};
  } catch (err) {
    return { error: "Server not reachable or network error." };
  }
};
