import React, { useState } from "react";
import axios from "axios";

const PartnerSignup = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");
  const name = "Invited Partner"; // or get from backend if needed

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

  const handleSubmit = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/partner/register`, formData);
      alert("Registration completed!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-purple-700">Complete Your Registration</h2>
      <div className="space-y-3">
        <input type="text" name="name" value={formData.name} disabled className="w-full p-2 border rounded" />
        <input type="email" name="email" value={formData.email} disabled className="w-full p-2 border rounded" />
        <input type="text" name="services_offered" placeholder="Services Offered" onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="experience" placeholder="Experience" onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="id_proof_url" placeholder="ID Document Link" onChange={handleChange} className="w-full p-2 border rounded" />
        <button onClick={handleSubmit} className="bg-purple-600 text-white px-4 py-2 rounded w-full">
          Submit
        </button>
      </div>
    </div>
  );
};

export default PartnerSignup;
