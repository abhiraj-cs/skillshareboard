import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import CreateService from './CreateService';
import CreateRequest from './CreateRequest'; // Import the new component
import ServiceList from './ServiceList';
import RequestList from './RequestList';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false); // New state for the request form

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Welcome back, {user ? user.username : 'Guest'}!</h3>
      
      {/* --- Buttons to toggle forms --- */}
      <button onClick={() => { setShowServiceForm(!showServiceForm); setShowRequestForm(false); }}>
        {showServiceForm ? 'Cancel' : 'Post a New Skill'}
      </button>
      <button onClick={() => { setShowRequestForm(!showRequestForm); setShowServiceForm(false); }}>
        {showRequestForm ? 'Cancel' : 'Post a Help Request'}
      </button>

      {/* --- Conditionally render forms --- */}
      {showServiceForm && <CreateService />}
      {showRequestForm && <CreateRequest />}
      
      <hr />

      <div style={{ display: 'flex', gap: '40px' }}>
        <div style={{ flex: 1 }}>
          <ServiceList /> 
        </div>
        <div style={{ flex: 1 }}>
          <RequestList />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
