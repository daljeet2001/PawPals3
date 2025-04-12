import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPaw } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import { DogwalkerDataContext } from '../context/DogwalkerContext';
import { Link } from 'react-router-dom';

const DogwalkerLogin2 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { Dogwalker, SetDogwalker } = React.useContext(DogwalkerDataContext);

  // Use react-hook-form for validation
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const userData = {
      email: data.email,
      password: data.password
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/dogwalker/login`, userData);

    if (response.status === 200) {
      const data = response.data;
      console.log(data);
      SetDogwalker(data.dogwalker);
      localStorage.setItem('token', data.token);
      navigate('/dogwalker-home');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="w-full bg-[white] border-b border-gray-300 text-black flex items-center justify-between px-6 py-4 shadow-md">
        <div className="flex items-center">
          <h1 className="text-3xl font-[Open_Sans]">pawpals</h1>
        </div>
        {/* <div className="flex items-center space-x-2">
          <div>
            <Link to="/inbox">
              <Box sx={{ color: 'action.active' }}>
                <Badge color="primary" variant="dot">
                  <i className="text-black ri-chat-4-line"></i>
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
            <h3>Welcome to Pawpals</h3>
            <h3>Petwalkers</h3>
          </div>

          <div className="w-full max-w-md p-8 space-y-6 rounded-lg ">
            <h2 className="text-2xl font-bold ">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: "Email is required", pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i })}
                  className="w-full px-4 py-2 mt-1 border border-grey rounded-md  hover:border-black"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message || "Invalid email format"}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                  className="w-full px-4 py-2 mt-1 border border-grey rounded-md hover:border-black"
                  placeholder="Enter your password"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Login
              </button>
            </form>
            <p className="text-center text-sm">
              Don't have a petwalker account?{' '}
              <button
                onClick={() => navigate('/dogwalker-register')}
                className="font-medium text-blue-500 rounded-md hover:text-blue-600"
              >
                Create one
              </button><br />
            </p>
          </div>
        </div>

        {/* Right Side: Image Placeholder */}
        <div className="w-1/2 flex items-center justify-center bg-white">
          <img src="https://img.freepik.com/free-vector/people-walking-dog-concept_23-2148528607.jpg?t=st=1743756609~exp=1743760209~hmac=f322dbe456c39ddf491c2e2215ef61f228849b0737238c6e43c620eab14768b2&w=1380" alt="dog image" />
        </div>
      </div>
    </div>
  );
};

export default DogwalkerLogin2;
