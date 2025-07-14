import React, { useState } from 'react'

import Name from './Name';

import SearchInput from './search/SearchInput';
import { FiShoppingBag } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const [isOpenSearchMobile, setIsOpenSearchMobile] = useState(false);

    return (
        <div className='
                        w-full'>
            <div className='w-full
                        px-10 py-5
                        flex justify-between
                        '>
                <div className='flex justify-between w-full md:w-auto md:justify-normal'>
                    <div className='mr-4'>
                        <Name />
                    </div>
                    <div>
                        <SearchInput />
                    </div>
                </div>
                <div className='flex flex-row items-center gap-4'>
                    <div className='hidden lg:block'>
                        <button onClick={() => navigate('/auth')}
                            className='
                                    text-base font-medium text-green-400 hover:text-white
                                    border-2 rounded-md
                                    hover:bg-green-400 active:bg-green-700
                                    px-4 py-1.5
                                    cursor-pointer
                                    transition duration-400'>
                            Log in
                        </button>
                    </div>
                    <div>
                        <FiShoppingBag className='text-2xl'/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Navbar;
