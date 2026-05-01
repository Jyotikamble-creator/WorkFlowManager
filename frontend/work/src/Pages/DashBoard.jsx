import React, { useEffect, useState } from 'react';
import AdminDashboard from '../components/DashBoard/AdminDashboard';
import ManagerDashboard from '../components/DashBoard/ManagerDashboard';
import EmployeeDashboard from '../components/DashBoard/EmployeeDashboard';


const DashboardPage = () => {
  const [role, setRole] = useState('');

  useEffect(() => {
    // Read role from localStorage if available (set by login)
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRole(parsed.role || '');
      } catch (e) {
        setRole('');
      }
    }
  }, []);

  if (!role) return <p>Loading dashboard...</p>;

  return (
    <div className="p-4">
      {role === 'admin' && <AdminDashboard />}
      {role === 'manager' && <ManagerDashboard />}
      {role === 'employee' && <EmployeeDashboard />}
    </div>
  );
};

export default DashboardPage;
