import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

function EditRequest({ request, onEditComplete }) {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: request.title,
    description: request.description,
    budget: request.budget,
  });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/requests/${request._id}`,
      formData,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );
    toast.success('Request updated!');
    onEditComplete(response.data);
  } catch (error) {
    toast.error('Could not update request.');
    console.error('Error updating request', error);
  }
};


  return (
    <div className="edit-form">
      <h4>Edit Request</h4>
      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} required />
        <textarea name="description" value={formData.description} onChange={handleChange} required />
        <input name="budget" type="number" value={formData.budget} onChange={handleChange} required />
        <button type="submit">Save Changes</button>
        <button type="button" onClick={() => onEditComplete(null)}>Cancel</button>
      </form>
    </div>
  );
}

export default EditRequest;
