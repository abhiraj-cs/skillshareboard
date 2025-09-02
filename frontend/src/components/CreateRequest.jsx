import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

function CreateRequest() {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/requests/add', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      alert('Request posted successfully!');
      setFormData({ title: '', description: '', budget: '' }); // Clear the form
    } catch (error) {
      console.error('Error posting request', error.response.data);
      toast.error('Error: ' + error.response.data);
    }
  };

  return (
    <div>
      <h4>Post a Help Request</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Request Title"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe what you need help with..."
          required
        ></textarea>
        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          placeholder="Budget (in ₹)"
          required
        />
        <button type="submit">Post Request</button>
      </form>
    </div>
  );
}

export default CreateRequest;
