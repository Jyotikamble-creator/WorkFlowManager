import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Sidebar component displays the side navigation menu
// Shows different links based on user role
const Sidebar = () => {
  const { user } = useAuth();
  const role = user?.role;

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-6 border-r border-gray-700">
      <h2 className="text-2xl font-bold mb-8">📋 Menu</h2>
      <ul className="space-y-3">
        {/* Dashboard link (all users) */}
        <li><Link to="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-800 transition">Dashboard</Link></li>
        {/* My Tasks link (all users) */}
        <li><Link to="/tasks" className="block px-4 py-2 rounded hover:bg-gray-800 transition">My Tasks</Link></li>
        {/* Manager-only link */}
        {role === 'manager' && <li><Link to="/assign" className="block px-4 py-2 rounded hover:bg-gray-800 transition">Assign Tasks</Link></li>}
        {/* Admin-only link */}
        {role === 'admin' && <li><Link to="/create-task" className="block px-4 py-2 rounded hover:bg-gray-800 transition">Create Task</Link></li>}
      </ul>
    </aside>
  );
};

export default Sidebar;
