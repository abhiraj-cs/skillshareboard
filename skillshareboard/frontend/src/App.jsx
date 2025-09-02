import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // ✅ Import Toaster
import './App.css';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user, logoutAction } = useContext(AuthContext);

  return (
    <div className="container">
      <Toaster position="top-center" reverseOrder={false} /> {/* ✅ Add Toaster component */}
      <header>
        <Link to="/"><h1>SkillShareboard</h1></Link>
        {user && <button onClick={logoutAction}>Logout</button>}
      </header>
      
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
