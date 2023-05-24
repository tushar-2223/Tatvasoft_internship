import React from 'react'
import tatvasoftlogo from '../assets/Tatvasoft-Logo.jpg'
import { Link } from 'react-router-dom'
import { HiShoppingCart } from "react-icons/hi";

const UpperNavbar = () => {
    return (
        <>
            {/* top bar */}
            <div className="text-center p-[3px] bg-[#f14D54] text-white">
                Get <span className="text-black font-bold bg-slate-300 p-[2px]  rounded-lg">20% Off</span> on your First order
            </div>

            <div className="flex justify-between items-center px-[40px]">
                <Link to="/">
                    <img src={tatvasoftlogo} alt="Logo" className="h-[100px]" />
                </Link>


                <div className="flex text-black bg-[#f5f5f5] gap-2">
                    <Link to="/login" className='authbtn'>Login</Link>
                    <hr />
                    <Link to="/register" className='authbtn'>Register</Link>

                    {/* cart */}
                    <Link className='authbtn cart'>
                        <HiShoppingCart color='red' size={20}/>
                        <h4>0</h4>
                        <h4>Cart</h4>
                    </Link>  
                </div>
            </div>
        </>
    )
}

export default UpperNavbar