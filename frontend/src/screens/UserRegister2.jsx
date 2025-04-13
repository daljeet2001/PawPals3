import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPaw } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import { UserDataContext } from '../context/User.Context';
import { Link } from 'react-router-dom';

const UserRegsiter = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { User, setUser } = React.useContext(UserDataContext);
 

  const onSubmit = async (data) => {
    try {
      const userData = {
        ...data,
        dog: {
          dogname: data.dogname,
          gender: data.gender,
          breed: data.breed,
          dogSize: data.dogSize,
          description: data.description,
        }, // Combine dog-related fields into a single object
      };

      console.log('Registering with:', userData);

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, userData);
      if (response.status === 201) {
        const responseData = response.data;
        console.log(responseData);
        setUser(responseData.user);
        localStorage.setItem('token', responseData.token);
        navigate('/home');
      }
    } catch (error) {
      if (error.response) {
        // Log the error response for debugging
        console.error('Error response:', error.response.data);
      } else {
        console.error('Error during registration:', error.message);
      }
    }
  };

  const handleDogChange = (field, value) => {
    setDog((prevDog) => ({ ...prevDog, [field]: value }));
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
        {/* Left Side: Register Form */}
        <div className="w-1/2 flex flex-col items-center justify-center bg-white text-black">
          <div className="w-full max-w-md p-8 space-y-6 rounded-lg">
            <h2 className="text-2xl font-bold">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* User Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="username"
                    {...register('username', { required: 'Username is required' })}
                    className={`w-full px-4 py-2 mt-1 border rounded-md hover:border-black ${
                      errors.username ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your username"
                  />
                  {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
                </div>
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
                        message: 'Email is invalid',
                      },
                    })}
                    className={`w-full px-4 py-2 mt-1 border rounded-md hover:border-black ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                </div>
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
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
              </div>
              <div>
                <label htmlFor="profileImage" className="block text-sm font-medium">
                  Profile Image URL
                </label>
                <input
                  type="text"
                  id="profileImage"
                  {...register('profileImage', { required: 'Profile image URL is required' })}
                  className={`w-full px-4 py-2 mt-1 border rounded-md hover:border-black ${
                    errors.profileImage ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your profile image URL"
                />
                {errors.profileImage && <span className="text-red-500 text-sm">{errors.profileImage.message}</span>}
              </div>

              {/* Dog Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dogname" className="block text-sm font-medium">
                    Dog Name
                  </label>
                  <input
                    type="text"
                    id="dogname"
                    {...register('dogname', { required: 'dogname is required' })}
                    className={`w-full px-4 py-2 mt-1 border rounded-md hover:border-black ${
                      errors.dogname ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your dog's name"
                  />
                  {errors.dogname && <span className="text-red-500 text-sm">{errors.dogname.message}</span>}
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium">
                    Gender
                  </label>
                  <select
                    id="gender"
                    {...register('gender', { required: 'gender is required' })}
                    className={`w-full px-4 py-2 mt-1 border rounded-md hover:border-black ${
                      errors.gender ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
                </div>
              </div>
              <div>
                <label htmlFor="breed" className="block text-sm font-medium">
                  Dog Breed
                </label>
                <input
                  type="text"
                  id="breed"
                  {...register('breed', { required: 'breed is required' })}
                  className={`w-full px-4 py-2 mt-1 border rounded-md hover:border-black ${
                    errors.breed ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your dog's breed"
                />
                {errors.breed && <span className="text-red-500 text-sm">{errors.breed.message}</span>}
              </div>

              <div>
                <label htmlFor="dogSize" className="block text-sm font-medium">
                  Dog Size
                </label>
                <select
                  id="dogSize"
                  {...register('dogSize', { required: 'dog Size is required' })}
                  className={`w-full px-4 py-2 mt-1 border rounded-md hover:border-black ${
                    errors.dogSize ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select dog size</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
                {errors.dogSize && <span className="text-red-500 text-sm">{errors.dogSize.message}</span>}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  {...register('description', {
                    required: 'Description is required',
                    maxLength: {
                      value: 200,
                      message: 'Description must not exceed 200 characters',
                    },
                  })}
                  className={`w-full px-4 py-2 mt-1 border rounded-md hover:border-black ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter a description for your dog"
                />
                {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Register
              </button>
            </form>
            <p className="text-center text-sm">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="font-medium text-blue-500 rounded-md hover:text-blue-600"
              >
                Log in here.
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

export default UserRegsiter;
