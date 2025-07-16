import React, { useState } from 'react';
import axios from 'axios';
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
    e.preventDefault();
    console.log("Sign Up");

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { email, password, role });
      setError("");
      toast.success("Registration Successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(error.response?.data?.message || "Registration failed")
    }

  };

  return (
    <div className='bg-gray-700 h-screen w-screen flex flex-col justify-center items-center'>
      <div className='text-3xl text-white mb-5 mt-5 p-20 border rounded-4xl border-amber-200'>
        Create An Account
        <form onSubmit={submitHandler} className='flex flex-col gap-5 items-center justify-center'>

          <input
            onChange={e => setUsername(e.target.value)}
            className='text-blue-600 text-xl outline-none border-2 bg-transparent rounded-full border-green-300 py-2 px-5'
            type="text"
            value={email}
            placeholder="Enter Your Username"
            required
          >
          </input>

          <input
            onChange={e => setPassword(e.target.value)}
            className='text-blue-600 text-xl outline-none border-2 bg-transparent rounded-full border-green-300 py-2 px-5'
            type="password"
            value={password}
            placeholder='Enter Your Password'
            required
          ></input>

          {/* role based */}
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className='py-2 px-5 rounded-full'>

            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>

          <button type='submit'
            className='text-blue-600 text-xl border-none rounded-full bg-green-300 py-2 px-5 mt-5'>
            Sign Up
          </button>

          {error && <p className='text-red-500'>{error}</p>}

          <p className='text-white'>Already have an account?
            <a href="/login" className='text-blue-500'>Login</a>
          </p>

        </form>

      </div>

    </div>
  )
}

export default SignUp