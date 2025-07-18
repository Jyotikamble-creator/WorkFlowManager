import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/auth/Login';
import SignUp from '../components/auth/Signup';
import ProtectionRoute from '../components/auth/ProtectionRoute';

import AdminDashboard from '../components/dashboard/AdminDashboard';
import EmployeeDashboard from '../components/dashboard/EmployeeDashboard';
import ManagerDashboard from '../components/dashboard/ManagerDashboard';
import WorkDescription from '../components/dashboard/WorkDescription';


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
