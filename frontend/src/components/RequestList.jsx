import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import EditRequest from './EditRequest';

function RequestList() {
  const { user, token } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingRequestId, setEditingRequestId] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/requests');
        setRequests(response.data);
      } catch (err) {
        setError('Failed to fetch requests.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleDelete = async (requestId) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      try {
        await axios.delete(`http://localhost:5000/api/requests/${requestId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setRequests(requests.filter(req => req._id !== requestId));
        toast.success('Request deleted.');
      } catch (err) {
        toast.error('Could not delete request.');
      }
    }
  };

  const handleEditComplete = (updatedRequest) => {
    if (updatedRequest) {
      setRequests(requests.map(r => r._id === updatedRequest._id ? updatedRequest : r));
    }
    setEditingRequestId(null);
  };

  if (loading) return <p>Loading requests...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="request-list">
      <h3>Community Request Board</h3>
      {requests.length === 0 ? (
        <p>No help requests posted yet.</p>
      ) : (
        requests.map(request => (
          <div key={request._id} className="service-card">
            {editingRequestId === request._id ? (
              <EditRequest request={request} onEditComplete={handleEditComplete} />
            ) : (
              <>
                <h4>{request.title}</h4>
                <p>{request.description}</p>
                <p><strong>Budget:</strong> ₹{request.budget}</p>
                <p>
                  <em>
                    Posted by: <Link to={`/profile/${request.user.username}`}>{request.user.username}</Link>
                  </em>
                </p>
                {user && user.id === request.user._id && (
                  <div>
                    <button onClick={() => setEditingRequestId(request._id)}>Edit</button>
                    <button onClick={() => handleDelete(request._id)} style={{ backgroundColor: '#dc3545', marginLeft: '10px' }}>
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default RequestList;
