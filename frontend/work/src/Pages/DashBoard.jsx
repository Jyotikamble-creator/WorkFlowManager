import React, { useEffect, useState } from 'react';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import ManagerDashboard from '../components/dashboard/ManagerDashboard';
import EmployeeDashboard from '../components/dashboard/EmployeeDashboard';
import axios from 'axios';


const DashboardPage = () => {
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRole(res.data.role);
    };
    fetchUser();
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
