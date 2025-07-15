import React from 'react'
import { useParams } from 'react-router-dom';

import { FaRegStar } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { GrGroup } from "react-icons/gr";
import { AiOutlineGlobal } from "react-icons/ai";
import { FiAward } from "react-icons/fi";
import { IoPlayOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";

import courseData from '../data/CourseData';

const CoursePage = () => {

    const { id } = useParams();
    const courseId = parseInt(id);
    const course = courseData.find(c => c.id === courseId);

    if (!course) {
        return <div>Course not found</div>;
    }

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaRegStar key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<FaRegStar key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
        }
        return stars;
    };

    return (
        <div>
            <main className="mx-auto 
                             px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Course Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Course Header */}
                        <div className="bg-white">
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-shrink-0">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full sm:w-48 h-48 object-cover rounded-lg shadow-md"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                            {course.category}
                                        </span>
                                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                            {course.level}
                                        </span>
                                    </div>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                                        {course.title}
                                    </h1>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-sm text-gray-600">by</span>
                                        <span className="text-sm font-medium text-green-500 hover:text-blue-600 cursor-pointer">
                                            {course.instructor}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex items-center gap-1">
                                            <div className="flex items-center">
                                                {renderStars(course.rating)}
                                            </div>
                                            <span className="text-sm font-medium text-gray-900 ml-1">
                                                {course.rating}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                ({course.rating.toLocaleString()} reviews)
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <GrGroup className="w-4 h-4" />
                                            <span>{course.students.toLocaleString()} students</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FaRegClock className="w-4 h-4" />
                                            <span>{course.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <AiOutlineGlobal className="w-4 h-4" />
                                            <span>{course.language}</span>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <p className="text-xs text-gray-500">
                                            Last updated: {course.lastUpdated}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Course Features */}
                        <div className="bg-white rounded-xl p-6 border border-gray-300">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">What You'll Get</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <IoPlayOutline className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">{course.lesson} video lessons</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MdOutlineFileDownload className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">{course.downloadableResources} downloadable resources</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FiAward className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">Certificate of completion</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaRegClock className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">Lifetime access</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-xl p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Course Description</h2>
                            <p className="text-gray-700 leading-relaxed">
                                {course.description}
                            </p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 sticky top-8">
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-3xl font-bold text-gray-900">
                                        ${course.price}
                                    </span>
                                    <span className="text-lg text-gray-500 line-through">
                                        ${course.originalPrice}
                                    </span>
                                </div>
                                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                    {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                                </span>
                            </div>

                            <div className="space-y-3 mb-6">
                                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                                    Enroll Now
                                </button>
                                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors">
                                    Add to Cart
                                </button>
                            </div>

                            <div className="border-t pt-4">
                                <h3 className="font-semibold text-gray-900 mb-3">Course includes:</h3>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <FaRegClock className="w-4 h-4" />
                                        <span>{course.duration} on-demand video</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MdOutlineFileDownload className="w-4 h-4" />
                                        <span>{course.downloadableResources} downloadable resources</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FiAward className="w-4 h-4" />
                                        <span>Certificate of completion</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <AiOutlineGlobal className="w-4 h-4" />
                                        <span>Access on mobile and desktop</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CoursePage