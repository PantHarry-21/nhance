import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      {/* Hero Section with Logo and Search Bar */}
      <section className="hero-section">
        <img src="/images/logo.png" alt="NHance" className="logo" />
        <h1>Welcome to <span style={{ color: '#F9A826' }}>NHance</span></h1>
        <p>Your trusted jewellery services platform</p>
        <div className="login-register-btns">
          <input
            className="search-bar"
            type="text"
            placeholder="Search jewelry services..."
          />
          <Link to="/login">
            <button className="btn btn-outline-light ml-2">Login</button>
          </Link>
          <Link to="/register">
            <button className="btn btn-light ml-2">Register</button>
          </Link>
        </div>
      </section>

      {/* Featured Categories and Featured Services Side-by-Side */}
      <section className="services-categories-section">
        <div className="categories-section">
          <div className="category-card">
            <img src="/images/ring-icon.png" alt="Ring Cleaning" />
            <h4>Ring Cleaning</h4>
            <button className="btn btn-outline-light">View All</button>
          </div>
          <div className="category-card">
            <img src="/images/necklace-icon.png" alt="Necklace Polishing" />
            <h4>Necklace Polishing</h4>
            <button className="btn btn-outline-light">View All</button>
          </div>
          <div className="category-card">
            <img src="/images/necklace-icon.png" alt="Necklace Polishing" />
            <h4>Necklace Polishing</h4>
            <button className="btn btn-outline-light">View All</button>
          </div>
        </div>

        <div className="featured-services-section">
          <div className="service-card">
            <img src="/images/bracelet-shine.jpg" alt="Bracelet Shine" />
            <h5>Bracelet Shine</h5>
            <p>₹500</p>
            <button className="btn btn-success">Book Now</button>
          </div>
          <div className="service-card">
            <img src="/images/pendant-cleaning.jpg" alt="Pendant Cleaning" />
            <h5>Pendant Cleaning</h5>
            <p>₹800</p>
            <button className="btn btn-success">Book Now</button>
          </div>
          <div className="service-card">
            <img src="/images/pendant-cleaning.jpg" alt="Pendant Cleaning" />
            <h5>Pendant Cleaning</h5>
            <p>₹800</p>
            <button className="btn btn-success">Book Now</button>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promo-banner">
        <h2>Sparkling Jewelry, Just a Click Away</h2>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-links">
          <a href="/services">Services</a>
          <a href="/categories">Categories</a>
          <a href="/terms">Terms & Conditions</a>
        </div>
        <div className="copyright">
          <p>© 2024 NHance. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
