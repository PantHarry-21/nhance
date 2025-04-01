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
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-purple-700 mb-4">Upload Jewellery Image</h2>
      <input
        type="text"
        placeholder="Paste Image URL here"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full border p-2 mb-4"
      />
      <button onClick={handleNext} className="bg-purple-600 text-white w-full py-2 rounded">
        Continue
      </button>
    </div>
  );
};

export default BookingFlow;
