import React from 'react';
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  navigate('/login');


  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">WorkflowManager</Link>
      <div className="space-x-4">
        <Link to="/dashboard">Dashboard</Link>
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
      </div>
    </nav>
  );

};
export default Navbar;
