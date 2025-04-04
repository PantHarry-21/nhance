// === Dashboard.jsx ===
import React, { useEffect, useState } from 'react';
import AdminLayout from '../layout/AdminLayout';
import { Card, Row, Col, Spinner } from 'react-bootstrap';
import { fetchServices } from '../../services/servicesApi';
import { fetchCustomers, fetchPartners } from '../../services/userApi';
import { fetchCategories } from '../../services/categoryApi';
import { fetchCompletedBookings } from '../../services/BookingApi';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    services: 0,
    categories: 0,
    customers: 0,
    partners: 0,
    completed: 0,
  });

  const loadStats = async () => {
    setLoading(true);
    const [services, categories, customers, partners, completed] = await Promise.all([
      fetchServices(),
      fetchCategories(),
      fetchCustomers(),
      fetchPartners(),
      fetchCompletedBookings(),
    ]);

    setStats({
      services: services?.length || 0,
      categories: categories?.length || 0,
      customers: customers?.length || 0,
      partners: partners?.length || 0,
      completed: completed?.length || 0,
    });
    setLoading(false);
  };

  useEffect(() => {
    loadStats();
  }, []);

  const StatCard = ({ label, value, icon }) => (
    <Card className="text-center shadow-sm">
      <Card.Body>
        <div className="fs-1 mb-2 text-primary">{icon}</div>
        <Card.Title className="fw-bold fs-5 text-secondary">{label}</Card.Title>
        <Card.Text className="fs-4 text-dark">{value}</Card.Text>
      </Card.Body>
    </Card>
  );

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row className="g-4">
          <Col md={4}><StatCard label="Total Services" value={stats.services} icon="🛠️" /></Col>
          <Col md={4}><StatCard label="Total Categories" value={stats.categories} icon="📦" /></Col>
          <Col md={4}><StatCard label="Customers" value={stats.customers} icon="👥" /></Col>
          <Col md={4}><StatCard label="Partners" value={stats.partners} icon="🤝" /></Col>
          <Col md={4}><StatCard label="Completed Bookings" value={stats.completed} icon="✅" /></Col>
        </Row>
      )}
    </AdminLayout>
  );
};

export default Dashboard;