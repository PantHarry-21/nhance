import React from "react";

const Profile = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-purple-700 mb-4">Admin Profile</h2>

      <div className="bg-white p-4 rounded shadow">
        <p><strong>Name:</strong> Admin</p>
        <p><strong>Email:</strong> admin@inhance.com</p>
        <button className="mt-4 bg-red-500 text-white px-4 py-1 rounded">Logout</button>
      </div>
    </div>
  );
};

export default Profile;
