import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx'; // We'll create this next
import AuthPage from './pages/AuthPage.jsx';

import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';

// This object defines all the valid URLs for your app
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // The main App component is the layout
    children: [
      {
        index: true, // This is the homepage
        element: <DashboardPage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/profile/:username", // A dynamic route for user profiles
        element: <ProfilePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
