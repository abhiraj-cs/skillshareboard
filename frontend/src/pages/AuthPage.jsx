import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Login from '../components/Login';
import Register from '../components/Register';

function AuthPage() {
  const { user } = useContext(AuthContext);
  const [isLoginView, setIsLoginView] = useState(true);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-toggle">
          <button 
            className={isLoginView ? 'active' : ''} 
            onClick={() => setIsLoginView(true)}
          >
            Login
          </button>
          <button 
            className={!isLoginView ? 'active' : ''} 
            onClick={() => setIsLoginView(false)}
          >
            Register
          </button>
        </div>
        
        {isLoginView ? <Login /> : <Register />}
      </div>
    </div>
  );
}
export default AuthPage;
