import React from "react";

const Billing = () => {
  return (
    <div className="container py-4">
      <h2 className="text-primary fw-bold mb-4">Billing</h2>

      <div className="card p-3 mb-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Coupons</h5>
          <button className="btn btn-primary">Create Coupon</button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card p-3 shadow-sm">
            <h6 className="fw-semibold mb-2">Billing History</h6>
            <p>[List of completed transactions]</p>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card p-3 shadow-sm">
            <h6 className="fw-semibold mb-2">Commissions</h6>
            <p>[Total Cost - Quotation]</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
