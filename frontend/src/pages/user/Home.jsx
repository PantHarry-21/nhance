import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from "react-bootstrap/Dropdown";


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
      navigate("/upload-image");
    }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <header
        className="d-flex justify-content-between align-items-center px-4 py-3"
        style={{ backgroundColor: "#4B0082", color: "white" }}
      >
        <h4 className="fw-bold m-0" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
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
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          <i className="bi bi-person-circle fs-5"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => navigate("/MyProfile")}>My Profile</Dropdown.Item>
          <Dropdown.Item onClick={() => navigate("/MyBookings")}>My Bookings</Dropdown.Item>
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

      {/* Hero Banner */}
      <section
        className="text-center text-white py-5"
        style={{ background: "linear-gradient(to bottom right, #4B0082, #6a0dad)" }}
      >
        <h2 className="fw-bold mb-3">
          Welcome to <span style={{ color: "#FFD700" }}>NHance</span>
        </h2>
        <p className="mb-4">your trusted jewellery services platform</p>
        <input
          type="text"
          className="form-control w-75 mx-auto"
          placeholder="Search jewelry services..."
        />
      </section>

      {/* Categories */}
      <section className="bg-white py-5 text-center">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="text-dark">Categories</h5>
            <button className="btn btn-link" onClick={() => navigate("/category")}>
              View All
            </button>
          </div>
          <div className="d-flex flex-wrap justify-content-center gap-4 mt-3">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="px-4 py-3 rounded text-white"
                style={{
                  backgroundColor: "#4B0082",
                  minWidth: "160px",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/category/${cat.name}`)}
              >
                {cat.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section
        className="text-center text-white py-5"
        style={{ background: "linear-gradient(to bottom right, #6a0dad, #8a2be2)" }}
      >
        <div className="container">
          <h4 className="mb-4 fw-bold">Premium Jewelry Cleaning Services</h4>
          <p className="mb-5">
            Trust your precious jewelry to our expert care. We combine
            professional techniques with personalized service to restore your
            treasured pieces to their original brilliance.
          </p>
          <div className="d-flex flex-column flex-md-row justify-content-center gap-4 mb-4">
            <div className="bg-light text-dark p-3 rounded" style={{ minWidth: "200px" }}>
              <div className="fs-4 mb-2">⏱️</div>
              <h6 className="fw-bold">Fast Turnaround</h6>
              <p className="small">Most pieces returned within 24 hours, sparkling clean.</p>
            </div>
            <div className="bg-light text-dark p-3 rounded" style={{ minWidth: "200px" }}>
              <div className="fs-4 mb-2">💖</div>
              <h6 className="fw-bold">Gentle Care</h6>
              <p className="small">Safe solutions for different metals and gems.</p>
            </div>
            <div className="bg-light text-dark p-3 rounded" style={{ minWidth: "200px" }}>
              <div className="fs-4 mb-2">🛡️</div>
              <h6 className="fw-bold">Fully Insured</h6>
              <p className="small">Your jewelry is protected while in our care.</p>
            </div>
          </div>
          <button className="btn btn-warning fw-bold">Book Your Cleaning Today</button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-dark text-white text-center py-5">
        <div className="container">
          <div className="fs-3 mb-3">⭐</div>
          <h5 className="fw-bold mb-2">Ready to Make Your Jewelry Shine?</h5>
          <p className="mb-4">
            Book our professional jewelry cleaning service today and experience
            the NHance difference.
          </p>
          <button className="btn btn-light" onClick={handleBook}>
            Book Now
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
                <div className="card shadow-sm p-3">
                  <h6>{srv.name}</h6>
                  <p className="mb-2">₹ {srv.price}</p>
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
      <footer style={{ backgroundColor: "#4B0082" }} className="text-white pt-5 pb-3 mt-5">
        <div className="container d-flex flex-column flex-md-row justify-content-between gap-4">
          <div style={{ maxWidth: "250px" }}>
            <h4 className="fw-bold text-white">NHance</h4>
            <p className="small">
              NHance offers professional in-home jewellery cleaning services,
              making your treasures shine with brilliance.
            </p>
          </div>
          <div>
            <h6 className="fw-bold">Services</h6>
            <ul className="list-unstyled small">
              <li>Bracelet Shine</li>
              <li>Pendant Cleaning</li>
              <li>Earring Restoration</li>
            </ul>
          </div>
          <div>
            <h6 className="fw-bold">Categories</h6>
            <ul className="list-unstyled small">
              <li>Ring Cleaning</li>
              <li>Necklace Polishing</li>
              <li>Earring Restoration</li>
            </ul>
          </div>
          <div>
            <h6 className="fw-bold">Terms</h6>
            <ul className="list-unstyled small">
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
        <hr className="border-light my-4" />
        <div className="text-center small text-light">
          © 2025 NHance. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
