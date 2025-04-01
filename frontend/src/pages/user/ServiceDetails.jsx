import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceDetails = () => {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/upload-jewellery");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-purple-700 mb-4">Gold Polishing</h2>
      <img src="/gold.jpg" alt="Service" className="rounded mb-4" />
      <p>This service includes detailed in-house cleaning of your gold jewellery using eco-safe polishing methods.</p>
      <p className="mt-2 font-semibold">Approximate Price: ₹999</p>
      <button onClick={handleBook} className="mt-4 bg-purple-600 text-white px-4 py-2 rounded">
        Book Now
      </button>
    </div>
  );
};

export default ServiceDetails;
