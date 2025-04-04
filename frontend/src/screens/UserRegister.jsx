import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserRegsiter = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dog, setDog] = useState({
    dogname: '',
    gender: '',
    breed: '',
    dogSize: '',
    description: '',
    image: '', // Added image field
  });
  const navigate = useNavigate();

  const handleRegister = async(e) => {
    e.preventDefault();
    // Add registration logic here
    const userData = {
      username: username,
      email: email,
      password: password,
      dog: dog,
    };
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`,userData)
    if(response.status===201){
      const data=response.data
      console.log(data)
      navigate('/home')
    }
    setUsername('');
    setEmail('');
    setPassword('');
    setDog({
      dogname:'',
      gender:'',
      bread:'',
      dogSize:'',
      description:'',
      image: '', // Added image field
    })

  };

  const handleDogChange = (field, value) => {
    setDog((prevDog) => ({ ...prevDog, [field]: value }));
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Register Form */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-white text-black">
        <div className="w-full text-3xl font-semibold text-center mb-4">
          <h3>Welcome to </h3>
          <h3>Pawpals</h3>
        </div>

        <div className="w-full max-w-md p-8 space-y-6 rounded-lg">
          <h2 className="text-2xl font-bold">Register</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 mt-1 border border-grey rounded-md hover:border-black"
                  placeholder="Enter your username"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 mt-1 border border-grey rounded-md hover:border-black"
                  placeholder="Enter your email"
                  required
                />
              </div>
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="dogname" className="block text-sm font-medium">
                  Dog Name
                </label>
                <input
                  type="text"
                  id="dogname"
                  value={dog.dogname}
                  onChange={(e) => handleDogChange('dogname', e.target.value)}
                  className="w-full px-4 py-2 mt-1 border border-grey rounded-md hover:border-black"
                  placeholder="Enter your dog's name"
                  required
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium">
                  Gender
                </label>
                <select
                  id="gender"
                  value={dog.gender}
                  onChange={(e) => handleDogChange('gender', e.target.value)}
                  className="w-full px-4 py-2 mt-1 border border-grey rounded-md hover:border-black"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="breed" className="block text-sm font-medium">
                  Breed
                </label>
                <input
                  type="text"
                  id="breed"
                  value={dog.breed}
                  onChange={(e) => handleDogChange('breed', e.target.value)}
                  className="w-full px-4 py-2 mt-1 border border-grey rounded-md hover:border-black"
                  placeholder="Enter your dog's breed"
                  required
                />
              </div>
              <div>
                <label htmlFor="dogSize" className="block text-sm font-medium">
                  Dog Size
                </label>
                <select
                  id="dogSize"
                  value={dog.dogSize}
                  onChange={(e) => handleDogChange('dogSize', e.target.value)}
                  className="w-full px-4 py-2 mt-1 border border-grey rounded-md hover:border-black"
                  required
                >
                  <option value="">Select size</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                value={dog.description}
                onChange={(e) => handleDogChange('description', e.target.value)}
                className="w-full px-4 py-2 mt-1 border border-grey rounded-md hover:border-black"
                placeholder="Enter a description for your dog"
                maxLength="200"
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium">
                Dog Image URL
              </label>
              <input
                type="text"
                id="image"
                value={dog.image}
                onChange={(e) => handleDogChange('image', e.target.value)}
                className="w-full px-4 py-2 mt-1 border border-grey rounded-md hover:border-black"
                placeholder="Enter your dog's image URL"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-[#FF9A88] rounded-md hover:bg-[#FFDACA]"
            >
              Register
            </button>
          </form>
          <p className="text-center text-sm">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-medium text-[#FF9A88] underline hover:text-[#FFDACA]"
            >
              Log in here.
            </button>
          </p>
        </div>
      </div>

      {/* Right Side: Image Placeholder */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <img
          src="https://img.freepik.com/free-vector/hand-drawn-illustration-people-with-pets_23-2148980837.jpg?t=st=1743747458~exp=1743751058~hmac=f10fd2bf8591c5633f81d0f3037a915ced020b2a69a7b7f3378c1f7b520d97c6&w=826"
          alt="dog image"
        />
      </div>
    </div>
  );
};

export default UserRegsiter;
