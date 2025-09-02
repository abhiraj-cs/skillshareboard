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

  // ✅ This function updates the state when you type in a form field.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);
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
            onChange={handleChange} // ✅ This connects the input to the handleChange function.
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange} // ✅ This also connects to the handleChange function.
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
