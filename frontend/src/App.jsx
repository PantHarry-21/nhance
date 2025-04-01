import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';


import Home from "./pages/user/Home";
import BookingFlow from "./pages/user/BookingFlow";
import ConfirmBooking from "./pages/user/ConfirmBooking";
import MyBookings from "./pages/user/MyBookings";
import Categories from "./pages/user/Categories";
import ServiceDetails from "./pages/user/ServiceDetails";

import PartnerSignup from "./pages/partner/partnerSignup";
import PartnerDashboard from "./pages/partner/PartnerDashboard";
import PartnerJobs from "./pages/partner/PartnerJobs";
import PartnerProfile from "./pages/partner/PartnerProfile";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Billing from "./pages/admin/Billing";
import CompletedRequests from "./pages/admin/CompletedRequests";
import NewRequests from "./pages/admin/newRequests";
import Profile from "./pages/admin/Profile";
import Services from "./pages/admin/Services";
import Users from "./pages/admin/Users";

import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  console.log("App is rendering");  // Debugging
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/upload-jewellery" element={<BookingFlow />} />
        <Route path="/confirm-booking" element={<ConfirmBooking />} />
        <Route path="/enter-address" element={<Categories />} />
        <Route path="/service/:id" element={<ServiceDetails />} />

        {/* User Dashboard */}
        <Route
          path="/user/my-bookings"
          element={
            <PrivateRoute allowedRoles={["user"]}>
              <MyBookings />
            </PrivateRoute>
          }
        />

        {/* Partner */}
        <Route path="/partner/signup" element={<PartnerSignup />} />
        <Route
          path="/partner/dashboard"
          element={
            <PrivateRoute allowedRoles={["partner"]}>
              <PartnerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/partner/jobs"
          element={
            <PrivateRoute allowedRoles={["partner"]}>
              <PartnerJobs />
            </PrivateRoute>
          }
        />
        <Route
          path="/partner/profile"
          element={
            <PrivateRoute allowedRoles={["partner"]}>
              <PartnerProfile />
            </PrivateRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Services />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/new-requests"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <NewRequests />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/completed-requests"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <CompletedRequests />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/billing"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Billing />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
