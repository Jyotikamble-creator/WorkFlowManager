import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';
import ProtectionRoute from '../components/Auth/ProtectionRoute';

import AdminDashboard from '../components/DashBoard/AdminDashboard';
import EmployeeDashboard from '../components/DashBoard/EmployeeDashboard';
import ManagerDashboard from '../components/DashBoard/ManagerDashboard';
import WorkDescription from '../components/DashBoard/WorkDescription';

import LandingPage from '../pages/LandingPage';

// AppRoutes defines all the routes for the application
// Uses ProtectionRoute to guard role-based dashboards
const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />

    {/* Protected routes for different roles */}
    <Route path="/admin" element={<ProtectionRoute role="admin"><AdminDashboard /></ProtectionRoute>} />
    <Route path="/employee" element={<ProtectionRoute role="employee"><EmployeeDashboard /></ProtectionRoute>} />
    <Route path="/manager" element={<ProtectionRoute role="manager"><ManagerDashboard /></ProtectionRoute>} />
    {/* Task details, protected for any logged-in user */}
    <Route path="/task/:id" element={<ProtectionRoute><WorkDescription /></ProtectionRoute>} />

    {/* Catch-all: redirect unknown routes to login */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes;
