import React from 'react'

const Footer = () => {
    return (
        <div className='bg-gray-500 w-full
                         text-white'>
            <div className='h-auto px-12 pt-6
                            border-b-1 border-white'>
                <div className='inline-flex'>
                    <div>
                        <h3 className='my-4
                                font-medium text-xl'>About</h3>
                        <ul className='text-base
                                       mb-6 sm:mr-4'>
                            <li className='hover:underline'><a href="">About us</a></li>
                            <li className='hover:underline'><a href="">Careers</a></li>
                            <li className='hover:underline'><a href="">Contact us</a></li>
                            <li className='hover:underline'><a href="">Blog</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='h-16 px-12 flex items-center border-t border-white'>
                <p className='text-sm text-center'>© 2025 ITUL. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer