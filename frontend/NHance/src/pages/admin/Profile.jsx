import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const admin = {
    name: "NHance Admin",
    email: "admin@inhance.com",
    role: "Administrator",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <div className="p-4">
      <h2 className="fw-bold mb-4">My Profile</h2>

      <div className="card p-4 shadow-sm border-0" style={{ maxWidth: "500px" }}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Full Name</label>
          <input className="form-control" value={admin.name} readOnly />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Email Address</label>
          <input className="form-control" value={admin.email} readOnly />
        </div>
        <div className="mb-4">
          <label className="form-label fw-semibold">Role</label>
          <input className="form-control" value={admin.role} readOnly />
        </div>

        <button className="btn btn-danger w-100 fw-bold" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
