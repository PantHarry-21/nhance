import React from "react";

const AdminDashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Dashboard</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">📦 Total Bookings</div>
        <div className="bg-white p-4 rounded shadow">👥 Total Users</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Recent Requests</h3>
          <button className="text-sm text-purple-600">View More</button>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Completed Requests</h3>
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Revenue Chart</h3>
        <p>[Chart Placeholder]</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
