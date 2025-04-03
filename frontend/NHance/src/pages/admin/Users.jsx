// === Users.jsx ===
import React, { useEffect, useState } from 'react';
import AdminLayout from '../layout/AdminLayout.jsx';
import { Tabs, Tab, Table, Button, Modal, Form, Spinner } from 'react-bootstrap';
import { fetchCustomers, fetchPartners, invitePartner, updatePartner, deletePartner } from '../../services/userApi';
import { toast } from 'react-toastify';

const Users = () => {
  const [key, setKey] = useState('customers');
  const [customers, setCustomers] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({ full_name: '', email: '' });
  const [inviteLoading, setInviteLoading] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ id: '', full_name: '', email: '', status: '' });
  const [editLoading, setEditLoading] = useState(false);

  const loadCustomers = async () => {
    setLoading(true);
    const data = await fetchCustomers();
    console.log("Fetched customers:", data);
    setCustomers(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const loadPartners = async () => {
    const data = await fetchPartners();
    setPartners(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadCustomers();
    loadPartners();
  }, []);

  const handleInvite = async () => {
    if (!inviteForm.full_name || !inviteForm.email) return toast.error('All fields are required');
    setInviteLoading(true);
    try {
      const res = await invitePartner(inviteForm);
      if (res?.error) toast.error(res.error);
      else {
        toast.success('Partner invited');
        setShowInviteModal(false);
        setInviteForm({ full_name: '', email: '' });
        loadPartners();
      }
    } catch (err) {
      console.error('Invite Error:', err);
      toast.error('Failed to send invite');
    } finally {
      setInviteLoading(false);
    }
  };

  const handleEditPartner = (partner) => {
    setEditForm({ ...partner });
    setShowEditModal(true);
  };

  const handleUpdatePartner = async () => {
    if (!editForm.full_name || !editForm.email) return toast.error('All fields are required');
    setEditLoading(true);
    const res = await updatePartner(editForm.id, editForm);
    if (res?.error) toast.error(res.error);
    else {
      toast.success('Partner updated');
      setShowEditModal(false);
      loadPartners();
    }
    setEditLoading(false);
  };

  const handleDeletePartner = async (id) => {
    if (!window.confirm('Are you sure you want to delete this partner?')) return;
    const res = await deletePartner(id);
    if (res?.error) toast.error(res.error);
    else {
      toast.success('Partner deleted');
      loadPartners();
    }
  };

  return (
    <AdminLayout title="Users">
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="customers" title={`Customers (${customers.length})`}>
          <div className="table-responsive">
            <Table bordered hover className="text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Registered On</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="4"><Spinner animation="border" /></td></tr>
                ) : customers.length > 0 ? (
                  customers.map((user, idx) => (
                    <tr key={user.id}>
                      <td>{idx + 1}</td>
                      <td>{user.full_name || '-'}</td>
                      <td>{user.email}</td>
                      <td>{new Date(user.created_at).toLocaleDateString('en-IN')}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4" className="text-muted py-5">No customers found</td></tr>
                )}
              </tbody>
            </Table>
          </div>
        </Tab>

        <Tab eventKey="partners" title={`Partners (${partners.length})`}>
          <div className="d-flex justify-content-end mb-3">
            <Button onClick={() => setShowInviteModal(true)}>Invite Partner</Button>
          </div>
          <div className="table-responsive">
            <Table bordered hover className="text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {partners.length > 0 ? (
                  partners.map((partner, idx) => (
                    <tr key={partner.id}>
                      <td>{idx + 1}</td>
                      <td>{partner.full_name}</td>
                      <td>{partner.email}</td>
                      <td>{partner.status}</td>
                      <td>
                        <Button variant="outline-secondary" size="sm" onClick={() => handleEditPartner(partner)} className="me-2">Edit</Button>
                        <Button variant="danger" size="sm" onClick={() => handleDeletePartner(partner.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5" className="text-muted py-5">No partners found</td></tr>
                )}
              </tbody>
            </Table>
          </div>
        </Tab>
      </Tabs>

      {/* Invite Modal */}
      <Modal show={showInviteModal} onHide={() => setShowInviteModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Invite Partner</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control value={inviteForm.full_name} onChange={(e) => setInviteForm({ ...inviteForm, full_name: e.target.value })} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={inviteForm.email} onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowInviteModal(false)} disabled={inviteLoading}>Cancel</Button>
          <Button onClick={handleInvite} disabled={inviteLoading}>
            {inviteLoading ? <Spinner animation="border" size="sm" /> : 'Send Invite'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Edit Partner</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control value={editForm.full_name} onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}>
              <option value="Invited">Invited</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)} disabled={editLoading}>Cancel</Button>
          <Button onClick={handleUpdatePartner} disabled={editLoading}>
            {editLoading ? <Spinner animation="border" size="sm" /> : 'Update'}
          </Button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
};

export default Users;
