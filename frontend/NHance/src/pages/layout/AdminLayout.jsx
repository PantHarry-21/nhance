// === AdminLayout.jsx ===
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiHome, BiUser, BiCategory, BiBox, BiRupee, BiCalendarCheck, BiUserCircle } from 'react-icons/bi';
import Dropdown from 'react-bootstrap/Dropdown';

const AdminLayout = ({ title, children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/admin/dashboard', icon: <BiHome />, label: 'Dashboard' },
    { path: '/admin/users', icon: <BiUser />, label: 'Users' },
    { path: '/admin/categories', icon: <BiCategory />, label: 'Categories' },
    { path: '/admin/services', icon: <BiBox />, label: 'Services' },
    { path: '/admin/bookings', icon: <BiCalendarCheck />, label: 'Bookings' },
    { path: '/admin/billing', icon: <BiRupee />, label: 'Billing' },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside
        className="bg-purple text-white p-3"
        style={{ width: '240px', backgroundColor: '#4B0082', height: '100vh', position: 'sticky', top: 0 }}
      >
        <h4 className="text-white mb-4">NHance Admin</h4>
        <ul className="nav flex-column">
          {navItems.map(({ path, icon, label }) => (
            <li className="nav-item mb-2" key={path}>
              <Link
                to={path}
                className={`nav-link d-flex align-items-center gap-2 ${isActive(path) ? 'text-warning' : 'text-white'}`}
              >
                {icon} {label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 bg-light overflow-auto" style={{ height: '100vh' }}>
        <div className="d-flex justify-content-end align-items-center px-4 py-3 bg-white border-bottom">
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" className="text-dark text-decoration-none p-0">
              <BiUserCircle size={24} className="me-2" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate('/admin/profile')}>My Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="px-4 py-3 border-bottom">
          <h4 className="fw-bold text-primary">{title}</h4>
        </div>
        <div className="p-4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
