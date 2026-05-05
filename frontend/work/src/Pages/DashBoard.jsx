
import React, { useEffect, useState } from 'react';
import AdminDashboard from '../components/DashBoard/AdminDashboard';
import ManagerDashboard from '../components/DashBoard/ManagerDashboard';
import EmployeeDashboard from '../components/DashBoard/EmployeeDashboard';
import { clientLogger, LogTags } from '../utils/logger';

// DashboardPage component decides which dashboard to show based on user role
const DashboardPage = () => {
  // State to store the user's role
  const [role, setRole] = useState('');

  useEffect(() => {
    clientLogger.info(LogTags.PAGE_LOAD, 'DashBoard page loaded');
    // On mount, read the user role from localStorage (set during login)
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

  // Show loading state if role is not determined yet
  if (!role) return <p>Loading dashboard...</p>;

  // Render the appropriate dashboard based on user role
  return (
    <div className="p-4">
      {role === 'admin' && <AdminDashboard />}
      {role === 'manager' && <ManagerDashboard />}
      {role === 'employee' && <EmployeeDashboard />}
    </div>
  );
};

export default DashboardPage;
