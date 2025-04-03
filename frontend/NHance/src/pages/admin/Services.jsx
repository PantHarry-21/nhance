// === Services.jsx ===
import React, { useEffect, useState } from 'react';
import AdminLayout from '../layout/AdminLayout';
import { Table, Button, Spinner, Modal, Form, Image } from 'react-bootstrap';
import { fetchServices, createService, updateService, deleteService } from '../../services/servicesApi';
import { fetchCategories } from '../../services/categoryApi';
import { toast } from 'react-toastify';

const Services = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', category_id: '', image: '' });
  const [imagePreview, setImagePreview] = useState('');

  const loadServices = async () => {
    setLoading(true);
    const data = await fetchServices();
    setServices(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  useEffect(() => {
    loadServices();
    loadCategories();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.category_id) {
      return toast.error('All fields are required');
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('category_id', form.category_id);
    if (form.image) formData.append('image', form.image);

    console.log('Submitting service form:');
    for (let [key, val] of formData.entries()) {
      console.log(`${key}:`, val);
    }

    const result = editId
      ? await updateService(editId, formData)
      : await createService(formData);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(editId ? 'Service updated' : 'Service created');
      setShowModal(false);
      loadServices();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    const res = await deleteService(id);
    if (res?.error) toast.error(res.error);
    else {
      toast.success('Service deleted');
      loadServices();
    }
  };

  const openModal = (service = null) => {
    if (service) {
      setEditId(service.id);
      setForm({ ...service });
      setImagePreview(service.image ? `/uploads/${service.image}` : '');
    } else {
      setEditId(null);
      setForm({ name: '', price: '', category_id: '', image: '' });
      setImagePreview('');
    }
    setShowModal(true);
  };

  return (
    <AdminLayout title="Services">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold text-primary">All Services</h5>
        <Button onClick={() => openModal()}>Add Service</Button>
      </div>

      <div className="table-responsive">
        <Table bordered hover className="text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price (INR)</th>
              <th>Category</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="py-5 text-muted">
                  <Spinner animation="border" />
                </td>
              </tr>
            ) : services.length > 0 ? (
              services.map((s, idx) => (
                <tr key={s.id}>
                  <td>{idx + 1}</td>
                  <td>{s.name}</td>
                  <td>₹{s.price}</td>
                  <td>{categories.find(c => c.id === s.category_id)?.name || '—'}</td>
                  <td>
                    {s.image ? (
                      <Image src={`https://pqhuxmxxcmsefaljfphn.supabase.co/storage/v1/object/public/service-images/${s.image}`} height="60" rounded />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    <Button size="sm" variant="info" className="me-2" onClick={() => openModal(s)}>Edit</Button>
                    <Button size="sm" variant="danger" onClick={() => handleDelete(s.id)}>Delete</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-5 text-muted">
                  <i className="bi bi-box fs-1 d-block" />
                  No services found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? 'Edit' : 'Add'} Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price (INR)</Form.Label>
            <Form.Control type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
              <option value="">-- Select Category --</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-3" height="100" />}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button onClick={handleSave}>{editId ? 'Update' : 'Save'}</Button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
};

export default Services;
