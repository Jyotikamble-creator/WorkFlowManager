import React from 'react';
import Login from '../components/Auth/Login';

// LoginPage component renders the login form for users
const LoginPage = () => {
  return (
    <div className="p-4">
      {/* Login form component */}
      <Login />
    </div>
  );
};

export default LoginPage;
