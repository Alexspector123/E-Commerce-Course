import React from 'react'
import { Link } from 'react-router-dom';

import { FiShoppingBag } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { RxAvatar } from "react-icons/rx"

import Name from './Name';

import SearchInput from './search/SearchInput';

const Navbar = () => {
    const navigate = useNavigate();

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
                <div className='flex flex-row items-center gap-4
                                ml-3'>
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
                        <FiShoppingBag className='w-5 h-5 md:w-6 md:h-6
                                                  cursor-pointer
                                                  hover:text-green-500
                                                  transition duration-400' />
                    </div>
                    <Link to="/profile/edit">
                        <RxAvatar className='w-5 h-5 md:w-6 md:h-6
                                             cursor-pointer
                                             hover:text-green-500
                                              transition duration-400' />
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Navbar;
