import React, { useState, useContext, useEffect } from 'react';
import LiveTracking from '../components/LiveTracking';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPaw } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { UserDataContext } from '../context/User.Context';
import Badge from '@mui/material/Badge';
import { SocketContext } from '../context/SocketContext';

const UserHome = () => {
  const [filters, setFilters] = useState({
    location: '',
    service: 'Dog walking',
    startDate: '',
    endDate: '',
    walkersPerDay: '',
    timeNeeded: '',
  });
  const { User } = useContext(UserDataContext);
  // console.log(User);
  const { socket } = useContext(SocketContext);

  const [filterdogwalkers, setFilterDogWalkers] = useState([]);
  const [value, setValue] = useState([100, 1000]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  const [addresses, setAddresses] = useState({});

 

useEffect(() => {
  const fetchAddresses = async () => {
    const newAddresses = {};
    for (let walker of filterdogwalkers) {
      const address = await getAddressFromCoordinates(walker.location.ltd, walker.location.lng);
      newAddresses[walker._id] = address;
    }
    setAddresses(newAddresses);
  };
  fetchAddresses();
}, [filterdogwalkers]);

  useEffect(() => {
    socket.emit('join', {
      userId: User._id,
      userType: 'user',
    });
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit('update-location-user', {
            userId: User._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
  }, []);

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

  const fetchSuggestions = async (input) => {
    try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggestions`, {
      params: { input },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    // console.log("response.data.suggestions", response.data);
      setLocationSuggestions(response.data || []);
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
    }
  };

  const handleLocationChange = (e) => {
    const { value } = e.target;
    setFilters({ ...filters, location: value });
    if (value.length >= 3) {
      fetchSuggestions(value);
    } else {
      setLocationSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setFilters({ ...filters, location: suggestion });
    setLocationSuggestions([]);
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-address`, {
        params: { ltd: latitude, lng: longitude },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
       console.log('Address:', response.data.address);
      return response.data.address;
    } catch (error) {
      console.error('Error fetching address:', error);
      return null;
    }
  };

  function getDateRangeStrings(startDate, endDate) {
    const dates = [];
    let current = new Date(startDate);
    const end = new Date(endDate);

    while (current <= end) {
        const day = String(current.getDate()).padStart(2, '0');
        const month = String(current.getMonth() + 1).padStart(2, '0');
        dates.push(`${day}/${month}`);
        current.setDate(current.getDate() + 1);
    }

    return dates;
}


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response1 = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-coordinates`, {
        params: { address: filters.location },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Coordinates:', response1.data);

      const response2 = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-dogwalkers-in-radius`, {
        params: {
          ltd: response1.data.ltd,
          lng: response1.data.lng,
          radius: 20, // Example radius in km
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Dog Walkers in Radius:', response2.data);

      const dateRange = getDateRangeStrings(filters.startDate, filters.endDate);
      // console.log('Date Range:', dateRange);

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/dogwalker/filter`, {
        NearbyWalkers: response2.data,
        dates: dateRange, // Pass dates as an array
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
          <div>
            <a href="#our-services">
              <Box sx={{ color: 'action.active' }}>
                <Badge color="primary" variant="dot">
                  <i className=" text-black ri-chat-4-line"></i>
                </Badge>
              </Box>
            </a>
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
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-grow mt-4  px-6 space-x-4">
        {/* Left Section */}
        <div className="w-1/4 flex flex-col space-y-4 mx-4">
          {/* Section: Filter Form */}
                <div className="max-w-md bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Choose your pet walker</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Location:</label>
                  <input
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleLocationChange}
                    placeholder="e.g., New York"
                    className="w-full px-3 py-2 border border-grey rounded-md hover:border-black"
                  />
                  {locationSuggestions.length > 0 && (
                    <ul className="border border-gray-300 rounded-md mt-2 bg-white max-h-40 overflow-hidden">
                    {locationSuggestions.map((suggestion, index) => (
                      <li
                      key={index}
                      onClick={() => handleSuggestionSelect(suggestion)}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                      {suggestion}
                      </li>
                    ))}
                    </ul>
                  )}
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
                    <option value="" disabled>
                    Select an option
                    </option>
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
                    <option value="" disabled>
                    Select a time
                    </option>
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

          {/* Profile Section */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-medium mb-4">Account Info</h2>
            <div className="flex items-center space-x-4 ml-2">
              <img
                className="w-16 h-16 rounded-full object-cover"
                src={User.profileImage}
                alt="Profile"
              />
              <div className="flex flex-col ml-2">
                <p className="text-base font-semibold">{User.username}</p>
                <a href="#edit profile" className="text-sm mt-1 opacity-50 hover:underline">
                  Edit Profile
                </a>
                <a href="#edit profile" className="text-sm opacity-50 hover:underline">
                  View Profile
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Center Section: List of Pet Walkers */}
        <div className="w-2/4 flex flex-col justify-start bg-white p-4 rounded-lg shadow-md space-y-4 overflow-y-auto">
          <h2 className="text-2xl font-medium">
            <i className="ri-map-pin-line mr-1"></i>Sitters in your area
          </h2>
          <div className="flex">
            <h4 className="text-gray-500 mr-1">You're seeing sitters available on</h4>{' '}
            <p className="text-gray-800 font-medium">{filters.startDate}</p>
          </div>
          <div className="w-full space-y-4">
            {filterdogwalkers.map((walker, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow-md border-t border-gray-300 mt-4"
              >
                {/* Top row: Profile picture + Name on left, Rate on right */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <img
                      src={walker.image || 'https://via.placeholder.com/150'}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <h3 className="text-lg font-semibold">{walker.name}</h3>
                  </div>
                  <div>
                    <span>from</span>
                    <p className="text-right font-semibold text-green-600">
                      ₹{walker.hourlyRate} / walk
                    </p>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="mt-3 text-sm text-gray-700">
                  <p>
                    <strong>Email:</strong> {walker.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {walker.phone}
                  </p>
                  <p>
                    <strong>Location:</strong> {addresses[walker._id] || 'Loading...'}
                  </p>
                </div>

                {/* Reviews */}
                <div className="mt-3">
                  <p className="text-sm text-yellow-500">
                    ⭐️⭐️⭐️⭐️☆ ({walker.rating || 'N/A'})
                  </p>
                  <p className="text-xs text-gray-500">
                    {walker.review || 'No reviews available.'}
                  </p>
                </div>

                {/* Description */}
                <div className="mt-3 text-sm text-gray-800">
                  <p>{walker.description || 'No description available.'}</p>
                </div>

                {/* Send Request Button */}
                <div className="mt-4">
                  <button
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    onClick={() => {
                      socket.emit('new-request', {
                        user: {
                          id: User._id,
                          name: User.username,
                          profileImage: User.profileImage,
                        },
                        filters: {
                          location: filters.location,
                          service: filters.service,
                          startDate: filters.startDate,
                          endDate: filters.endDate,
                          timeNeeded: filters.timeNeeded,
                          rateRange: value,
                        },
                        dogwalkerId: walker._id,
                      
                      });
                      console.log(`Request sent to ${walker.name}`);
                    }}
                  >
                    Send Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: LiveTracking */}
        <div className="w-1/4 flex items-center justify-center bg-white h-screen sticky top-0 rounded-lg shadow-md  space-y-4 ">
          <LiveTracking filterdogwalkers={filterdogwalkers} /> 
        </div>
      </div>
    </div>
  );
};

export default UserHome;
