import React, { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";

const Billing = () => {
  const [activeTab, setActiveTab] = useState("coupons");
  const [coupons, setCoupons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCoupon, setNewCoupon] = useState({ name: "", code: "", discount: "" });

  const billingHistory = [
    { user: "Riya Sharma", service: "Gold Ring", amount: 1200, date: "Apr 1, 2024" },
    { user: "Sneha Jain", service: "Necklace Shine", amount: 950, date: "Apr 2, 2024" },
  ];

  const commissionData = [
    { service: "Gold Ring", total: 1200, quoted: 1000 },
    { service: "Necklace Shine", total: 950, quoted: 850 },
  ];

  const addCoupon = () => {
    if (!newCoupon.name || !newCoupon.code || !newCoupon.discount) return alert("All fields required!");
    setCoupons([...coupons, newCoupon]);
    setNewCoupon({ name: "", code: "", discount: "" });
    setShowModal(false);
  };

  const deleteCoupon = (index) => {
    setCoupons(coupons.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4">
      <h2 className="fw-bold mb-4">Billing Management</h2>

      <div className="d-flex gap-3 mb-4">
        {["coupons", "history", "commission"].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "primary" : "outline-primary"}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      {/* COUPONS */}
      {activeTab === "coupons" && (
        <div>
          <Button variant="success" className="mb-3" onClick={() => setShowModal(true)}>
            Create Coupon
          </Button>

          <Table bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Discount (%)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c, i) => (
                <tr key={i}>
                  <td>{c.name}</td>
                  <td>{c.code}</td>
                  <td>{c.discount}%</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => deleteCoupon(i)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Coupon Modal */}
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton><Modal.Title>Create Coupon</Modal.Title></Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={newCoupon.name}
                    onChange={(e) => setNewCoupon({ ...newCoupon, name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Code</Form.Label>
                  <Form.Control
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Discount (%)</Form.Label>
                  <Form.Control
                    type="number"
                    value={newCoupon.discount}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={addCoupon}>Save</Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}

      {/* BILLING HISTORY */}
      {activeTab === "history" && (
        <Table bordered hover>
          <thead>
            <tr>
              <th>User</th>
              <th>Service</th>
              <th>Amount Paid</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {billingHistory.map((entry, i) => (
              <tr key={i}>
                <td>{entry.user}</td>
                <td>{entry.service}</td>
                <td>₹{entry.amount}</td>
                <td>{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* COMMISSION TRACKING */}
      {activeTab === "commission" && (
        <Table bordered hover>
          <thead>
            <tr>
              <th>Service</th>
              <th>Total Cost</th>
              <th>Quoted Price</th>
              <th>Commission</th>
            </tr>
          </thead>
          <tbody>
            {commissionData.map((row, i) => (
              <tr key={i}>
                <td>{row.service}</td>
                <td>₹{row.total}</td>
                <td>₹{row.quoted}</td>
                <td className="text-success fw-bold">₹{row.total - row.quoted}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Billing;
