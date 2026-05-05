
import React, { useState } from 'react';
import { signup as signupService } from '../../services/authServices';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clientLogger, LogTags } from '../../utils/logger';

// SignUp component provides the registration form for new users
const SignUp = () => {
  // State for email, password, role, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form submission for signup
  const submitHandler = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    clientLogger.info(LogTags.REGISTER, `Signup attempt for ${email}`);

    try {
      // Call signup service with form data
      await signupService({ name: email, email, password, role });
      setError("");
      toast.success("Registration Successful! Please login.");
      clientLogger.info(LogTags.REGISTER, `Signup success for ${email}`);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed")
      clientLogger.error(LogTags.REGISTER, `Signup failed for ${email}`, err);
    }
  };

  // Render the signup form UI
  return (
    <div className='bg-gradient-to-br from-green-600 to-green-800 min-h-screen flex items-center justify-center px-4'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-2xl p-8'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>Create Account</h1>
          <p className='text-gray-600'>Join our workflow management platform</p>
        </div>

        <form onSubmit={submitHandler} className='space-y-4'>
          <div>
            <label className='block text-gray-700 font-semibold mb-2'>Email</label>
            {/* Email input */}
            <input
              onChange={e => setEmail(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
              type="email"
              value={email}
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className='block text-gray-700 font-semibold mb-2'>Password</label>
            {/* Password input */}
            <input
              onChange={e => setPassword(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
              type="password"
              value={password}
              placeholder='Create a password'
              required
            />
          </div>

          <div>
            <label className='block text-gray-700 font-semibold mb-2'>Role</label>
            {/* Role selection dropdown */}
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Error message if signup fails */}
          {error && <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>{error}</div>}

          <button type='submit'
            className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 mt-6'>
            Create Account
          </button>
        </form>

        <div className='mt-6 text-center'>
          <p className='text-gray-600'>Already have an account?{' '}
            <a href="/login" className='text-green-600 font-semibold hover:text-green-700'>Sign in</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp