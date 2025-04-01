import React from "react";

const PartnerProfile = () => {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-purple-700">Partner Profile</h2>
      <div className="bg-white p-4 rounded shadow">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <button className="mt-4 bg-red-500 text-white px-4 py-1 rounded">Logout</button>
      </div>
    </div>
  );
};

export default PartnerProfile;
