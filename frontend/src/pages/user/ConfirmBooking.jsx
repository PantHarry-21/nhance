import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmBooking = () => {
  const navigate = useNavigate();
  const imageUrl = localStorage.getItem("bookingImage");
  const address = localStorage.getItem("bookingAddress");
  const user_email = localStorage.getItem("email");

  const handleConfirm = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/bookings/create`, {
        user_email,
        image_url: imageUrl,
        address,
        service_id: "Gold Polishing",
      });

      alert("Booking Confirmed!");
      navigate("/user/my-bookings");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-primary fw-bold mb-4">Confirm Your Booking</h2>

      <div className="card p-3 shadow-sm">
        <img src={imageUrl} alt="Jewellery" className="img-fluid rounded mb-3" />
        <p><strong>Service:</strong> Gold Polishing</p>
        <p><strong>Address:</strong> {address}</p>
        <p className="text-muted mt-2">This is an approximate price. Admin will send the final quotation.</p>
        <button onClick={handleConfirm} className="btn btn-success w-100 mt-3">Confirm Booking</button>
      </div>
    </div>
  );
};

export default ConfirmBooking;
