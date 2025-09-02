import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Changed from localhost to the live API URL
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/register`, 
        formData
      );
      
      console.log('User registered:', response.data);
      toast.success('Registration successful! Please log in.');

    } catch (error) {
      const errorMessage = error.response?.data || 'Registration failed.';
      console.error('There was an error registering!', errorMessage);
      toast.error('Error: ' + errorMessage);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
