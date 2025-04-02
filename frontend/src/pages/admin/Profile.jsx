import React from "react";

const Profile = () => {
  return (
    <div className="container py-4">
      <h2 className="text-primary fw-bold mb-4">Admin Profile</h2>

      <div className="card p-3 shadow-sm">
        <p><strong>Name:</strong> Admin</p>
        <p><strong>Email:</strong> admin@inhance.com</p>
      </div>
    </div>
  );
};

export default Profile;
