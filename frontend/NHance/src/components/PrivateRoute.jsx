import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles, children }) => {
  const userRole = localStorage.getItem('role'); // Replace with actual role logic

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
