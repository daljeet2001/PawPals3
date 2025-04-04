import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    // Add login logic here
    const UserData={
      email: email,
      password: password
    }
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`,UserData)
    if(response.status===200){
      const data=response.data
      console.log(data)
      navigate('/home')
    }
    console.log('Logging in with:', { email, password });
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Login Form */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-white text-black">
      <div className="w-full  text-3xl font-semibold text-center mb-4">
       <h3>Welcome to </h3>
       <h3>Pawpals</h3>
      </div>
     
        <div className="w-full max-w-md p-8 space-y-6 rounded-lg ">
          <h2 className="text-2xl font-bold ">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-1 border border-grey rounded-md  hover:border-black"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-1 border border-grey rounded-md hover:border-black"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-[#FF9A88] rounded-md hover:bg-[#FFDACA]"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="font-medium text-[#FF9A88] underline hover:text-[#FFDACA]"
            >
              Create one
            </button>
            <p className="text-center text-sm">
            Are you a petwalker?{' '}
            <button
              onClick={() => navigate('/dogwalker-login')}
              className="font-medium text-[#FFBD5C] underline hover:text-[#FFDACA]"
            >
              Login here
            </button></p>
          </p>
      
     
      
        </div>
      
      </div>

      {/* Right Side: Image Placeholder */}
      <div className="w-1/2 flex items-center justify-center bg-white">
      <img src="https://img.freepik.com/free-vector/hand-drawn-illustration-people-with-pets_23-2148980837.jpg?t=st=1743747458~exp=1743751058~hmac=f10fd2bf8591c5633f81d0f3037a915ced020b2a69a7b7f3378c1f7b520d97c6&w=826" alt="dog image"></img>
      </div>
    </div>
  );
};

export default UserLogin;

