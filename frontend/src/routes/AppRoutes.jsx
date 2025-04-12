import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import UserLogin from '../screens/UserLogin'
import UserRegister from '../screens/UserRegister'
import DogwalkerLogin from '../screens/DogwalkerLogin'
import DogwalkerRegister from '../screens/DogwalkerRegister'
import UserHome from '../screens/UserHome'
import DogwalkerHome from '../screens/DogwalkerHome'
import Inbox from '../screens/inbox'


const AppRoutes = () => {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/login" element={<UserLogin />} />
                <Route path="/register" element={<UserRegister />} />
                <Route path="/dogwalker-login" element={<DogwalkerLogin />} />
                <Route path="/dogwalker-register" element={<DogwalkerRegister />} />
                <Route path="/home" element={<UserHome />} />
                <Route path="/dogwalker-home" element={<DogwalkerHome />} />
                <Route path="/inbox" element={<Inbox />} />
            </Routes>

        </BrowserRouter>
    )
}

export default AppRoutes