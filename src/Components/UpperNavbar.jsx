import React from 'react'
import tatvasoftlogo from '../assets/Tatvasoft-Logo.jpg'
import { Link } from 'react-router-dom'
import { HiShoppingCart } from "react-icons/hi";
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';

const UpperNavbar = () => {
    return (
        <>
            {/* top bar */}
            <div className="topbar">
                Get <span className="heighlitetext">20% Off</span> on your First order
            </div>

            <div className="Uppernav">
                <Link to="/">
                    <img src={tatvasoftlogo} alt="Logo" className="h-[100px]" />
                </Link>


                <div className="Auth gap-2">
                    <Link to="/login" className='authbtn'>Login</Link>
                    <hr />
                    <Link to="/register" className='authbtn'>Register</Link>

                    {/* cart */}
                    <Link className='authbtn cart'>
                        <HiShoppingCart color='red' size={20}/>
                        <h4>0</h4>
                        <h4>Cart</h4>
                    </Link>

                    <Link to="/"><Avatar sx={{ bgcolor: deepOrange[500] }}>T</Avatar></Link>
                    
                </div>
            </div>
        </>
    )
}

export default UpperNavbar