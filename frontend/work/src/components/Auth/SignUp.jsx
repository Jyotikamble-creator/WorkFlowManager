import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("employee")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { username, password, role })
      setError("")
      navigate("/login")
    } catch (err) {
      setError("Registration failed")
    }
  }

  return (
    <div className='bg-gray-700 h-screen w-screen flex flex-col justify-center items-center'>
      <div className='text-3xl text-white mb-5 mt-5 p-20 border rounded-4xl border-amber-200'>
        Create An Account
        <form onSubmit={submitHandler} className='flex flex-col gap-5 items-center justify-center'>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            className='text-blue-600 text-xl outline-none border-2 bg-transparent rounded-full border-green-300 py-2 px-5'
            type="text"
            placeholder="Enter Your Username"
            required
          />
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='text-blue-600 text-xl outline-none border-2 bg-transparent rounded-full border-green-300 py-2 px-5'
            type="password"
            placeholder='Enter Your Password'
            required
          />
          <select value={role} onChange={e => setRole(e.target.value)} className='py-2 px-5 rounded-full'>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
          <button className='text-blue-600 text-xl border-none rounded-full bg-green-300 py-2 px-5 mt-5'>Sign Up</button>
          {error && <p className='text-red-500'>{error}</p>}
          <p className='text-white'>Already have an account? <a href="/login" className='text-blue-500'>Login</a></p>
        </form>
      </div>
    </div>
  )
}

export default SignUp