
import React, { useEffect } from 'react';
import SignUp from '../components/Auth/SignUp';
import { clientLogger, LogTags } from '../utils/logger';


// SignUpPage component renders the signup form for new users
const SignUpPage = () => {
  useEffect(() => {
    clientLogger.info(LogTags.PAGE_LOAD, 'SignUpPage loaded');
  }, []);
  return (
    <div className="p-4">
      {/* Signup form component */}
      <SignUp />
    </div>
  );
};

export default SignUpPage;
