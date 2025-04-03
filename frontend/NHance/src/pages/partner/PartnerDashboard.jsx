import React from "react";

const PartnerDashboard = () => {
  return (
    <div className="container py-4">
      <h2 className="text-primary fw-bold mb-4">Welcome, Partner!</h2>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card p-3 shadow-sm">📬 New Jobs</div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card p-3 shadow-sm">💰 Total Earnings</div>
        </div>
      </div>

      <div className="card p-4 shadow-sm">
        <h5 className="card-title mb-3">Live Status Tracker</h5>
        <p>[Progress bars or job cards go here]</p>
      </div>
    </div>
  );
};

export default PartnerDashboard;
