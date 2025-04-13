import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DogwalkerDataContext } from '../context/DogwalkerContext';

const DogwalkerRegister2 = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { SetDogwalker } = React.useContext(DogwalkerDataContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === 'image') {
        formData.append(key, data[key][0]); // Append the file object for the image
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/dogwalker/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 201) {
        const responseData = response.data;
        console.log(responseData);
        SetDogwalker(responseData.dogwalker);
        localStorage.setItem('token', responseData.token);
        navigate('/dogwalker-home');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="w-full bg-[white] border-b border-gray-300 text-black flex items-center justify-between px-6 py-4 shadow-md">
        <div className="flex items-center">
          <h1 className="text-3xl font-[Open_Sans]">pawpals</h1>
        </div>
      </header>

      <div className="flex min-h-screen">
        {/* Left Side: Registration Form */}
        <div className="w-1/2 flex flex-col items-center justify-center bg-white text-black">
          <div className="w-full max-w-md p-8 space-y-6 rounded-lg">
            <h2 className="text-2xl font-bold">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: 'Name is required', minLength: { value: 3, message: 'Name must be at least 3 characters' } })}
                  className={`w-full px-4 py-2 mt-1 border rounded-md hover:border-black ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your name"
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' } })}
                  className={`w-full px-4 py-2 mt-1 border rounded-md hover:border-black ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your email"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  id="password"
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                  className={`w-full px-4 py-2 mt-1 border rounded-md hover:border-black ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your password"
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
                <input
                  type="text"
                  id="phone"
                  {...register('phone', { required: 'Phone number is required', minLength: { value: 10, message: 'Phone number must be at least 10 digits' } })}
                  className={`w-full px-4 py-2 mt-1 border rounded-md hover:border-black ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium">Profile Image</label>
                <input
                  type="file"
                  id="image"
                  {...register('image', { required: 'Profile image is required' })}
                  className={`w-full px-4 py-2 mt-1 border rounded-md hover:border-black ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
              </div>

              <div>
                <label htmlFor="hourlyRate" className="block text-sm font-medium">Hourly Rate</label>
                <input
                  type="number"
                  id="hourlyRate"
                  {...register('hourlyRate', { required: 'Hourly rate is required', min: { value: 1, message: 'Hourly rate must be at least 1' } })}
                  className={`w-full px-4 py-2 mt-1 border rounded-md hover:border-black ${errors.hourlyRate ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your hourly rate"
                />
                {errors.hourlyRate && <span className="text-red-500 text-sm">{errors.hourlyRate.message}</span>}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium">Description</label>
                <textarea
                  id="description"
                  {...register('description', { required: 'Description is required', maxLength: { value: 200, message: 'Description must not exceed 200 characters' } })}
                  className={`w-full px-4 py-2 mt-1 border rounded-md hover:border-black ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter a short description about yourself"
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

            <div className="text-center text-sm">
              Already have a petwalker account?{' '}
              <button
                onClick={() => navigate('/dogwalker-login')}
                className="font-medium text-blue-500 rounded-md hover:text-blue-600"
              >
                Login here
              </button>
            </div>
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

export default DogwalkerRegister2;

