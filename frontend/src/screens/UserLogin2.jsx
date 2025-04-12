import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Badge } from '@mui/material';
import { UserDataContext } from '../context/User.Context';

const UserLogin2 = () => {
  const navigate = useNavigate();
  const { User, setUser } = React.useContext(UserDataContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        data
      );

      if (response.status === 200) {
        const responseData = response.data;
        console.log(responseData);
        setUser(responseData.user);
        localStorage.setItem('token', responseData.token);
        navigate('/home');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="w-full bg-[white] border-b border-gray-300 text-black flex items-center justify-between px-6 py-4 shadow-md">
        <div className="flex items-center">
          <h1 className=" text-3xl font-[Open_Sans]">pawpals</h1>
        </div>
        {/* <div className="flex items-center space-x-2">
          <div>
            <Link to="/inbox">
              <Box sx={{ color: 'action.active' }}>
                <Badge color="primary" variant="dot">
                  <i className=" text-black ri-chat-4-line"></i>
                </Badge>
              </Box>
            </Link>
          </div>
          <div>
            <a href="#our-services">
              <Box sx={{ color: 'action.active' }}>
                <Badge badgeContent={4} color="primary">
                  <i className="text-black ri-notification-2-line "></i>
                </Badge>
              </Box>
            </a>
          </div>
        </div> */}
      </header>

      <div className="flex min-h-screen">
        {/* Left Side: Login Form */}
        <div className="w-1/2 flex flex-col items-center justify-center bg-white text-black">
          <div className="w-full text-3xl font-semibold text-center mb-4">
            <h3>Welcome to </h3>
            <h3>Pawpals</h3>
          </div>

          <div className="w-full max-w-md p-8 space-y-6 rounded-lg ">
            <h2 className="text-2xl font-bold ">Login</h2>
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Enter a valid email',
                    },
                  })}
                  className={`w-full px-4 py-2 mt-1 border rounded-md hover:border-black ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  className={`w-full px-4 py-2 mt-1 border rounded-md hover:border-black ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
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
                className="font-medium text-blue-500 rounded-md hover:text-blue-600"
              >
                Create one
              </button>
            </p>

            <p className="text-center text-sm">
              Are you a petwalker?{' '}
              <button
                onClick={() => navigate('/dogwalker-login')}
                className="font-medium text-blue-500 rounded-md hover:text-blue-600"
              >
                Login here
              </button>
            </p>
          </div>
        </div>

        {/* Right Side: Image Placeholder */}
        <div className="w-1/2 flex items-center justify-center bg-white">
          <img
            src="https://img.freepik.com/free-vector/people-walking-dog-concept_23-2148528607.jpg?t=st=1743756609~exp=1743760209~hmac=f322dbe456c39ddf491c2e2215ef61f228849b0737238c6e43c620eab14768b2&w=1380"
            alt="dog image"
          />
        </div>
      </div>
    </div>
  );
};

export default UserLogin2;
