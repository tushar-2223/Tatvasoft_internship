import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import Contextpage from '../ContextPage';
import axios from 'axios';
import { HiMenuAlt1 } from 'react-icons/hi';

const Navbar = () => {
    // const [searchbar,setSearchbar] = useState([])
    
    // console.log(searchbar)

    // const SearchBar = () => {
    //     var config = {
    //         method: 'get',
    //         maxBodyLength: Infinity,
    //         url: `https://book-e-sell-node-api.vercel.app/api/book/search?keyword=${searchbar}`,
    //         headers: {"Content-Type": "application/json"}
    //     };

    //     axios(config)
    //         .then(function (response) {
    //             // console.log(response.data.result);
    //             setSearchbar(response.data.result)
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }

    // useEffect(() => {
    //     SearchBar();
    // },[searchbar])

    return (
        <>
        <nav className='bg-gray-300/60 flex justify-center p-4 gap-2'>
            <input type="text" name="search" className='w-[422px] p-2 outline-none rounded-lg border-2 border-black/30' placeholder='What are you looking for' onChange={(e) => setSearchbar(e.target.value)}/>

            <button className="bg-green-500 px-5 text-white flex gap-2 items-center font-semibold rounded-lg"><AiOutlineSearch size={20} /> Search</button>
        </nav>
        </>
    )
}

export default Navbar