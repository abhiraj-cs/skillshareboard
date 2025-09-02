// frontend/src/pages/DashboardPage.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Dashboard from '../components/Dashboard';

function DashboardPage() {
  const { user } = useContext(AuthContext);

  // If user is not logged in, redirect to the auth page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <Dashboard />;
}
export default DashboardPage;
