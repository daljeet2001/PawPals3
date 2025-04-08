import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,faPaw,faStar,faBell} from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';

const DogwalkerHome = () => {
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
      <div className="flex flex-grow mt-4 px-6 space-x-4 ">
        {/* Left Section */}
        <div className="w-1/4 flex flex-col space-y-4 mx-4">
          {/* /* Profile Section */ }
                <div className="bg-white p-4 rounded-lg shadow-md">
              
                <div className="flex items-center space-x-4 ml-2">
                  <img
                  className="w-16 h-16 rounded-full object-cover"
                  src="https://c8.alamy.com/comp/AC0371/a-nihang-sikh-in-punjab-AC0371.jpg"
                  alt="Profile"
                  />
                  <div className="flex flex-col ml-2">
                  <p className="text-base font-semibold">Daljeet Singh</p>
                  <a href="#edit profile" className="text-sm mt-1 opacity-50 hover:underline">Edit Profile</a>
                  <a href="#edit profile" className="text-sm opacity-50 hover:underline">View Profile</a>
                  </div>
                </div>

              
                </div>

                {/* /* Pawpals Balance Section */ }
                      <div className="bg-white p-4 rounded-lg shadow-md">
                      <h2 className="text-xl font-bold mb-4">Pawpals Balance</h2>
                      <div className="flex ">
                     <div className="flex-1 flex flex-col items-center justify-center border-r border-gray-300 pr-4"> 
                      <p className="text-2xl font-bold text-black-600">₹12,500</p>
                      <p className="text-xs text-gray-500">REDEEMABLE</p>
                      <a href="#edit profile" className="text-sm text-green-500 hover:underline">Withdraw Money</a>
                      </div>

                      <div className="flex-1 flex flex-col items-center justify-center border-r border-gray-300 px-4">
                      <p className="text-2xl font-bold text-black-600">₹19,000</p>
                      <p className="text-xs text-gray-500">TOTAL</p>
                      <a href="#edit profile" className="text-sm opacity-50 hover:underline">Apply Promo Code</a>
                      </div>
                      </div>

                     
                      <button className="w-full mt-2 px-4 py-2 font-medium text-black rounded-md bg-[#F3F4F6] hover:bg-white ">Pending ₹15,00.00
                      
                      </button>

                      <button className="w-full mt-2 px-4 py-2 font-medium text-black rounded-md border border-gray-300">
                        View Payments & Promo Codes
                      </button>
                      </div>

                      {/* services Section  */}
                      <div className="bg-white p-4 rounded-lg shadow-md">
                      <h2 className="text-2xl font-bold mb-2">Services</h2>
                      <div className="flex flex-col space-y-2">
                      <div className="flex-1 flex  items-center justify-between ">
                        <div>
                          <h3 className="text-lg font-semibold">House Sitting</h3>
                          <p className="text-xs text-gray-500 -mt-1">in your home</p>
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-black-600" >₹450</h2>
                          <p className="text-xs text-gray-500 -mt-1">per night</p>
                        </div>
                        </div>
                      
                      <div className="flex-1 flex  items-center justify-between ">
                        <div>
                          <h3 className="text-lg font-semibold">Drop-In Visits</h3>
                          <p className="text-xs text-gray-500 -mt-1">visits in your home</p>
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-black-600" >₹500</h2>
                          <p className="text-xs text-gray-500 -mt-1">per visit</p>
                        </div>
                        </div>
                       
                      <div className="flex-1 flex  items-center justify-between ">
                        <div>
                          <h3 className="text-lg font-semibold">Dog Walking</h3>
                          <p className="text-xs text-gray-500 -mt-1">in your neighborhood</p>
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-black-600" >₹200</h2>
                          <p className="text-xs text-gray-500 -mt-1">per walk</p>
                        </div>
                        </div>

                 

                     
                      </div>

                      <div className="flex flex-col items-center justify-center mt-2">
                      <a href="#services" className="text-blue-500 font-semibold">See Additional Services & Rates</a>
                      <p className="text-xs text-gray-500 -mt-1">Cat care,pick-up & drop-off,bathing/</p>
                      <p className="text-xs text-gray-500 -mt-1">grooming</p>

                      </div>
                     
 
                     
                     
                      </div>

                      {/* Reviews Section */}
                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-2">Reviews</h2>
                        <div className="flex flex-col space-y-4">
                          {[
                            {
                              reviewer: "John Doe",
                              comment: "Amazing service! Highly recommend.",
                              stars: 5,
                              profilePhoto: "https://i.pravatar.cc/40?img=1",
                            },
                            {
                              reviewer: "Jane Smith",
                              comment: "Very professional and caring.",
                              stars: 4,
                              profilePhoto: "https://i.pravatar.cc/40?img=2",
                            },
                          ].map((review, index) => (
                            <div key={index} className="flex items-start space-x-4">
                              <img
                                className="w-10 h-10 rounded-full object-cover"
                                src={review.profilePhoto}
                                alt={`${review.reviewer}'s profile`}
                              />
                              <div>
                                <p className="text-sm font-semibold">{review.reviewer}</p>
                                <div className="flex items-center space-x-1">
                                  {Array.from({ length: review.stars }).map((_, i) => (
                                    <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500 text-xs" />
                                  ))}
                                </div>
                                <p className="text-xs text-gray-500">{review.comment}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-center mt-2">
                          <a href="#all-reviews" className="text-blue-500 font-semibold hover:underline">
                            Show All Reviews
                          </a>
                        </div>
                      </div>

                    </div>

                    {/* Right Section */}
        <div className="w-3/4 flex flex-col space-y-4">
          {/* Availability Calendar Section */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">Your availability for the next month</h2>
            <p className="font-normal opacity-50">Want more requests that are right for you?</p>
            <p className="font-normal mb-2 opacity-50">Confirm your availability to highlight your profile in seacrh results.Deselect any days you're not available</p>
            <div className="grid grid-cols-8 gap-2">
              {Array.from({ length: 30 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i);
                const day = date.toLocaleDateString('en-US', { weekday: 'short' });
                const dayNum = String(date.getDate()).padStart(2, '0');       // e.g., '08'
                const monthNum = String(date.getMonth() + 1).padStart(2, '0'); // e.g., '04'
                const dateNum = `${dayNum}/${monthNum}`;                       // '08/04'
                

                return (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center w-18 h-18 border border-gray-300 rounded-md hover:bg-gray-200 cursor-pointer"
                  >
                    <span className="text-sm font-medium opaciy-50">{day}</span>
                    <span className="text-lg font-bold">{dateNum}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-row-reverse">
            <button className=" mt-2 px-4 py-2 font-medium text-black rounded-md bg-[#F3F4F6] hover:bg-white ml-1 ">
            <FontAwesomeIcon icon={faCheck}/>Confirm Availability
                      </button>
                      </div>
          </div>

          {/* Upcoming Bookings Section */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">Upcoming Bookings</h2>
            <p className="font-normal opacity-50 mb-4">Here are your upcoming bookings for the next week:</p>
            <div className="flex flex-col space-y-4">
              {[
                { date: "12/04", time: "10:00 AM", service: "Dog Walking", client: "Daljeet Singh" },
                { date: "13/04", time: "02:00 PM", service: "House Sitting", client: "Taranjeet Singh" },
                { date: "14/04", time: "09:00 AM", service: "Drop-In Visit", client: "Simran Singh" },
              ].map((booking, index) => (
                <div
                  key={index}
                  className="flex flex-col p-3 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">{booking.service}</p>
                      <p className="text-xs text-gray-500">{booking.client}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{booking.date}</p>
                      <p className="text-xs text-gray-500">{booking.time}</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-2 space-x-2">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600">
                      Accept
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
                      Completed
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default DogwalkerHome;
