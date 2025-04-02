import React from "react";

const Users = () => {
  return (
    <div className="container py-4">
      <h2 className="text-primary fw-bold mb-4">Users & Partners</h2>

      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card p-3 shadow-sm">
            <h5>Customers</h5>
            <p>[List of customers]</p>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card p-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0">Partners</h5>
              <button className="btn btn-sm btn-primary">Invite Partner</button>
            </div>
            <p>[List of partners]</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
