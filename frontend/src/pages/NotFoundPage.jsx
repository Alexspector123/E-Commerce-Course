import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { GoHome } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa6";
import { LuRefreshCcw } from "react-icons/lu";

const NotFoundPage = () => {

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 
                    flex flex-col">
            <div className="flex-1 flex items-center justify-center 
                      px-4 sm:px-6 lg:px-8 py-12">
                <div className="w-full">
                    <div className="text-center 
                          mb-12">

                        <div className={`relative 
                             mb-8 
                             transition-all duration-1000`}>
                            <div className="relative">
                                <h1 className="text-8xl sm:text-9xl font-bold text-transparent 
                               bg-clip-text bg-gradient-to-r from-green-500 to-green-700 mb-4">
                                    404
                                </h1>
                                <div className="absolute inset-0 translate-x-2 translate-y-2
                                text-8xl sm:text-9xl font-bold text-green-100 
                                -z-10">
                                    404
                                </div>
                            </div>
                            <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
                            <div className="absolute -top-8 -right-8 w-6 h-6 bg-pink-400 rounded-full animate-pulse"></div>
                            <div className="absolute -bottom-4 left-1/4 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                        </div>

                        <div className='max-w-3xl mx-auto'>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 
                             mb-4">
                                Oops! Page Not Found
                            </h2>
                            <p className="text-lg text-gray-600 
                            mb-8 max-w-2xl mx-auto">
                                The page you're looking for seems to have gone on a learning adventure of its own.
                                Don't worry, we'll help you find your way back to amazing courses!
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center 
                              mb-12">
                                <Link
                                    to="/"
                                    className="
                                        flex items-center gap-2 
                                      bg-green-500 hover:bg-green-600 
                                      text-white font-medium
                                        px-6 py-3 
                                        rounded-lg shadow-md hover:shadow-lg
                                        transition duration-300
                                        cursor-pointer">
                                    <GoHome className="w-5 h-5" />
                                    Go Home
                                </Link>
                                <button
                                    onClick={handleRefresh}
                                    className="
                                        flex items-center gap-2 
                                        bg-gray-100 hover:bg-gray-200 
                                        text-gray-700 font-medium
                                        px-6 py-3 
                                        rounded-lg
                                        transition duration-300
                                        cursor-pointer"
                                >
                                    <LuRefreshCcw className="w-5 h-5" />
                                    Refresh Page
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;