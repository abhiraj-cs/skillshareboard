import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

function Login() {
  const { loginAction } = useContext(AuthContext);
  const [formData, setFormData] = useState({
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
        `${import.meta.env.VITE_API_URL}/api/users/login`, 
        formData
      );
      loginAction(response.data.user, response.data.token);
      toast.success('Logged in successfully!');
    } catch (err) {
      const errorMessage = err.response?.data || 'Login failed. Please try again.';
      toast.error(errorMessage.replace('Error: ', ''));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="auth-form">
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
