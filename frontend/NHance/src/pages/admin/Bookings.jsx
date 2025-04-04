// === Bookings.jsx ===
import React, { useEffect, useState } from 'react';
import AdminLayout from '../layout/AdminLayout';
import { Tabs, Tab, Table, Button, Spinner, Image, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { fetchNewBookings, fetchActiveBookings, fetchCompletedBookings, assignPartner, sendQuotation, fetchPartners, fetchCoupons } from '../../services/BookingApi';

const Bookings = () => {
  const [key, setKey] = useState('new');
  const [newBookings, setNewBookings] = useState([]);
  const [activeBookings, setActiveBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [partners, setPartners] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [assignForm, setAssignForm] = useState({ partner_id: '' });
  const [quoteForm, setQuoteForm] = useState({ quotation_amount: '', coupon_id: '' });

  const loadBookings = async () => {
    setLoading(true);
    try {
      const [newB, activeB, completedB] = await Promise.all([
        fetchNewBookings(),
        fetchActiveBookings(),
        fetchCompletedBookings()
      ]);
      setNewBookings(newB || []);
      setActiveBookings(activeB || []);
      setCompletedBookings(completedB || []);
    } catch (err) {
      toast.error("Failed to load bookings");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const openAssignModal = async (booking) => {
    setSelectedBooking(booking);
    setAssignForm({ partner_id: '' });
    const list = await fetchPartners();
    setPartners(list);
    setShowAssignModal(true);
  };

  const openQuotationModal = async (booking) => {
    setSelectedBooking(booking);
    setQuoteForm({ quotation_amount: '', coupon_id: '' });
    const availableCoupons = await fetchCoupons();
    setCoupons(availableCoupons);
    setShowQuoteModal(true);
  };

  const handleAssignPartner = async () => {
    const res = await assignPartner(selectedBooking.id, assignForm);
    if (res?.error) toast.error(res.error);
    else toast.success("Partner assigned");
    setShowAssignModal(false);
    loadBookings();
  };

  const handleSendQuotation = async () => {
    const res = await sendQuotation(selectedBooking.id, quoteForm);
    if (res?.error) toast.error(res.error);
    else toast.success("Quotation sent");
    setShowQuoteModal(false);
    loadBookings();
  };

  return (
    <AdminLayout title="Booking Management">
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
      <Tab eventKey="new" title={`New Bookings (${newBookings.length})`}>
  {loading ? (
    <div className="text-center py-5">
      <Spinner animation="border" />
    </div>
  ) : (
    <div className="table-responsive">
      <Table bordered hover className="text-center align-middle">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Service</th>
            <th>Details</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {newBookings.length > 0 ? (
            newBookings.map((booking, idx) => (
              <tr key={booking.id}>
                <td>{idx + 1}</td>
                <td>{booking.service_name}</td>
                <td>{booking.details}</td>
                <td>
                  {booking.service_image ? (
                    <img
                      src={booking.service_image}
                      alt="Preview"
                      width="80"
                      height="80"
                      style={{ objectFit: 'cover', borderRadius: 8 }}
                    />
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  <Button variant="primary" size="sm" className="me-2" onClick={() => openAssignModal(booking)}>
                    Assign Partner
                  </Button>
                  <Button variant="success" size="sm" onClick={() => openQuotationModal(booking)}>
                    Send Quotation
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-muted py-5">
                <i className="bi bi-calendar-x fs-1 d-block" />
                No new bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )}
</Tab>

        <Tab eventKey="active" title={`Active Bookings (${activeBookings.length})`}>
          <div className="table-responsive">
            <Table bordered hover className="text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Service</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Started At</th>
                </tr>
              </thead>
              <tbody>
                {activeBookings.length > 0 ? (
                  activeBookings.map((b, idx) => (
                    <tr key={b.id}>
                      <td>{idx + 1}</td>
                      <td>{b.service_name}</td>
                      <td>{b.customer_name}</td>
                      <td>{b.status}</td>
                      <td>{new Date(b.started_at).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-muted py-5">
                      <i className="bi bi-calendar-check fs-1 d-block" />
                      No active bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Tab>

        <Tab eventKey="completed" title={`Completed Bookings (${completedBookings.length})`}>
          <div className="table-responsive">
            <Table bordered hover className="text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Service</th>
                  <th>Customer</th>
                  <th>Completed On</th>
                </tr>
              </thead>
              <tbody>
                {completedBookings.length > 0 ? (
                  completedBookings.map((b, idx) => (
                    <tr key={b.id}>
                      <td>{idx + 1}</td>
                      <td>{b.service_name}</td>
                      <td>{b.customer_name}</td>
                      <td>{new Date(b.completed_at).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-muted py-5">
                      <i className="bi bi-check-circle fs-1 d-block" />
                      No completed bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Tab>
      </Tabs>

      {/* Assign Partner Modal */}
      <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Assign Partner</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Select Partner</Form.Label>
            <Form.Select value={assignForm.partner_id} onChange={(e) => setAssignForm({ partner_id: e.target.value })}>
              <option value="">-- Select Partner --</option>
              {partners.map(partner => (
                <option key={partner.id} value={partner.id}>{partner.full_name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssignModal(false)}>Cancel</Button>
          <Button onClick={handleAssignPartner}>Assign</Button>
        </Modal.Footer>
      </Modal>

      {/* Send Quotation Modal */}
      <Modal show={showQuoteModal} onHide={() => setShowQuoteModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Send Quotation</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Quotation Amount (INR)</Form.Label>
            <Form.Control
              type="number"
              value={quoteForm.quotation_amount}
              onChange={(e) => setQuoteForm({ ...quoteForm, quotation_amount: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Apply Coupon</Form.Label>
            <Form.Select value={quoteForm.coupon_id} onChange={(e) => setQuoteForm({ ...quoteForm, coupon_id: e.target.value })}>
              <option value="">-- Select Coupon (optional) --</option>
              {coupons.map(c => (
                <option key={c.id} value={c.id}>{c.code} - ₹{c.discount_amount}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowQuoteModal(false)}>Cancel</Button>
          <Button onClick={handleSendQuotation}>Send</Button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
};

export default Bookings;
