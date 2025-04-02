import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingFlow = () => {
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (!imageUrl) return alert("Upload image first.");
    localStorage.setItem("bookingImage", imageUrl);
    navigate("/enter-address");
  };

  return (
    <div className="container py-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-primary fw-bold mb-4">Upload Jewellery Image</h2>

      <div className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Paste Image URL</label>
          <input
            type="text"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/jewellery.jpg"
            required
          />
        </div>
        <button onClick={handleNext} className="btn btn-primary w-100">
          Continue
        </button>
      </div>
    </div>
  );
};

export default BookingFlow;
