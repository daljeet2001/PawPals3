import React, { useState } from 'react';
import LiveTracking from '../components/LiveTracking';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope, faPaw} from '@fortawesome/free-solid-svg-icons'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import axios from 'axios';

import Badge from '@mui/material/Badge';


const UserHome = () => {
  const [filters, setFilters] = useState({
    location: '',
    service: 'Dog walking',
    startDate: '',
    endDate: '',
    walkersPerDay: '',
    timeNeeded: '',
  });


  const [filterdogwalkers,setFilterDogWalkers] = useState([]);
 
  const [value, setValue] = React.useState([100, 1000]);

  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };
  function valuetext(value) {
    return `₹${value}`; // for aria
  }
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleRateChange = (e) => {
    setFilters({ ...filters, ratePerWalk: e.target.value });
  };

 
  const handleSubmit = async(e) => {
    e.preventDefault();
   
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/dogwalker/filter`, {
      hourlyRatelow: value[0],
      hourlyRatehigh: value[1],
      });
      console.log('Filtered Dog Walkers:', response.data);
      setFilterDogWalkers(response.data);
    } catch (error) {
      console.error('Error fetching filtered dog walkers:', error);
    }
    
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

      {/* Main Content */}
      <div className="flex flex-grow mt-1">
        {/* Left Section: Filter Form */}
        <div className="w-1/4 flex flex-col items-center justify-center bg-white text-black mr-1 h-screen sticky top-0">
          <div className="max-w-md bg-white p-6 rounded-lg h-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Choose your pet walker</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Location:</label>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleChange}
                  placeholder="e.g., New York"
                  className="w-full px-3 py-2 border border-grey rounded-md hover:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Service:</label>
                <select
                  name="service"
                  value={filters.service || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-grey rounded-md hover:border-black"
                >
                  <option value="Dog walking">Dog walking</option>
                  <option value="Doggy day care">Doggy day care</option>
                  <option value="Home visits">Home visits</option>
                  <option value="Dog boarding">Dog boarding</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Walkers per day:</label>
                <select
                  name="walkersPerDay"
                  value={filters.walkersPerDay || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-grey rounded-md hover:border-black"
                >
                  <option value="" disabled>Select an option</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3+">3+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Start Date:</label>
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-grey rounded-md hover:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date:</label>
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-grey rounded-md hover:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time needed:</label>
                <select
                  name="timeNeeded"
                  value={filters.timeNeeded || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-grey rounded-md hover:border-black"
                >
                  <option value="" disabled>Select a time</option>
                  <option value="6am to 11am">6am to 11am</option>
                  <option value="11am to 3pm">11am to 3pm</option>
                  <option value="3pm to 10pm">3pm to 10pm</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Rate per walk</label>
                <Box sx={{ width: 300 }}>
     

      {/* Dynamic min/max display */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ minWidth: 50 }}>₹{value[0]}</Typography>

        <Slider
          value={value}
          onChange={handleChange2}
          valueLabelDisplay="auto"
          valueLabelFormat={(val) => `₹${val}`}
          min={100}
          max={1000}
          step={50}
          sx={{
            color: 'black',
            height: 10,
            flexGrow: 1,
            mx: 1,
            '& .MuiSlider-thumb': {
              backgroundColor: 'white',
              border: '2px solid #9e9e9e',
              '&:hover, &.Mui-focusVisible, &.Mui-active': {
                boxShadow: '0px 0px 0px 8px rgba(0, 0, 0, 0.16)',
              },
            },
            '& .MuiSlider-track': {
              backgroundColor: 'black',
            },
            '& .MuiSlider-rail': {
              backgroundColor: '#bdbdbd',
            },
          }}
        />
&nbsp;&nbsp;
        <Typography sx={{ minWidth: 50 }}>₹{value[1]}</Typography>
      </Box>
    </Box>
             




          
                
              </div>
              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Center Section: List of Pet Walkers */}
        <div className="w-3/6 flex flex-col justify-start bg-white p-4 mr-1 overflow-y-auto">
          <h2 className="text-2xl font-medium">  <i class="ri-map-pin-line mr-1"></i>Sitters in your area</h2>
          <div className="flex"><h4 className="text-gray-500 mr-1">You're seeing sitters available on</h4> <p className="text-gray-800 font-medium">Apr 10</p></div>
          <div className="w-full space-y-4">
            {filterdogwalkers.map((walker, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-md border-t border-gray-300 mt-4">
                {/* Top row: Profile picture + Name on left, Rate on right */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <img
                      src={walker.image || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <h3 className="text-lg font-semibold">{walker.name}</h3>
                  </div>
                  <div>
                    <span>from</span>
                    <p className="text-right font-semibold text-green-600">₹{walker.hourlyRate} / walk</p>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="mt-3 text-sm text-gray-700">
                  <p><strong>Email:</strong> {walker.email}</p>
                  <p><strong>Phone:</strong> {walker.phone}</p>
                  <p><strong>Location:</strong> {walker.location || "Chandigarh"}</p>
                </div>

                {/* Reviews */}
                <div className="mt-3">
                  <p className="text-sm text-yellow-500">⭐️⭐️⭐️⭐️☆ ({walker.rating || "N/A"})</p>
                  <p className="text-xs text-gray-500">{walker.review || "No reviews available."}</p>
                </div>

                {/* Description */}
                <div className="mt-3 text-sm text-gray-800">
                  <p>{walker.description || "No description available."}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: LiveTracking */}
        <div className="w-1/4 flex items-center justify-center bg-white h-screen sticky top-0">
          <LiveTracking />
        </div>
      </div>
    </div>
  );
};

export default UserHome;
