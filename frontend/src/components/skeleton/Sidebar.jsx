import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";

import { SideBarData } from './SidebarData';

const SideBar = ({ closeSidebar }) => {
    return (
        <div>
            <div className='
                    z-50
                    flex 
                    bg-white
                    w-60
                    fixed 
                    h-full
                    scrollbar-hide 
                    overflow-y-auto'>
                <div className='bg-white w-80'>
                    <div
                        className='
                    flex justify-end
                    p-3
                    bg-white'>
                        <div
                            className='
                        p-1
                        rounded-xl
                        cursor-pointer
                        hover:bg-gray-300
                        transition duration-300'>
                            <IoMdClose
                                className='w-5 h-5'
                                onClick={closeSidebar}
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <NavLink
                            to="/auth"
                            onClick={closeSidebar}
                            className='
                        border-3 border-green-500 hover:bg-green-500
                        text-green-500 hover:text-white
                        flex justify-center items-center 
                        px-2.5 py-1
                        rounded-md
                        transition-all duration-300'>
                            <div className={`font-medium text-[18px] `}>Log in</div>
                        </NavLink>
                    </div>
                    {
                        SideBarData.map((item, index) => (
                            item.type === 'title' ? (
                                <div className='mt-5 border-t border-gray-400'>
                                    <div
                                        key={index}
                                        className='flex items-center px-3.5 py-3 gap-[15px]'>
                                        <div className='text-[17px] font-bold'>{item.name}</div>
                                    </div>
                                </div>
                            ) : (
                                <NavLink
                                    to={item.path}
                                    onClick={closeSidebar}
                                    key={index}
                                    end
                                    className={` flex items-center px-2.5 py-1 gap-[15px] hover:bg-gray-300 hover:transition-all hover:duration-300`}>
                                    <div className={`text-[17px]`}>{item.name}</div>
                                </NavLink>
                            )
                        )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default SideBar;