import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import Contextpage from '../ContextPage';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { setLoading,AddCart,user} = useContext(Contextpage);

    const [searchbar, setSearchbar] = useState('');
    const [searchvalue, setSearchValue] = useState([]);

    const handleClick = () => {
        if (user) {
            setLoading(true)
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `https://book-e-sell-node-api.vercel.app/api/book/search?keyword=${searchbar}`,
                headers: { "Content-Type": "application/json" }
            };

            axios(config)
                .then(function (response) {
                    setSearchValue(response.data.result);
                    setLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            setSearchbar('')
            toast.warning('The Search is operational when a user is authenticated.')
        }
    }

    useEffect(() => {
        if (searchbar == '') {
            return
        } else {
            handleClick();
            document.body.addEventListener('click', () => setSearchbar(''))
        }
    },[searchbar])

    return (
        <>
            <nav className='bg-gray-300/60 flex justify-center p-4 gap-2'>

                <input type="text" name="search" className='w-[422px] p-2 outline-none rounded-lg border-2 border-black/30' placeholder='What are you looking for' onChange={(e) => setSearchbar(e.target.value)} value={searchbar} autoComplete='off'/>

                {/* <button className="bg-green-500 px-5 text-white flex gap-2 items-center font-semibold rounded-lg" onClick={handleClick}><AiOutlineSearch size={20} /> Search</button> */}

                <div className={`${searchbar == "" ? "invisible" : "visible"} absolute h-80 w-[40rem] mt-20 bg-white border-2 rounded-xl z-60 overflow-x-hidden overflow-y-auto `}>                    
                    {searchvalue.map((value) => (
                        <div key={value.id} onClick={() => AddCart(value.id)}>
                            <div className="rounded-xl p-2 hover:bg-blue-50 flex justify-between px-4 cursor-pointer">
                                <h1>{value.name}</h1>
                                <h1>Rs. {value.price}</h1>                            
                        </div>
                        <hr />
                        </div>
                    )
                    )}
                </div>
            </nav>

        </>
    )
}

export default Navbar