import React, { useState } from 'react';
import { signup as signupService } from '../../services/authServices';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // two way binding
  const submitHandler = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    console.log("Sign Up");

    try {
      await signupService({ name: email, email, password, role });
      setError("");
      toast.success("Registration Successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed")
    }

  };

  return (
    <div className='bg-gray-700 h-screen w-screen flex flex-col justify-center items-center'>
      <div className='text-3xl text-white mb-5 mt-5 p-20 border rounded-4xl border-amber-200'>
        Create An Account
        <div className='flex flex-col gap-5 items-center justify-center'>

          <input
            onChange={e => setEmail(e.target.value)}
            className='text-blue-600 text-xl outline-none border-2 bg-transparent rounded-full border-green-300 py-2 px-5'
            type="text"
            value={email}
            placeholder="Enter Your Username"
            required
          />

          <input
            onChange={e => setPassword(e.target.value)}
            className='text-blue-600 text-xl outline-none border-2 bg-transparent rounded-full border-green-300 py-2 px-5'
            type="password"
            value={password}
            placeholder='Enter Your Password'
            required
          />

          {/* role based */}
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className='py-2 px-5 rounded-full'>

            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>

          <button type='button'
            onClick={submitHandler}
            className='text-blue-600 text-xl border-none rounded-full bg-green-300 py-2 px-5 mt-5'>
            Sign Up
          </button>

          {error && <p className='text-red-500'>{error}</p>}

          <p className='text-white'>Already have an account?
            <a href="/login" className='text-blue-500'>Login</a>
          </p>

        </div>

      </div>

    </div>
  )
}

export default SignUp