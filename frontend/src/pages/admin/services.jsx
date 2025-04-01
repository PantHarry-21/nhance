import React from "react";

const Services = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-purple-700 mb-4">Manage Services</h2>

      <button className="mb-4 bg-purple-600 text-white px-4 py-2 rounded">Add Service</button>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <img src="service-image.jpg" alt="Service" className="rounded mb-2" />
          <h3 className="font-semibold">Gold Polishing</h3>
          <p>₹999</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
