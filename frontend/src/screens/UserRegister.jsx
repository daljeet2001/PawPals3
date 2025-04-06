import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope, faPaw} from '@fortawesome/free-solid-svg-icons'

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
      localStorage.setItem('token', data.token)
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
     <div className="flex flex-col min-h-screen bg-gray-100">
          {/* Header */}
          <header className="w-full bg-[white] border-b border-gray-300 text-black flex items-center justify-between px-6 py-4 shadow-md">
                  <div className="flex items-center">
                    {/* <FaPaw className="text-2xl" /> */}
                    
                    <h1 className="text-3xl font-bold text-[#FFBD5C] pb-1">Pawpals <FontAwesomeIcon icon={faPaw} /></h1>
                    &nbsp;&nbsp;&nbsp;&nbsp;
          
                   <div className="opacity-50 hover:opacity-100 transition-opacity duration-300 mx-2"><i class="ri-heart-line mx-1"></i><a href="#become-sitter">Become a Sitter</a></div> 
                    <div  className="opacity-50 hover:opacity-100 transition-opacity duration-300 mx-2"><i class="ri-service-line mx-1"></i><a href="#our-services" >Our Services</a></div>
                    <div  className="opacity-50 hover:opacity-100 transition-opacity duration-300 mx-2"><i class="ri-question-line mx-1"></i><a href="#our-services" >Help</a></div>
                  </div>
             
                  {/* <div className="flex items-center space-x-4">
                    <img
                      src="https://img.freepik.com/premium-vector/cute-dog-logo-vector-sticker_622550-2401.jpg?w=826" // Replace with the actual user image path
                      alt="User"
                      className="w-12 h-12 rounded-full border-2 border-white"
                    />
                   
                  </div> */}
                </header>
    <div className="flex min-h-screen">
      {/* Left Side: Register Form */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-white text-black">
        {/* <div className="w-full text-3xl font-semibold text-center mb-4">
          <h3>Welcome to </h3>
          <h3>Pawpals</h3>
        </div> */}

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
              className="w-full px-4 py-2 font-bold text-white bg-[#FFBD5C] rounded-md hover:bg-[#E7EEF8]"
            >
              Register
            </button>
          </form>
          <p className="text-center text-sm">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-medium text-[#FFBD5C] underline hover:text-[#E7EEF8]"
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
