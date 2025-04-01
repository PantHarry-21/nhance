import React from "react";

const Billing = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-purple-700 mb-4">Billing</h2>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-semibold mb-2">Coupons</h3>
        <button className="bg-purple-600 text-white px-4 py-1 rounded">Create Coupon</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold mb-1">Billing History</h4>
          <p>[List of completed transactions]</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold mb-1">Commissions</h4>
          <p>[Total Cost - Quotation]</p>
        </div>
      </div>
    </div>
  );
};

export default Billing;
