import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';
import ProtectionRoute from '../components/Auth/ProtectionRoute';

import AdminDashboard from '../components/DashBoard/AdminDashboard';
import EmployeeDashboard from '../components/DashBoard/EmployeeDashboard';
import ManagerDashboard from '../components/DashBoard/ManagerDashboard';
import WorkDescription from '../components/DashBoard/WorkDescription';


const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />

    <Route path="/admin" element={<ProtectionRoute role="admin"><AdminDashboard /></ProtectionRoute>} />
    <Route path="/employee" element={<ProtectionRoute role="employee"><EmployeeDashboard /></ProtectionRoute>} />
    <Route path="/manager" element={<ProtectionRoute role="manager"><ManagerDashboard /></ProtectionRoute>} />
    <Route path="/task/:id" element={<ProtectionRoute><WorkDescription /></ProtectionRoute>} />

    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes;
