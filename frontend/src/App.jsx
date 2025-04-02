import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from 'react-router-dom';

// User pages
import Home from "./pages/user/Home";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import MyProfile from "./pages/user/MyProfile";
import MyBookings from "./pages/user/MyBookings";
import Categories from "./pages/user/Categories";
import BookingFlow from "./pages/user/BookingFlow";
import ServiceDetails from "./pages/user/ServiceDetails";
import ConfirmBooking from "./pages/user/ConfirmBooking";

// Admin Pages

import AdminDashboard from "./pages/admin/AdminDashboard";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload-jewellery" element={<BookingFlow />} />
      <Route path="/confirm-booking" element={<ConfirmBooking />} />
      <Route path="/category/:categoryName" element={<Categories />} />
      <Route path="/service/:id" element={<ServiceDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/user/profile" element={<MyProfile />} />

      
    </Routes>
  );
};

export default App;
