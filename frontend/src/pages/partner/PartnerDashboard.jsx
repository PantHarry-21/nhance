import React from "react";

const PartnerDashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-purple-700">Welcome, Partner!</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">📬 New Jobs</div>
        <div className="bg-white p-4 rounded shadow">💰 Total Earnings</div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Live Status Tracker</h3>
        <p>[Progress bars or job cards go here]</p>
      </div>
    </div>
  );
};

export default PartnerDashboard;
