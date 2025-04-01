import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const userName = localStorage.getItem("name");
  const navigate = useNavigate();

  const handleBookNow = () => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      alert("Please login to book a service.");
      navigate("/login");
    } else {
      navigate("/upload-jewellery");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">
        Welcome {userName ? userName : "Guest"} 👋
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white shadow p-4 rounded">
            <p className="text-center font-semibold">Category {i + 1}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleBookNow}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Book Now
      </button>

      <h3 className="mt-6 font-bold text-xl">Featured Services</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 mb-6">
        <img src="/promo1.jpg" alt="Promo 1" className="rounded" />
        <img src="/promo2.jpg" alt="Promo 2" className="rounded" />
        <img src="/promo3.jpg" alt="Promo 3" className="rounded" />
      </div>
    </div>
  );
};

export default Home;
