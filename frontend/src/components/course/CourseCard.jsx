import React from 'react'
import { Link } from 'react-router-dom';

import { FaRegStar } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { FaRegClock } from "react-icons/fa6";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

import { useFavorite } from "../../hooks/useFavorite";

const CourseCard = ({ course }) => {
    const { id, image, level, rating, title, instructor, students, duration } = course;

    const { favorite, addFavorite } = useFavorite();

    return (
        <div key={id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
            <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <div className="text-center text-4xl text-green-500
                                mb-2">
                    {image}
                </div>
            </div>
            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        {level}
                    </span>
                    <div className='flex items-center gap-2'>
                        <button
                            onClick={() => addFavorite(id)}>
                            {favorite.includes(id) ? (
                                <FaHeart className="w-4 h-4 text-red-400" />
                            ) : (
                                <FaRegHeart className="w-4 h-4 text-red-400" />
                            )}
                        </button>
                        <div className="flex items-center">
                            <FaRegStar className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">{rating}</span>
                        </div>
                    </div>
                </div>
                <div className='line-clamp-2 h-13'>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">by {instructor}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                        <GrGroup className="w-4 h-4 mr-1" />
                        {typeof students === 'number' ? students.toLocaleString() : '0'}
                    </div>
                    <div className="flex items-center">
                        <FaRegClock className="w-4 h-4 mr-1" />
                        {duration}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-xl font-bold text-gray-900">${course.price}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">${course.originalPrice}</span>
                    </div>
                    <Link
                        to={`/courses/${id}`}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm">
                        Enroll Now
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CourseCard