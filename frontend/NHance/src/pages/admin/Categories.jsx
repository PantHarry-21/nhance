// === Categories.jsx ===
import React, { useState, useEffect } from 'react';
import AdminLayout from '../layout/AdminLayout.jsx';
import { Button, Modal, Form, Spinner } from 'react-bootstrap';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../../services/categoryApi';
import { toast } from 'react-toastify';
import ConfirmDialog from '../../components/confirmDialog.jsx';

const ICON_OPTIONS = [
  'bi-gem', 'bi-gift', 'bi-star-fill', 'bi-heart-fill',
  'bi-box-seam', 'bi-shield-lock', 'bi-cart-plus', 'bi-cash-coin',
  'bi-sparkles', 'bi-award-fill'
];

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', icon: '', is_featured: false });
  const [editId, setEditId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getCategoryColor = (icon) => {
    const colorMap = {
      'bi-gem': '#FFC107', 'bi-gift': '#28A745', 'bi-star-fill': '#FFD700', 'bi-heart-fill': '#DC3545',
      'bi-box-seam': '#6C757D', 'bi-shield-lock': '#17A2B8', 'bi-cart-plus': '#007BFF', 'bi-cash-coin': '#20C997',
      'bi-sparkles': '#6610F2', 'bi-award-fill': '#FD7E14'
    };
    return colorMap[icon] || '#888';
  };

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSave = async () => {
    if (!form.name || !form.icon) return toast.error('Fill all fields');

    setLoading(true);
    const isDuplicate = categories.find(c => c.name.toLowerCase() === form.name.toLowerCase() && c.id !== editId);
    if (isDuplicate) {
      toast.error('Category already exists');
      setLoading(false);
      return;
    }

    if (editId) {
      await updateCategory(editId, form);
      toast.success('Updated');
    } else {
      await createCategory(form);
      toast.success('Created');
    }

    setShowModal(false);
    setLoading(false);
    loadCategories();
  };

  const confirmDelete = (id) => {
    setDeleteTargetId(id);
    setShowConfirm(true);
  };

  const handleDeleteConfirmed = async () => {
    setDeleteLoading(true);
    try {
      const response = await deleteCategory(deleteTargetId);
      if (response && response.error) toast.error(response.error);
      else {
        toast.success('Deleted');
        loadCategories();
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Something went wrong while deleting.");
    } finally {
      setShowConfirm(false);
      setDeleteTargetId(null);
      setDeleteLoading(false);
    }
  };

  const openModal = (cat = null) => {
    if (cat) {
      setForm(cat);
      setEditId(cat.id);
    } else {
      setForm({ name: '', icon: '', is_featured: false });
      setEditId(null);
    }
    setShowModal(true);
  };

  return (
    <AdminLayout title="Categories">
      <div className="d-flex justify-content-end mb-3">
        <Button onClick={() => openModal()}>Add Category</Button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>Icon</th>
              <th>Name</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map(cat => (
                <tr key={cat.id}>
                  <td><i className={`bi ${cat.icon} fs-5`} style={{ color: getCategoryColor(cat.icon) }}></i></td>
                  <td>{cat.name}</td>
                  <td>{cat.is_featured ? 'Yes' : 'No'}</td>
                  <td>
                    <Button variant="info" size="sm" onClick={() => openModal(cat)} className="me-2">Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => confirmDelete(cat.id)}>Delete</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-muted py-5">
                  <i className="bi bi-folder-x fs-1 d-block" />
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>{editId ? 'Edit' : 'Add'} Category</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select Icon</Form.Label>
            <div className="d-flex flex-wrap gap-3">
              {ICON_OPTIONS.map(icon => (
                <div key={icon} onClick={() => setForm({ ...form, icon })} style={{ cursor: 'pointer' }}>
                  <i className={`bi ${icon} fs-5 ${form.icon === icon ? 'text-primary' : ''}`} style={{ color: getCategoryColor(icon) }}></i>
                </div>
              ))}
            </div>
          </Form.Group>

          <Form.Check
            type="checkbox"
            label="Featured Category"
            checked={form.is_featured}
            onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} disabled={loading}>Cancel</Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : (editId ? 'Update' : 'Save')}
          </Button>
        </Modal.Footer>
      </Modal>

      <ConfirmDialog
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDeleteConfirmed}
        loading={deleteLoading}
        title="Confirm Delete"
        message="Are you sure you want to delete this category?"
        dangerText="Delete"
      />
    </AdminLayout>
  );
};

export default Categories;