import React from "react";

const MyProfile = () => {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  return (
    <div className="container py-5" style={{ maxWidth: "600px" }}>
      <h3 className="text-center mb-4 text-primary">My Profile</h3>
      <div className="card p-4 shadow-sm">
        <p><strong>Full Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Membership:</strong> Premium</p>
        <p><strong>Joined:</strong> Jan 2024</p>
      </div>
    </div>
  );
};

export default MyProfile;
