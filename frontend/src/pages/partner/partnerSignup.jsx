import React, { useState } from "react";
import axios from "axios";

const PartnerSignup = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");
  const name = "Invited Partner";

  const [formData, setFormData] = useState({
    email,
    name,
    services_offered: "",
    experience: "",
    id_proof_url: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/partner/register`, formData);
      alert("Registration completed!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-primary fw-bold mb-4">Complete Your Registration</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" className="form-control" name="name" value={formData.name} disabled />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={formData.email} disabled />
        </div>
        <div className="mb-3">
          <label className="form-label">Services Offered</label>
          <input type="text" className="form-control" name="services_offered" value={formData.services_offered} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Experience (years)</label>
          <input type="number" className="form-control" name="experience" value={formData.experience} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">ID Proof URL</label>
          <input type="text" className="form-control" name="id_proof_url" value={formData.id_proof_url} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
};

export default PartnerSignup;
