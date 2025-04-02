import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceDetails = () => {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/upload-jewellery");
  };

  return (
    <div className="container py-4" style={{ maxWidth: "700px" }}>
      <h2 className="text-primary fw-bold mb-4">Gold Polishing</h2>
      <img src="/gold.jpg" alt="Service" className="img-fluid rounded mb-3" />
      <p>This service includes detailed in-house cleaning of your gold jewellery using eco-safe polishing methods.</p>
      <p className="fw-semibold mt-2">Approximate Price: ₹999</p>
      <button onClick={handleBook} className="btn btn-primary mt-3">Book Now</button>
    </div>
  );
};

export default ServiceDetails;
