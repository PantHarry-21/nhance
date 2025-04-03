import React from "react";

const PartnerProfile = () => {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  return (
    <div className="container py-4">
      <h2 className="text-primary fw-bold mb-4">Partner Profile</h2>

      <div className="card p-3 shadow-sm">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <button className="btn btn-danger mt-3">Logout</button>
      </div>
    </div>
  );
};

export default PartnerProfile;
