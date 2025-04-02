import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "dummyToken");
    localStorage.setItem("email", email);
    navigate("/");
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', minHeight: "100vh" }}>
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center px-4 py-3 shadow-sm bg-white">
      <h4
  className="fw-bold text-primary m-0"
  style={{ cursor: "pointer" }}
  onClick={() => navigate("/")}
>
  NHance
</h4>

        <input type="text" className="form-control w-50" placeholder="Search services..." />
        <div>
          <button className="btn btn-outline-primary me-2" onClick={() => navigate("/login")}>Login</button>
          <button className="btn btn-warning fw-semibold" onClick={() => navigate("/signup")}>Register</button>
        </div>
      </header>

      {/* Login Card */}
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
          <h3 className="text-center mb-2 text-primary">Welcome Back</h3>
          <p className="text-center mb-3 text-muted">Login to your NHance account</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-1">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="text-end mb-3">
              <button className="btn btn-link p-0" type="button" onClick={() => alert("Forgot Password flow coming soon!")}>
                Forgot Password?
              </button>
            </div>
            <button type="submit" className="btn w-100 fw-bold"
              style={{ backgroundColor: "#FFD700", color: "#4B0082" }}>
              Login
            </button>
          </form>
          <div className="text-center mt-3">
            New to NHance?{" "}
            <button className="btn btn-link p-0" onClick={() => navigate("/signup")}>Register Here</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-white py-4" style={{ background: '#4B0082' }}>
        <div className="container d-flex flex-column flex-md-row justify-content-between">
          <div>
            <h5 className="fw-bold">NHance</h5>
            <p style={{ maxWidth: '300px' }}>
              NHance offers professional in-home jewellery cleaning services, bringing the sparkle back to your treasures.
            </p>
          </div>
          <div>
            <h6>Services</h6>
            <ul className="list-unstyled">
              <li>Bracelet Shine</li>
              <li>Pendant Cleaning</li>
              <li>Earring Restoration</li>
            </ul>
          </div>
          <div>
            <h6>Categories</h6>
            <ul className="list-unstyled">
              <li>Ring Cleaning</li>
              <li>Necklace Polishing</li>
              <li>Earring Restoration</li>
            </ul>
          </div>
          <div>
            <h6>Terms</h6>
            <ul className="list-unstyled">
              <li>& Conditions</li>
            </ul>
          </div>
        </div>
        <hr className="my-3" />
        <div className="text-center">
          © 2024 NHance. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default login;
