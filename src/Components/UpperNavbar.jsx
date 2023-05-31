import React, { useContext, useEffect, useState } from 'react'
import tatvasoftlogo from '../assets/Tatvasoft-Logo.jpg'
import { Link } from 'react-router-dom'
import { HiShoppingCart } from "react-icons/hi";
import Contextpage from '../ContextPage';

const UpperNavbar = () => {

    const { user, products } = useContext(Contextpage)

    return (
        <>
            {/* top bar */}
            <div className="text-center p-[3px] bg-[#f14D54] text-white">
                Get <span className="text-black font-bold bg-slate-300 p-[2px] rounded-lg">20% Off</span> on your First order
            </div>

            <div className="flex justify-between items-center px-[40px]">
                <Link to="/">
                    <img src={tatvasoftlogo} alt="Logo" className="h-[100px]" />
                </Link>

                {/* navbar */}

                <div className="flex text-black  gap-2">
                    {!user ?
                        <>
                            <Link to="/login" className='authbtn'>Login</Link>
                            <hr className='w-[2px] bg-red-500 h-8' />
                            <Link to="/register" className='authbtn'>Register</Link>
                        </> :
                        <>
                            <Link to="/updateprofile" className='authbtn'>Update Profile</Link>
                            {user.roleId == 2 ?
                                <>
                                    <hr className='w-[2px] bg-red-500 h-8' />
                                    <Link to="/books" className='authbtn'>Books</Link>
                                </> :
                                user.roleId == 1 ?
                                    <>
                                        <hr className='w-[2px] bg-red-500 h-8' />
                                        <Link to="/books" className='authbtn'>Books</Link>
                                        <hr className='w-[2px] bg-red-500 h-8' />
                                        <Link to="/category" className='authbtn'>Category</Link>
                                    </>
                                    : null}
                        </>
                    }

                    {/* cart */}
                    <Link to="/cart" className='authbtn cart'>
                        <HiShoppingCart color='red' size={20} />
                        <h4>{products.length}</h4>
                        <h4>Cart</h4>
                    </Link>

                    <div className={`${user ? 'visible' : 'invisible'} flex items-center font-semibold`}>
                        <h1 className='bg-blue-200 px-2 py-1'>{user ? user.firstName + " " + user.lastName : null}</h1>

                        <div className='bg-red-300/60 mx-2 px-2 py-1 hover:text-white hover:bg-red-400 border-2 border-red-600 rounded-lg cursor-pointer' onClick={() => localStorage.removeItem("user")}>Logout</div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default UpperNavbar