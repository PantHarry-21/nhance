import React from "react";

const NewRequests = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-purple-700 mb-4">New Service Requests</h2>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-semibold mb-2">Request #1</h3>
        <div className="space-x-2">
          <button className="bg-purple-600 text-white px-3 py-1 rounded">Send Quotation</button>
          <button className="bg-green-600 text-white px-3 py-1 rounded">Assign Partner</button>
        </div>
      </div>

      <p>[Repeat for other requests]</p>
    </div>
  );
};

export default NewRequests;
