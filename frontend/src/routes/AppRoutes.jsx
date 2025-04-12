import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

import UserRegister from '../screens/UserRegister'

import DogwalkerRegister from '../screens/DogwalkerRegister'
import UserHome from '../screens/UserHome'
import DogwalkerHome from '../screens/DogwalkerHome'
import Inbox from '../screens/inbox'
import UserLogin2 from '../screens/UserLogin2'
import DogwalkerLogin2 from '../screens/DogwalkerLogin2'

const AppRoutes = () => {
    return (
        <BrowserRouter>

            <Routes>
               
                <Route path="/register" element={<UserRegister />} />
                
          
                <Route path="/dogwalker-register" element={<DogwalkerRegister />} />
                <Route path="/home" element={<UserHome />} />
                <Route path="/dogwalker-home" element={<DogwalkerHome />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/login" element={<UserLogin2 />} />
                <Route path="/dogwalker-login" element={<DogwalkerLogin2 />} />
            </Routes>

        </BrowserRouter>
    )
}

export default AppRoutes