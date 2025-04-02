import React, { useState } from "react";

const Users = () => {
  const [activeTab, setActiveTab] = useState("customers");

  return (
    <div className="p-4">
      <h2 className="fw-bold">Users</h2>
      <div className="d-flex gap-3 my-3">
        <button
          className={`btn ${activeTab === "customers" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("customers")}
        >
          Customers
        </button>
        <button
          className={`btn ${activeTab === "partners" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("partners")}
        >
          Partners
        </button>
      </div>

      {activeTab === "customers" ? (
        <p>List of Customers here.</p>
      ) : (
        <div>
          <button className="btn btn-success mb-3">Invite Partner</button>
          <p>List of Partners will show here.</p>
        </div>
      )}
    </div>
  );
};

export default Users;
