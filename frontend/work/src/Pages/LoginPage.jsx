
import React, { useEffect } from 'react';
import Login from '../components/Auth/Login';
import { clientLogger, LogTags } from '../utils/logger';


// LoginPage component renders the login form for users
const LoginPage = () => {
  useEffect(() => {
    clientLogger.info(LogTags.PAGE_LOAD, 'LoginPage loaded');
  }, []);
  return (
    <div className="p-4">
      {/* Login form component */}
      <Login />
    </div>
  );
};

export default LoginPage;
