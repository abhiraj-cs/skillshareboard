import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

function EditService({ service, onEditComplete }) {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: service.title,
    description: service.description,
    price: service.price,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/services/${service._id}`, formData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast.success('Service updated successfully!');
      onEditComplete(response.data); // Notify the parent component of the update
    } catch (error) {
      console.error('Error updating service', error);
      toast.error('Error: Could not update service.');
    }
  };

  return (
    <div className="edit-form">
      <h4>Edit Service</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <button type="submit">Save Changes</button>
        <button type="button" onClick={() => onEditComplete(null)}>Cancel</button>
      </form>
    </div>
  );
}

export default EditService;
