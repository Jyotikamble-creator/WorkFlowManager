import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <Link to="/" className="text-2xl font-bold flex items-center gap-2">🚀 WorkflowManager</Link>
      <div className="space-x-6 flex items-center">
        <Link to="/dashboard" className="hover:text-blue-200 transition font-medium">Dashboard</Link>
        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition font-medium">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
