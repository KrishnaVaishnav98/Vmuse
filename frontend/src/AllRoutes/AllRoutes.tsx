import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Homepage } from '../pages/Homepage'
import { Login } from '../pages/Login'
import { Signup } from '../pages/Signup'

export const AllRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<Homepage />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
        </Routes>
    )
}
