import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

// User Pages
import Home from './pages/user/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import MyProfile from './pages/user/MyProfile';
import MyBookings from './pages/user/MyBookings';
import Categories from './pages/user/Categories';
import BookingFlow from './pages/user/BookingFlow';
import ServiceDetails from './pages/user/ServiceDetails';
import ConfirmBooking from './pages/user/ConfirmBooking';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBookings from './pages/admin/Bookings';
import Services from './pages/admin/Services';
import CategoriesAdmin from './pages/admin/Categories';
import Billing from './pages/admin/Billing';
import AdminProfile from './pages/admin/Profile';
import Users from './pages/admin/Users';

// Partner Pages
import PartnerDashboard from './pages/partner/PartnerDashboard';
import PartnerJobs from './pages/partner/PartnerJobs';
import PartnerProfile from './pages/partner/PartnerProfile';
import PartnerSignup from './pages/partner/partnerSignup';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user/profile" element={<MyProfile />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/category/:categoryName" element={<Categories />} />
        <Route path="/upload-jewellery" element={<BookingFlow />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/confirm-booking" element={<ConfirmBooking />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/services" element={<Services />} />
        <Route path="/admin/categories" element={<CategoriesAdmin />} />
        <Route path="/admin/billing" element={<Billing />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/users" element={<Users />} />

        {/* PARTNER ROUTES */}
        <Route path="/partner/dashboard" element={<PartnerDashboard />} />
        <Route path="/partner/jobs" element={<PartnerJobs />} />
        <Route path="/partner/profile" element={<PartnerProfile />} />
        <Route path="/partner/signup" element={<PartnerSignup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
