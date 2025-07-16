import React from 'react'
import { Link } from 'react-router-dom';

import { BsCart3 } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { RxAvatar } from "react-icons/rx"
import { FaBars } from "react-icons/fa6";

import Name from './Name';
import SearchInput from './search/SearchInput';
import { useCart } from '../context/CartContext';

const Navbar = ({ showSidebar, sidebar }) => {
    const navigate = useNavigate();
    const { cartItems } = useCart();

    return (
        <div className='
                        w-full'>
            <div className='w-full
                        px-10 py-5
                        flex justify-between
                        '>
                <div className='flex justify-between items-center md:gap-3 w-full md:w-auto md:justify-normal'>
                    <div className="flex items-center text-xl md:hidden">
                        {!sidebar && (
                            <div>
                                <FaBars className='transition-all duration-200 cursor-pointer'  onClick={showSidebar} />
                            </div>
                        )}
                        <div className='ml-4'>
                            <Name />
                        </div>
                    </div>
                    <div className='hidden md:block mr-4'>
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
                    <div className="relative">
                        <button 
                            onClick={() => navigate('/cart')}
                            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Shopping Cart"
                        >
                            <BsCart3 className='w-5 h-5 md:w-6 md:h-6 hover:text-green-500 transition duration-400' />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {cartItems.length}
                                </span>
                            )}
                        </button>
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
