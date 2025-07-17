import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

// this will call both the navbar and sibe barr together
const Layout = ({ children, role }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar role={role} />
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
