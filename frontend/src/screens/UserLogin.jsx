import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope, faPaw} from '@fortawesome/free-solid-svg-icons'
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import { UserDataContext } from '../context/User.Context';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const{User, setUser}=React.useContext(UserDataContext)

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
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }
    // console.log('Logging in with:', { email, password });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
       <header className="w-full bg-[white] border-b border-gray-300 text-black flex items-center justify-between px-6 py-4 shadow-md">
             <div className="flex items-center">
               <h1 className=" text-3xl font-[Open_Sans]">pawpals</h1>
               &nbsp;&nbsp;&nbsp;&nbsp;
             </div>
             <div className="flex items-center space-x-2">
              
               <div><a href="#our-services">
                 <Box sx={{ color: 'action.active' }}>
                   <Badge color="primary" variant="dot">
                     <i className=" text-black ri-chat-4-line"></i>
                   </Badge>
                 </Box>
               </a></div>
               <div><a href="#our-services">
                 <Box sx={{ color: 'action.active' }}>
                   <Badge badgeContent={4} color="primary">
                     <i className="text-black ri-notification-2-line "></i>
                   </Badge>
                 </Box>
               </a></div>
              
             </div>
           </header>
     
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
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="font-medium  text-blue-500 rounded-md hover:text-blue-600"
            >
              Create one
            </button>
            <p className="text-center text-sm">
            Are you a petwalker?{' '}
            <button
              onClick={() => navigate('/dogwalker-login')}
              className="font-medium  text-blue-500 rounded-md hover:text-blue-600"
            >
              Login here
            </button></p>
          </p>
      
     
      
        </div>
      
      </div>

      {/* Right Side: Image Placeholder */}
      <div className="w-1/2 flex items-center justify-center bg-white">
      <img src="https://img.freepik.com/free-vector/people-walking-dog-concept_23-2148528607.jpg?t=st=1743756609~exp=1743760209~hmac=f322dbe456c39ddf491c2e2215ef61f228849b0737238c6e43c620eab14768b2&w=1380" alt="dog image"></img>
      </div>
    </div>
    </div>
    
  );
};

export default UserLogin;

