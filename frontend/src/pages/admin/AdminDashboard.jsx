import React from "react";

const AdminDashboard = () => {
  return (
    <div className="container py-4">
      <h2 className="mb-4 text-primary fw-bold">Dashboard</h2>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card p-3 shadow-sm">📦 Total Bookings</div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card p-3 shadow-sm">👥 Total Users</div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card p-3 shadow-sm">
            <h5 className="card-title">Recent Requests</h5>
            <button className="btn btn-link p-0">View More</button>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card p-3 shadow-sm">
            <h5 className="card-title">Completed Requests</h5>
          </div>
        </div>
      </div>

      <div className="card p-4 shadow-sm">
        <h5 className="card-title mb-3">Revenue Chart</h5>
        <p>[Chart Placeholder]</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
