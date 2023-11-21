import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <div className='flex justify-around no-underline'>
            <Link to={"/"} >Home</Link>
            <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>SignUp</Link>
        </div>

    )
}
