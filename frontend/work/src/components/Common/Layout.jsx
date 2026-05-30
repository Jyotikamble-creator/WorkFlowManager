import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { clientLogger, LogTags } from '../../utils/logger';

// Layout component wraps the main app UI with Navbar and Sidebar
// and provides a consistent layout for all pages
const Layout = ({ children }) => {
  // Get the current user and their role from auth context
  const { user } = useAuth();
  const role = user?.role;

  useEffect(() => {
    clientLogger.info(LogTags.PAGE_LOAD, 'Layout mounted', { role });
  }, [role]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top navigation bar */}
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar with navigation links, role-based */}
        <Sidebar role={role} />
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;