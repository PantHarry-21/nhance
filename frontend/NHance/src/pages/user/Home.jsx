import React from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const categories = [
    { name: "Ring Cleaning" },
    { name: "Necklace Polishing" },
    { name: "Earring Restoration" },
  ];

  const services = [
    { name: "Bracelet Shine", price: 500 },
    { name: "Pendant Cleaning", price: 800 },
    { name: "Diamond Ring Care", price: 1200 },
  ];

  const handleBook = () => {
    if (!isLoggedIn) {
      alert("Please login to continue booking this service.");
      navigate("/login");
    } else {
      navigate("/upload-jewellery");
    }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center px-4 py-3 bg-dark text-white">
        <h4 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          NHance
        </h4>
        <div>
          {!isLoggedIn ? (
            <>
              <button className="btn btn-outline-light me-2" onClick={() => navigate("/login")}>
                Login
              </button>
              <button className="btn btn-warning" onClick={() => navigate("/signup")}>
                Register
              </button>
            </>
          ) : (
            <Dropdown align="end">
              <Dropdown.Toggle variant="light" id="dropdown-profile">
                <i className="bi bi-person-circle fs-5"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate("/user/profile")}>My Profile</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/my-bookings")}>My Bookings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => {
                    localStorage.clear();
                    navigate("/", { replace: true });
                  }}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="text-center text-white py-5" style={{ background: "linear-gradient(to right, #4B0082, #6a0dad)" }}>
        <h2 className="fw-bold mb-3">
          Welcome to <span style={{ color: "#FFD700" }}>NHance</span>
        </h2>
        <p className="mb-4">your trusted jewellery services platform</p>
        <input className="form-control w-75 mx-auto" placeholder="Search jewelry services..." />
      </section>

      {/* Categories */}
      <section className="bg-white py-5 text-center">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Categories</h5>
            <button className="btn btn-link" onClick={() => navigate("/category/Ring Cleaning")}>
              View All
            </button>
          </div>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-dark text-white px-4 py-3 rounded"
                style={{ cursor: "pointer", minWidth: "160px" }}
                onClick={() => navigate(`/category/${cat.name}`)}
              >
                {cat.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="text-white text-center py-5" style={{ background: "linear-gradient(to right, #6a0dad, #8a2be2)" }}>
        <div className="container">
          <h4 className="fw-bold mb-3">Premium Jewelry Cleaning Services</h4>
          <p className="mb-4">Trust our experts to restore your jewelry to its original brilliance.</p>
          <div className="d-flex justify-content-center flex-wrap gap-4">
            <div className="bg-light text-dark p-3 rounded" style={{ minWidth: 180 }}>
              <div>⏱️</div>
              <strong>Fast Turnaround</strong>
              <p className="small">Most items cleaned in 24h</p>
            </div>
            <div className="bg-light text-dark p-3 rounded" style={{ minWidth: 180 }}>
              <div>💖</div>
              <strong>Gentle Care</strong>
              <p className="small">Safe solutions for gems</p>
            </div>
            <div className="bg-light text-dark p-3 rounded" style={{ minWidth: 180 }}>
              <div>🛡️</div>
              <strong>Fully Insured</strong>
              <p className="small">We protect your items</p>
            </div>
          </div>
          <button className="btn btn-warning fw-bold mt-4" onClick={handleBook}>
            Book Your Cleaning Today
          </button>
        </div>
      </section>

      {/* Featured Services */}
      <section className="bg-white py-5">
        <div className="container text-center">
          <h5 className="fw-bold mb-4">Our Featured Services</h5>
          <div className="row g-4 justify-content-center">
            {services.map((srv, idx) => (
              <div key={idx} className="col-12 col-md-4">
                <div className="card p-3 shadow-sm">
                  <h6>{srv.name}</h6>
                  <p>₹ {srv.price}</p>
                  <button className="btn btn-warning w-100" onClick={handleBook}>
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white bg-dark py-5">
        <div className="container d-flex flex-column flex-md-row justify-content-between">
          <div>
            <h5>NHance</h5>
            <p>Professional at-home jewellery cleaning services across India.</p>
          </div>
          <div>
            <h6>Categories</h6>
            <ul className="list-unstyled small">
              <li>Ring Cleaning</li>
              <li>Necklace Polishing</li>
              <li>Earring Restoration</li>
            </ul>
          </div>
          <div>
            <h6>Quick Links</h6>
            <ul className="list-unstyled small">
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
        <hr className="border-light" />
        <div className="text-center small">© 2025 NHance. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default Home;
