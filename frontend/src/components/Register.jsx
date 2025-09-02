import React, { useState } from 'react';
import axios from 'axios'; // Import axios
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

  // UPDATED: This function now sends a request to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend's register endpoint
      const response = await axios.post(
        'http://localhost:5000/api/users/register', 
        formData
      );
      
      console.log('User registered:', response.data);
      toast.success('Registration successful!')

    } catch (error) {
      // The backend will send an error message that we can display
      console.error('There was an error registering!', error.response.data);
      toast.error('Error: ' + error.response.data);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
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
