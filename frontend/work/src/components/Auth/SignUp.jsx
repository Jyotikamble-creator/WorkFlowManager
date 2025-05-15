import React from 'react'

const SignUp = () => {
  return (
    <div className='bg-gray-700 h-screen w-screen flex flex-col justify-center items-center' >
        <div className='text-3xl text-white mb-5  mt-5 p-20  border rounded-4xl border-amber-200' >Create An Account
            <form className='flex flex-col gap-5 items-center justify-center'>
                <input className=' text-blue-600 text-xl outline-none border-2 bg-transparent rounded-full border-green-300  py-2 px-5 ' type="email" placeholder="Enter Your Emial" required></input>
                <input  className=' text-blue-600 text-xl outline-none border-2 bg-transparent rounded-full border-green-300  py-2 px-5 'type="password"placeholder='Enter Your Password' required></input>
                <button  className='  text-blue-600 text-xl outlinenone border-none  rounded-full bg-green-300  py-2 px-5 mt-5 'type="submit">Sign Up</button>
                <p className='text-white'>Already have an account? <a href="/Login" className='text-blue-500'>Login</a></p>
            </form>
        </div>
    </div>
  )
}

export default SignUp;