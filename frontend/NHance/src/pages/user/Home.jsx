import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { motion } from "framer-motion";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const userName = localStorage.getItem("name") || "Guest";

  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      const result = Array.isArray(res.data) ? res.data : res.data.data || [];
      setCategories(result);
    });

    axios.get("/api/services").then((res) => {
      const result = Array.isArray(res.data) ? res.data : res.data.data || [];
      const featured = result.filter((s) => s.isFeatured);
      setServices(featured);
    });
  }, []);

  const handleBook = () => {
    if (!isLoggedIn) {
      alert("Please login to continue booking this service.");
      navigate("/login");
    } else {
      navigate("/upload-jewellery");
    }
  };

  const bannerButtonStyle = {
    backgroundColor: "#FFD700",
    color: "#4B0082",
    fontWeight: "600",
    padding: "10px 24px",
    border: "none",
    borderRadius: "6px",
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center px-4 py-3" style={{ background: "linear-gradient(to right, #4B0082, #6a0dad)" }}>
        <div className="d-flex align-items-center gap-3" style={{ flex: 1 }}>
          <h4 style={{ cursor: "pointer", color: "#ffffff", marginBottom: 0, fontWeight: "bold" }} onClick={() => navigate("/")}>NHance</h4>
          <input className="form-control" style={{ maxWidth: "280px", borderRadius: "6px", height: "36px", fontSize: "14px", backgroundColor: "#f4f0ff", border: "1px solid #d1bfff", color: "#4B0082" }} placeholder="Search jewelry services..." />
        </div>
        <div className="d-flex align-items-center gap-2">
          {!isLoggedIn ? (
            <>
              <button className="btn btn-outline-light btn-sm" style={{ borderColor: "#ffffff", color: "#ffffff" }} onClick={() => navigate("/login")}>Login</button>
              <button className="btn btn-sm fw-semibold" style={{ backgroundColor: "#FFD700", color: "#4B0082" }} onClick={() => navigate("/signup")}>Register</button>
            </>
          ) : (
            <Dropdown align="end">
              <Dropdown.Toggle variant="light" size="sm" id="dropdown-profile">
                <i className="bi bi-person-circle fs-5"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate("/user/profile")}>My Profile</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/my-bookings")}>My Bookings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => { localStorage.clear(); navigate("/", { replace: true }); }}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center text-white py-5" style={{ background: "linear-gradient(to right, #4B0082, #6a0dad)" }}>
        <motion.h5 className="mb-2" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {`Welcome ${userName === "Guest" ? "" : "back, "}`}<span style={{ color: "#FFD700" }}>{userName}</span>
        </motion.h5>
        <motion.h2 className="fw-bold mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          Welcome to <span style={{ color: "#FFD700", textShadow: "0 0 10px #FFD700" }}>NHance</span>
        </motion.h2>
        <motion.p className="mb-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>
          Your trusted jewellery services platform
        </motion.p>
        <motion.span style={{ fontSize: "16px", color: "#FFD700" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <i className="bi bi-star-fill me-2" />India's No. 1 Jewellery Cleaning Experts
        </motion.span>
      </section>

      {/* Categories */}
      <section className="bg-white py-5 text-center">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Categories</h5>
            <button className="btn btn-link" onClick={() => navigate("/categories")}>View All</button>
          </div>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((cat, idx) => (
                <div key={idx} className="px-4 py-3 rounded" style={{ cursor: "pointer", minWidth: "160px", backgroundColor: "#f3e6ff", color: "#4B0082" }} onClick={() => navigate(`/category/${cat.name}`)}>
                  <div style={{ fontSize: "1.8rem" }}>{cat.icon || "💍"}</div>
                  {cat.name}
                </div>
              ))
            ) : (
              <p>No categories found.</p>
            )}
          </div>
        </div>
      </section>

      {/* Banner 1 */}
      <section className="my-5">
        <div className="position-relative text-white d-flex flex-column justify-content-center align-items-center text-center" style={{ height: "300px", backgroundImage: `url('/assets/banner1.png')`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: "12px" }}>
          <h3 style={{ color: "#FFD700", fontWeight: "700", textShadow: "1px 1px 3px rgba(0,0,0,0.5)", maxWidth: "90%" }}>
            Because Your Jewellery Deserves Nothing Less Than Perfect.
          </h3>
          <button style={bannerButtonStyle} className="mt-3" onClick={() => navigate("/all-categories")}>Start Your Jewellery Transformation</button>
        </div>
      </section>

      {/* Promo Section */}
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
        </div>
      </section>

      {/* Banner 2 */}
      <section className="my-5">
        <div className="position-relative text-white d-flex flex-column justify-content-center align-items-center text-center" style={{ height: "300px", backgroundImage: `url('/assets/banner2.png')`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: "12px" }}>
          <h3 style={{ color: "#FFD700", fontWeight: "700", textShadow: "1px 1px 3px rgba(0,0,0,0.5)", maxWidth: "90%" }}>
            Shine Bright Again – Professional Jewellery Revival at Your Doorstep.
          </h3>
          <button style={bannerButtonStyle} className="mt-3" onClick={() => navigate("/all-services")}>Schedule Your Sparkle Now</button>
        </div>
      </section>

      {/* Featured Services */}
      <section className="bg-white py-5">
        <div className="container text-center">
          <h5 className="fw-bold mb-4">Our Featured Services</h5>
          {Array.isArray(services) && services.length > 0 ? (
            <div className="row g-4 justify-content-center">
              {services.map((srv, idx) => (
                <div key={idx} className="col-12 col-md-4">
                  <div className="card p-3 shadow-sm">
                    <img src={srv.image} alt={srv.name} className="mb-3" style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "8px" }} />
                    <h6>{srv.name}</h6>
                    <p>₹ {srv.price}</p>
                    <button className="btn btn-warning w-100" onClick={handleBook}>Book Now</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No services available.</p>
          )}
        </div>
      </section>
      
      {/* Banner 3 */}
      <section className="my-5">
        <div className="d-flex align-items-center justify-content-center text-center text-white" style={{ height: "300px", backgroundImage: `url('/assets/banner3.png')`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: "12px" }}></div>
      </section>

      {/* Footer */}
      <footer className="text-white py-5" style={{ backgroundColor: "#6a0dad" }}>
        <div className="container d-flex flex-column flex-md-row justify-content-between">
          <div>
            <h5>NHance</h5>
            <p>Professional at-home jewellery cleaning services across India.</p>
          </div>
          <div>
            <h6>Categories</h6>
            <ul className="list-unstyled small">
              {categories.map((cat, idx) => <li key={idx}>{cat.name}</li>)}
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