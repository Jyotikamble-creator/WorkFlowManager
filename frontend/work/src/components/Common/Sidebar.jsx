import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role }) => {
  return (
    <aside className="w-64 bg-gray-100 h-screen p-4 border-r">
      <h2 className="text-xl font-semibold mb-4">Menu</h2>
      <ul className="space-y-2">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/tasks">My Tasks</Link></li>
        {role === 'manager' && <li><Link to="/assign">Assign Tasks</Link></li>}
        {role === 'admin' && <li><Link to="/create-task">Create Task</Link></li>}
      </ul>
    </aside>
  );
};

export default Sidebar;
