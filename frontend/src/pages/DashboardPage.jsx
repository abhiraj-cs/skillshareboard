// frontend/pages/dashboard.jsx
import React, { useContext } from 'react';
import Dashboard from '../components/Dashboard';
import { AuthContext } from '../context/AuthContext';

export default function DashboardPage() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Please log in to view the dashboard.</p>; // Or redirect using Next.js router
  }

  return <Dashboard />;
}

