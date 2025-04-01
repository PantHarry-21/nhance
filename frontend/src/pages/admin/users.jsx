import React from "react";

const Users = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-purple-700 mb-4">Users & Partners</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Customers</h3>
          <p>[List of customers]</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold flex justify-between">
            Partners
            <button className="bg-purple-600 text-white px-2 py-1 rounded text-sm">Invite Partner</button>
          </h3>
          <p>[List of partners]</p>
        </div>
      </div>
    </div>
  );
};

export default Users;
