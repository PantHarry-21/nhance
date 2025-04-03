import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../services/api';
import { toast } from 'react-toastify';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

const Signup = () => {
  const navigate = useNavigate();
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    fullAddress: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddressSelect = (autocomplete) => {
    const place = autocomplete.getPlace();
    setForm({
      ...form,
      fullAddress: place.formatted_address || '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      console.log("Sending signup data to backend:", form);
      const res = await signup({
        email: form.email,
        password: form.password,
        full_name: form.full_name,
        address: {
          full: form.fullAddress,
          street: form.street,
          city: form.city,
          state: form.state,
          zip: form.zip,
        },
      });

      if (res.error) return toast.error(res.error);
      toast.success("Signup successful! Please login.");
      navigate('/login');
    } catch (err) {
      toast.error("Signup failed");
    }
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #f8e8ff, #f9f5e3)', minHeight: "100vh" }}>
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center px-5 py-4 shadow-sm bg-white">
        <h4 className="fw-bold text-primary m-0" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          NHance
        </h4>
        <input type="text" className="form-control w-50 mx-3" placeholder="Search services..." />
        <div>
          <button className="btn btn-outline-primary me-2" onClick={() => navigate("/login")}>Login</button>
          <button className="btn btn-warning fw-semibold" onClick={() => navigate("/signup")}>Register</button>
        </div>
      </header>

      {/* Signup Card */}
      <div className="d-flex justify-content-center align-items-center px-2" style={{ minHeight: "80vh", paddingTop: "60px", paddingBottom: "60px" }}>
        <div className="card p-4 shadow-lg overflow-auto" style={{ maxHeight: "90vh", maxWidth: "500px", width: "100%" }}>
          <h3 className="text-center mb-2" style={{ color: "#4B0082" }}>Create Account</h3>
          <p className="text-center text-muted mb-3">Join NHance Jewelry Cleaning Service</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="form-label">Full Name</label>
              <input name="full_name" type="text" className="form-control" value={form.full_name} onChange={handleChange} required />
            </div>
            <div className="mb-2">
              <label className="form-label">Email</label>
              <input name="email" type="email" className="form-control" value={form.email} onChange={handleChange} required />
            </div>

            {!showAddressFields && (
              <p className="text-end">
                <button type="button" className="btn btn-link p-0" onClick={() => setShowAddressFields(true)}>
                  Add Address
                </button>
              </p>
            )}

            {showAddressFields && (
              <>
                <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={libraries}>
                  <div className="mb-2">
                    <label className="form-label">Search Full Address</label>
                    <Autocomplete
                      onLoad={ac => (window.autocomplete = ac)}
                      onPlaceChanged={() => handleAddressSelect(window.autocomplete)}
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type your address"
                        value={form.fullAddress}
                        onChange={(e) => setForm({ ...form, fullAddress: e.target.value })}
                      />
                    </Autocomplete>
                  </div>
                </LoadScript>
                <div className="mb-2"><label className="form-label">Street</label><input name="street" className="form-control" value={form.street} onChange={handleChange} /></div>
                <div className="mb-2"><label className="form-label">City</label><input name="city" className="form-control" value={form.city} onChange={handleChange} /></div>
                <div className="mb-2"><label className="form-label">State</label><input name="state" className="form-control" value={form.state} onChange={handleChange} /></div>
                <div className="mb-2"><label className="form-label">Zip Code</label><input name="zip" className="form-control" value={form.zip} onChange={handleChange} /></div>
              </>
            )}

            <div className="mb-2">
              <label className="form-label">Password</label>
              <div className="input-group">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </button>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                className="form-control"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn w-100 fw-bold" style={{ backgroundColor: "#4B0082", color: "#fff" }}>
              Create Account
            </button>
          </form>

          <div className="text-center mt-3">
            Already have an account?{" "}
            <button className="btn btn-link p-0" onClick={() => navigate("/login")}>Sign in</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-white py-5 px-4" style={{ background: '#4B0082' }}>
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
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
        <hr className="my-3" />
        <div className="text-center">
          © 2025 NHance. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Signup;
