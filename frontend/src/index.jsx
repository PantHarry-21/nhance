// frontend/src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PartnerDashboard from "./pages/partner/PartnerDashboard";
import UserHome from "./pages/user/Home";

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/partner" element={<PartnerDashboard />} />
      <Route path="/" element={<UserHome />} />
    </Routes>
  );
}

export default App;
