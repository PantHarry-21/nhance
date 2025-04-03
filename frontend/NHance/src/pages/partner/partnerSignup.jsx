// === PartnerSignup.jsx ===
import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Card, Spinner, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const PartnerSignup = () => {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    services_offered: '',
    experience: '',
    identity_doc: null,
    profile_pic: null
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const email = queryParams.get('email');
    const name = queryParams.get('name');
    if (email) setForm((prev) => ({ ...prev, email }));
    if (name) setForm((prev) => ({ ...prev, full_name: name }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm({ ...form, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { full_name, email, services_offered, experience, identity_doc, profile_pic } = form;
    if (!full_name || !email || !services_offered || !experience || !identity_doc || !profile_pic) {
      return toast.error('Please fill in all fields.');
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('full_name', full_name);
      formData.append('email', email);
      formData.append('services_offered', services_offered);
      formData.append('experience', experience);
      formData.append('identity_doc', identity_doc);
      formData.append('profile_pic', profile_pic);

      const res = await fetch('http://localhost:5000/api/partners/signup', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Signup completed! Redirecting...');
        setTimeout(() => window.location.href = '/partner/dashboard', 1500);
      } else {
        toast.error(data.error || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center py-5">
      <Card className="shadow p-4 w-100 rounded-4" style={{ maxWidth: '600px' }}>
        <h3 className="text-center fw-bold text-primary mb-4">Complete Partner Signup</h3>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Services Offered</Form.Label>
            <Form.Control
              type="text"
              name="services_offered"
              value={form.services_offered}
              onChange={handleChange}
              placeholder="e.g. Gold, Silver, Diamond"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Years of Experience</Form.Label>
            <Form.Control
              type="number"
              name="experience"
              value={form.experience}
              onChange={handleChange}
              placeholder="Enter years"
              required
            />
          </Form.Group>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Label>Upload Identity Document</Form.Label>
              <Form.Control
                type="file"
                name="identity_doc"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                required
              />
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label>Upload Profile Picture</Form.Label>
              <Form.Control
                type="file"
                name="profile_pic"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
            </Col>
          </Row>

          <Button type="submit" className="w-100 rounded-3 mt-2" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Complete Signup'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default PartnerSignup;