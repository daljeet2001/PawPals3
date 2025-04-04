import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DogwalkerRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    experience: '',
    availability: [''],
    image: '',
    description: '',
    hourlyRate: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'availability') {
      setFormData({ ...formData, [name]: value.split(',').map(day => day.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRegister = async(e) => {
    e.preventDefault();
    // Add registration logic here
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/dogwalker/register`, formData);
    // console.log(response.status)
  
    if(response.status===201){
      const data=response.data
      console.log(data)
      navigate('/dogwalker-home')
    console.log('Registering with:', formData);
  };
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      experience: '',
      availability: [''],
      image: '',
      description: '',
      hourlyRate: '',
    });
}

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Registration Form */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-white text-black">
        <div className="w-full text-3xl font-semibold text-center mt-4">
          <h3>Welcome to Pawpals</h3>
          <h3>Petwalkers</h3>
        </div>

        <div className="w-full max-w-md p-8 space-y-6 rounded-lg">
          <h2 className="text-2xl font-bold">Register</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border border-grey rounded-md hover:border-black"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border border-grey rounded-md hover:border-black"
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border border-grey rounded-md hover:border-black"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border border-grey rounded-md hover:border-black"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium">
                  Experience (Years)
                </label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border border-grey rounded-md hover:border-black"
                  placeholder="Enter your experience"
                  required
                />
              </div>
              <div>
                <label htmlFor="hourlyRate" className="block text-sm font-medium">
                  Hourly Rate
                </label>
                <input
                  type="number"
                  id="hourlyRate"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border border-grey rounded-md hover:border-black"
                  placeholder="Enter your hourly rate"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="availability" className="block text-sm font-medium">
                Availability
              </label>
              <input
                type="text"
                id="availability"
                name="availability"
                value={formData.availability.join(', ')}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-grey rounded-md hover:border-black"
                placeholder="Enter your availability (e.g., Monday, Wednesday)"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-grey rounded-md hover:border-black"
                placeholder="Enter a short description about yourself"
                maxLength="200"
                required
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium">
                Profile Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-grey rounded-md hover:border-black"
                placeholder="Enter image URL"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-[#FFBD5C] rounded-md hover:bg-[#FFDACA]"
            >
              Register
            </button>
          </form>
          <div className="text-center text-sm">
            Already have a petwalker account?{' '}
            <button
              onClick={() => navigate('/dogwalker-login')}
              className="font-medium text-[#FFBD5C] underline hover:text-[#FFDACA]"
            >
              Login here
            </button>
         
          <p className="text-center text-sm">
            Are you a user?{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-medium text-[#FF9A88] underline hover:text-[#FFDACA]"
            >
              Login here
            </button>
          </p>
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
  );
};

export default DogwalkerRegister;

