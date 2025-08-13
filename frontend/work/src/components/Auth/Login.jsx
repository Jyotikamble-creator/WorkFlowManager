import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    // two way banding
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("Login");

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });

            // store token and user in localstorage
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            login(res.data.token, res.data.user);

            // reset form fields
            setEmail("");
            setPassword("");
            setError("");
            toast.success("Login Successful");

            // navigate based on role(admin,manager,employee)
            const role = res.data.user.role
            navigate(`/${role}`);

        } catch (error) {
            // show error message from the server if available
            setError(error.response?.data?.message || "Invalid Credentials")
        }

    }
    // display login form

    return (
        <div className='bg-gray-700 h-screen w-screen flex flex-col justify-center items-center'>
            <div className='text-3xl text-white mb-5 mt-5 p-20  border rounded-4xl border-amber-200'>Welcome
                <form
                    onSubmit={(e) =>
                        submitHandler(e)
                    }
                    className='flex flex-col gap-5 items-center justify-center'>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        value={email}
                        placeholder=" Enter Your Email"
                        required
                        className=' text-blue-600 text-xl outline-none border-2 bg-transparent rounded-full border-green-300  py-2 px-5 '
                    >
                    </input>

                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        value={password}
                        placeholder='Enter Your Password'
                        required
                        className=' text-blue-600 text-xl outline-none border-2 bg-transparent rounded-full border-green-300  py-2 px-5 '
                    >
                    </input>

                    <button type='submit'
                        className='  text-blue-600 text-xl outlinenone border-none  rounded-full bg-green-300  py-2 px-5 mt-5 '>
                        Login
                    </button>

                    {error && <p className='text-red-500'>{error}</p>}

                    <p className='text-white'>Don't have an account?
                        <a href="/SignUp" className='text-blue-500'>Sign Up</a>
                    </p>

                </form>

            </div>

        </div>
    )
}

export default Login