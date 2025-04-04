// === Billing.jsx ===
import React, { useState, useEffect } from 'react';
import AdminLayout from '../layout/AdminLayout.jsx';
import { Tabs, Tab, Table, Button, Form, Modal, Spinner } from 'react-bootstrap';
import { fetchBillingHistory, fetchCoupons, createCoupon, deleteCoupon } from '../../services/BillingApi.js';
import { toast } from 'react-toastify';

const Billing = () => {
  const [billing, setBilling] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [key, setKey] = useState('history');
  const [showModal, setShowModal] = useState(false);
  const [couponForm, setCouponForm] = useState({ code: '', discount: '' });
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const loadBilling = async () => {
    try {
      const data = await fetchBillingHistory();
      setBilling(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load billing history:', err);
      toast.error('Failed to load billing history');
    }
  };

  const loadCoupons = async () => {
    try {
      const data = await fetchCoupons();
      setCoupons(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load coupons:', err);
      toast.error('Failed to load coupons');
    }
  };

  const handleSaveCoupon = async () => {
    if (!couponForm.code || !couponForm.discount) return toast.error('Fill all fields');
    setLoading(true);
    const response = await createCoupon(couponForm);
    if (response.error) toast.error(response.error);
    else toast.success('Coupon Created');
    setShowModal(false);
    setLoading(false);
    loadCoupons();
  };

  const handleDeleteCoupon = async (id) => {
    setDeleteLoading(id);
    const response = await deleteCoupon(id);
    if (response.error) toast.error(response.error);
    else {
      toast.success('Coupon Deleted');
      loadCoupons();
    }
    setDeleteLoading(null);
  };

  useEffect(() => {
    loadBilling();
    loadCoupons();
  }, []);

  return (
    <AdminLayout title="Billing">
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="history" title="Billing History">
          <div className="table-responsive">
            <Table bordered hover className="text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Quotation (₹)</th>
                  <th>Amount Paid (₹)</th>
                  <th>Commission (₹)</th>
                </tr>
              </thead>
              <tbody>
                {billing.length > 0 ? (
                  billing.map((bill, index) => (
                    <tr key={bill.id}>
                      <td>{index + 1}</td>
                      <td>{bill.customer_name || '-'}</td>
                      <td>{bill.service_name || '-'}</td>
                      <td>{new Date(bill.completed_at).toLocaleDateString('en-IN')}</td>
                      <td>{bill.quotation_amount}</td>
                      <td>{bill.total_amount}</td>
                      <td>{bill.total_amount - bill.quotation_amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-muted py-5">
                      <i className="bi bi-receipt fs-1 d-block" />
                      No billing records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Tab>

        <Tab eventKey="coupons" title="Coupons">
          <div className="d-flex justify-content-end mb-3">
            <Button onClick={() => setShowModal(true)}>Add Coupon</Button>
          </div>

          <div className="table-responsive">
            <Table bordered hover className="text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Coupon Code</th>
                  <th>Discount (₹)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.length > 0 ? (
                  coupons.map((coupon, index) => (
                    <tr key={coupon.id}>
                      <td>{index + 1}</td>
                      <td>{coupon.code}</td>
                      <td>{coupon.discount}</td>
                      <td>
                        <Button variant="danger" size="sm" onClick={() => handleDeleteCoupon(coupon.id)} disabled={deleteLoading === coupon.id}>
                          {deleteLoading === coupon.id ? <Spinner animation="border" size="sm" /> : 'Delete'}
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-muted py-5">
                      <i className="bi bi-ticket-perforated fs-1 d-block" />
                      No coupons found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Tab>
      </Tabs>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Coupon Code</Form.Label>
            <Form.Control
              value={couponForm.code}
              onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Discount Amount (₹)</Form.Label>
            <Form.Control
              type="number"
              value={couponForm.discount}
              onChange={(e) => setCouponForm({ ...couponForm, discount: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} disabled={loading}>Cancel</Button>
          <Button onClick={handleSaveCoupon} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
};

export default Billing;