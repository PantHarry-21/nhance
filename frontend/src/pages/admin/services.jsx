import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const Services = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showQuotationModal, setShowQuotationModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const [services, setServices] = useState([]);
  const [serviceData, setServiceData] = useState({
    name: "", image: "", price: "", category: ""
  });

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [quotationPrice, setQuotationPrice] = useState("");
  const [selectedPartner, setSelectedPartner] = useState("");

  const mockPendingRequests = [
    {
      id: 1,
      user: { name: "Riya Sharma", email: "riya@example.com" },
      service: "Gold Ring Polishing",
      category: "Rings",
      requestedImage: "https://via.placeholder.com/150",
      approxPrice: "1200"
    },
    {
      id: 2,
      user: { name: "Arjun Mehta", email: "arjun@example.com" },
      service: "Necklace Shine",
      category: "Necklaces",
      requestedImage: "https://via.placeholder.com/150",
      approxPrice: "950"
    }
  ];

  const mockPartners = {
    Rings: ["Mehul Jewels", "Classic Cleaners"],
    Necklaces: ["Urban Shine", "Elite Polishers"]
  };

  const categories = ["Rings", "Necklaces", "Earrings"];
  const tabs = ["all", "pending", "active", "completed"];

  const handleInput = (e) => {
    setServiceData({ ...serviceData, [e.target.name]: e.target.value });
  };

  const handleAddService = () => {
    setServices([...services, serviceData]);
    setServiceData({ name: "", image: "", price: "", category: "" });
    setShowServiceModal(false);
  };

  return (
    <div className="p-4">
      <h2 className="fw-bold mb-4">Manage Services</h2>

      {/* Tabs */}
      <div className="d-flex gap-3 mb-4">
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "primary" : "outline-primary"}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      {/* ALL TAB */}
      {activeTab === "all" && (
        <>
          <Button variant="success" className="mb-4" onClick={() => setShowServiceModal(true)}>
            Add New Service
          </Button>
          <div className="row g-3">
            {services.map((service, i) => (
              <div key={i} className="col-md-4">
                <div className="card p-3 shadow-sm">
                  <img src={service.image} alt={service.name} className="img-fluid mb-2" style={{ height: "150px", objectFit: "cover" }} />
                  <h5>{service.name}</h5>
                  <p>Price: ₹{service.price}</p>
                  <p>Category: {service.category}</p>
                  <Button variant="danger" size="sm" onClick={() => setServices(services.filter((_, idx) => idx !== i))}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* PENDING TAB */}
      {activeTab === "pending" && (
        <div className="row g-4">
          {mockPendingRequests.map((req) => (
            <div key={req.id} className="col-md-6">
              <div className="card shadow-sm p-3">
                <div className="d-flex align-items-center mb-3">
                  <img src={req.requestedImage} alt="jewel" width="100" height="100" className="rounded" />
                  <div className="ms-3">
                    <h5>{req.service}</h5>
                    <p className="mb-1"><strong>User:</strong> {req.user.name}</p>
                    <p className="mb-1"><strong>Category:</strong> {req.category}</p>
                    <p className="mb-1"><strong>Approx:</strong> ₹{req.approxPrice}</p>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <Button variant="info" onClick={() => {
                    setSelectedRequest(req);
                    setQuotationPrice(req.approxPrice);
                    setShowQuotationModal(true);
                  }}>
                    Send Quotation
                  </Button>
                  <Button variant="primary" onClick={() => {
                    setSelectedRequest(req);
                    setSelectedPartner("");
                    setShowAssignModal(true);
                  }}>
                    Assign Partner
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ACTIVE + COMPLETED Placeholder */}
      {activeTab === "active" && <p>List of ongoing services...</p>}
      {activeTab === "completed" && <p>List of completed services...</p>}

      {/* ➕ Add Service Modal */}
      <Modal show={showServiceModal} onHide={() => setShowServiceModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Add Service</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2"><Form.Label>Name</Form.Label>
              <Form.Control name="name" value={serviceData.name} onChange={handleInput} />
            </Form.Group>
            <Form.Group className="mb-2"><Form.Label>Image URL</Form.Label>
              <Form.Control name="image" value={serviceData.image} onChange={handleInput} />
            </Form.Group>
            <Form.Group className="mb-2"><Form.Label>Price</Form.Label>
              <Form.Control name="price" type="number" value={serviceData.price} onChange={handleInput} />
            </Form.Group>
            <Form.Group><Form.Label>Category</Form.Label>
              <Form.Select name="category" value={serviceData.category} onChange={handleInput}>
                <option value="">Select Category</option>
                {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowServiceModal(false)}>Cancel</Button>
          <Button variant="success" onClick={handleAddService}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* 💌 Send Quotation Modal */}
      <Modal show={showQuotationModal} onHide={() => setShowQuotationModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Send Quotation</Modal.Title></Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <>
              <p><strong>User:</strong> {selectedRequest.user.name}</p>
              <p><strong>Email:</strong> {selectedRequest.user.email}</p>
              <p><strong>Service:</strong> {selectedRequest.service}</p>
              <Form.Group className="mb-3">
                <Form.Label>Edit Quotation Price</Form.Label>
                <Form.Control
                  type="number"
                  value={quotationPrice}
                  onChange={(e) => setQuotationPrice(e.target.value)}
                />
              </Form.Group>
              <p className="text-muted">Quotation will be sent via email with service details.</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowQuotationModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => {
            alert("Quotation sent to user (mock)");
            setShowQuotationModal(false);
          }}>
            Send Quotation
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 👨‍🔧 Assign Partner Modal */}
      <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Assign Partner</Modal.Title></Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <>
              <p><strong>Requested Service:</strong> {selectedRequest.service}</p>
              <Form.Group className="mb-3">
                <Form.Label>Select Partner</Form.Label>
                <Form.Select
                  value={selectedPartner}
                  onChange={(e) => setSelectedPartner(e.target.value)}
                >
                  <option value="">Select a partner</option>
                  {mockPartners[selectedRequest.category]?.map((p, i) => (
                    <option key={i} value={p}>{p}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssignModal(false)}>Cancel</Button>
          <Button variant="success" onClick={() => {
            alert(`Partner "${selectedPartner}" assigned (mock)`);
            setShowAssignModal(false);
          }}>
            Assign Partner
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Services;
