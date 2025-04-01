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
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-purple-700 mb-4">Confirm Your Booking</h2>
      <img src={imageUrl} alt="Jewellery" className="rounded w-full mb-4" />
      <p><strong>Service:</strong> Gold Polishing</p>
      <p><strong>Address:</strong> {address}</p>
      <p className="text-sm text-gray-600 mt-2">
        This is an estimated price. The final quote will be provided by the admin.
      </p>
      <button onClick={handleConfirm} className="mt-4 w-full bg-green-600 text-white py-2 rounded">
        Confirm Booking
      </button>
    </div>
  );
};

export default ConfirmBooking;
