import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const email = localStorage.getItem("email");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/bookings/my/${email}`);
        setBookings(res.data.bookings);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookings();
  }, [email]);

  return (
    <div className="container py-4">
      <h2 className="text-primary fw-bold mb-4">My Bookings</h2>
      {bookings.map((booking, index) => (
        <div key={index} className="card p-3 shadow-sm mb-4">
          <img src={booking.image_url} alt="Jewellery" className="img-fluid rounded mb-2" />
          <p><strong>Address:</strong> {booking.address}</p>
          <p><strong>Status:</strong> {booking.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
