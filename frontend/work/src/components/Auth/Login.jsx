
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login as loginService } from '../../services/authServices';
import { useAuth } from '../../context/AuthContext';
import { clientLogger, LogTags } from '../../utils/logger';

// Login component provides the login form and handles authentication
const Login = () => {

    // State for email, password, and error message
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    // Handle form submission for login
    const submitHandler = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        clientLogger.info(LogTags.LOGIN, `Login attempt for ${email}`);

        try {
            // Call login service with email and password
            const data = await loginService({ email, password });

            // Use context login helper which will persist token and user
            login(data);

            // Reset form fields
            setEmail("");
            setPassword("");
            setError("");
            toast.success("Login Successful");
            clientLogger.info(LogTags.LOGIN, `Login success for ${email}`);

            // Navigate based on user role (admin, manager, employee)
            const role = data.user?.role;
            navigate(`/${role}`);

        } catch (error) {
            // Show error message from the server if available
            setError(error.response?.data?.message || "Invalid Credentials")
            clientLogger.error(LogTags.LOGIN, `Login failed for ${email}`, error);
        }
    }

    // Render the login form UI
    return (
        <div className='bg-gradient-to-br from-blue-600 to-blue-800 min-h-screen flex items-center justify-center px-4'>
            <div className='w-full max-w-md bg-white rounded-lg shadow-2xl p-8'>
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold text-gray-800 mb-2'>Welcome Back</h1>
                    <p className='text-gray-600'>Sign in to your account</p>
                </div>

                <form onSubmit={submitHandler} className='space-y-4'>
                    <div>
                        <label className='block text-gray-700 font-semibold mb-2'>Email</label>
                        {/* Email input */}
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            value={email}
                            placeholder="your@email.com"
                            required
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                    </div>

                    <div>
                        <label className='block text-gray-700 font-semibold mb-2'>Password</label>
                        {/* Password input */}
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            value={password}
                            placeholder='Enter your password'
                            required
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                    </div>

                    {/* Error message if login fails */}
                    {error && <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>{error}</div>}

                    <button type='submit'
                        className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 mt-6'>
                        Sign In
                    </button>
                </form>

                <div className='mt-6 text-center'>
                    <p className='text-gray-600'>Don't have an account?{' '}
                        <a href="/signup" className='text-blue-600 font-semibold hover:text-blue-700'>Create one</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login