import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import EditService from './EditService'; // Import the EditService component
import { toast } from 'react-hot-toast';

function ServiceList() {
  const { user, token } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingServiceId, setEditingServiceId] = useState(null); // State to track which service is being edited

  useEffect(() => {
    // ... (fetchServices function remains the same)
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        setServices(response.data);
      } catch (err) {
        setError('Failed to fetch services.');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleDelete = async (serviceId) => {
    // ... (handleDelete function remains the same)
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`http://localhost:5000/api/services/${serviceId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setServices(services.filter(service => service._id !== serviceId));
        toast.success('Service deleted successfully.');
      } catch (err) {
        toast.error('Error: Could not delete service.');
      }
    }
  };

  const handleEditComplete = (updatedService) => {
    if (updatedService) {
      // Find the service in the list and update it with the new data
      setServices(services.map(s => s._id === updatedService._id ? updatedService : s));
    }
    setEditingServiceId(null); // Close the edit form
  };

  if (loading) return <p>Loading services...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="service-list">
      <h3>Available Services</h3>
      {services.map(service => (
        <div key={service._id} className="service-card">
          {editingServiceId === service._id ? (
            <EditService service={service} onEditComplete={handleEditComplete} />
          ) : (
            <>
              <h4>{service.title}</h4>
              <p>{service.description}</p>
              <p><strong>Price:</strong> ₹{service.price}</p>
              <p>
                <em>Posted by: <Link to={`/profile/${service.user.username}`}>{service.user.username}</Link></em>
              </p>
              {user && user.id === service.user._id && (
                <div>
                  <button onClick={() => setEditingServiceId(service._id)}>Edit</button>
                  <button onClick={() => handleDelete(service._id)} style={{ backgroundColor: '#dc3545', marginLeft: '10px' }}>Delete</button>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ServiceList;
