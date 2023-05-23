import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
    return (
        <nav>
            <input type="text" name="search" className='search rounded-lg' placeholder='What are you looking for'/> 
            
            <button className="bg-green-500 px-5 text-white flex gap-2 items-center font-bold rounded-lg"><AiOutlineSearch size={20} /> Search</button>
            
            <button className="bg-red-500 px-5 text-white flex gap-2 items-center font-bold rounded-lg"> Cancel</button>
            
        </nav>
  )
}

export default Navbar