import React from 'react'
import { useState } from 'react'
import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";

export const Login = () => {

    const [showPass, setShowPass] = useState(false);

    const handleShowPass = () => {
        setShowPass(!showPass)
    }
    return (
        <div className='ml-40 mt-24'>
            <div className='border-2 border-inherit rounded w-96 pl-4'>
                <label htmlFor="">Email :</label>
                <input className='m-2' type="text" placeholder='Email' />
            </div>

            <div className='flex border-2 border-inherit rounded w-96 pl-4'>
                <label htmlFor="">Password :</label>
                <input className='m-2' type={showPass ? "text" : "password"} placeholder='Password' />
                {
                    showPass ?
                        <AiTwotoneEyeInvisible onClick={handleShowPass} />
                        : <AiTwotoneEye onClick={handleShowPass} />
                }

            </div>
        </div>
    )
}
