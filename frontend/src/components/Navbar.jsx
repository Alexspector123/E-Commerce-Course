import React from 'react'

import Name from './Name';

import SearchInput from './search/SearchInput';

const Navbar = () => {
  return (
    <div className='absolute
                    w-full'>
        <div className='w-full
                        px-10 py-5
                        flex justify-between
                        '>
            <div className='flex'>
                <div className='mr-4'>
                    <Name />
                </div>
                <div>
                    <SearchInput />
                </div>
            </div>
            <div>
                <button className=' hidden lg:inline
                                    text-base font-medium text-green-400 hover:text-white
                                    border-2 rounded-md
                                    hover:bg-green-400 active:bg-green-700
                                    px-4 py-1.5
                                    cursor-pointer
                                    transition duration-400'>
                    Log in
                </button>
                <button className=' hidden lg:inline
                                    ml-5
                                    text-base font-medium text-white
                                    border-2 rounded-md
                                    bg-green-400 hover:bg-green-600 active:bg-green-700
                                    px-4 py-2
                                    cursor-pointer
                                    transition duration-300'>
                    Sign up
                </button>
            </div>
        </div>
    </div>
  )
}

export default Navbar;
