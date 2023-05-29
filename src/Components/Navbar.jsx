import React from 'react'
import { AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
    return (
        <nav className='bg-gray-300/60 flex justify-center p-4 gap-2'>

            <input type="text" name="search" className='w-[422px] p-2 outline-none rounded-lg border-2 border-black/30' placeholder='What are you looking for'/> 
            
            <button className="bg-green-500 px-5 text-white flex gap-2 items-center font-semibold rounded-lg"><AiOutlineSearch size={20} /> Search</button>
            
        </nav>
  )
}

export default Navbar