import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  const icons = ["💍", "🧼", "💎", "👑", "🪙", "📿"];

  const openModal = () => {
    setShowModal(true);
    setCategoryName("");
    setSelectedIcon("");
    setError("");
  };

  const handleSave = () => {
    if (!categoryName || !selectedIcon) {
      setError("Please fill in all fields.");
      return;
    }
    const duplicate = categories.find(
      (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
    );
    if (duplicate) {
      setError("Category already exists.");
      return;
    }
    setCategories([...categories, { name: categoryName, icon: selectedIcon }]);
    setShowModal(false);
  };

  const handleDelete = (index) => {
    const filtered = categories.filter((_, i) => i !== index);
    setCategories(filtered);
  };

  return (
    <div className="p-4">
      <h2 className="fw-bold mb-4">Manage Categories</h2>

      <Button variant="primary" onClick={openModal} className="mb-4">
        Add New Category
      </Button>

      {/* Category Cards */}
      <div className="row g-3">
        {categories.map((cat, i) => (
          <div key={i} className="col-md-3">
            <div className="card p-3 text-center shadow-sm">
              <div style={{ fontSize: "2rem" }}>{cat.icon}</div>
              <h5 className="mt-2">{cat.name}</h5>
              <Button variant="danger" size="sm" onClick={() => handleDelete(i)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="categoryName" className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Select Icon</Form.Label>
              <div className="d-flex gap-3 flex-wrap mt-2">
                {icons.map((icon, idx) => (
                  <div
                    key={idx}
                    className={`p-2 border rounded ${selectedIcon === icon ? "bg-warning" : ""}`}
                    style={{ cursor: "pointer", fontSize: "1.5rem" }}
                    onClick={() => setSelectedIcon(icon)}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </Form.Group>

            {error && <p className="text-danger mt-3">{error}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="success" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Categories;
