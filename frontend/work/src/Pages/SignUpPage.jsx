import React from 'react';
import SignUp from '../components/Auth/SignUp';

// SignUpPage component renders the signup form for new users
const SignUpPage = () => {
  return (
    <div className="p-4">
      {/* Signup form component */}
      <SignUp />
    </div>
  );
};

export default SignUpPage;
