import React from "react";

const NewRequests = () => {
  return (
    <div className="container py-4">
      <h2 className="text-primary fw-bold mb-4">New Service Requests</h2>

      <div className="card p-3 mb-4 shadow-sm">
        <h5 className="mb-3">Request #1</h5>
        <div className="d-flex gap-2">
          <button className="btn btn-primary">Send Quotation</button>
          <button className="btn btn-success">Assign Partner</button>
        </div>
      </div>

      <p className="text-muted">[Repeat for other requests]</p>
    </div>
  );
};

export default NewRequests;
