import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: "Total Users", value: 412, icon: "👤", bg: "#e0f7fa" },
    { title: "Total Partners", value: 88, icon: "🛠️", bg: "#e8f5e9" },
    { title: "Services Offered", value: 35, icon: "💍", bg: "#fce4ec" },
    { title: "Revenue (INR)", value: "₹ 2.1L", icon: "💰", bg: "#fff3e0" },
  ];

  const recentRequests = [
    { user: "Riya Sharma", service: "Gold Ring Polishing", status: "Pending", date: "Apr 1, 2024" },
    { user: "Arjun Mehta", service: "Necklace Shine", status: "Pending", date: "Mar 31, 2024" },
    { user: "Sneha Jain", service: "Diamond Earring Clean", status: "Pending", date: "Mar 30, 2024" },
  ];

  return (
    <div className="p-4">
      <h2 className="fw-bold mb-4">Admin Dashboard</h2>

      {/* Stat Cards */}
      <div className="row g-4 mb-5">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-3 col-sm-6">
            <div className="card p-3 shadow-sm border-0" style={{ backgroundColor: stat.bg }}>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="text-muted mb-1">{stat.title}</h6>
                  <h4 className="fw-bold">{stat.value}</h4>
                </div>
                <div style={{ fontSize: "2rem" }}>{stat.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Requests */}
      <div className="card p-4 shadow-sm border-0 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Recent Requests</h5>
          <button className="btn btn-sm btn-outline-primary" onClick={() => navigate("/admin/services")}>
            View All Pending
          </button>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>User</th>
              <th>Service</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentRequests.map((req, idx) => (
              <tr key={idx}>
                <td>{req.user}</td>
                <td>{req.service}</td>
                <td>
                  <span className="badge bg-warning text-dark">{req.status}</span>
                </td>
                <td>{req.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts Placeholder */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card p-3 shadow-sm border-0">
            <h6 className="fw-bold mb-3">Services by Category</h6>
            <div className="text-center text-muted">[Doughnut Chart Here]</div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3 shadow-sm border-0">
            <h6 className="fw-bold mb-3">Monthly Revenue (INR)</h6>
            <div className="text-center text-muted">[Bar Chart Here]</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
