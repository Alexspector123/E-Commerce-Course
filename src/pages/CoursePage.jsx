import React, { lazy, Suspense, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
const CustomSwiper = lazy(() => import('../components/CustomSwiper')); // Add lazy loading for swiper

import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { GrGroup } from "react-icons/gr";
import { AiOutlineGlobal } from "react-icons/ai";
import { FiAward } from "react-icons/fi";
import { IoPlayOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { BsCartPlus, BsCartCheckFill } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

import courseData from '../data/CourseData';

import { useViewHistory } from "../hooks/useViewHistory";
import { useFavorite } from "../hooks/useFavorite";

import { useCart } from "../context/CartContext";

const CoursePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const courseId = parseInt(id);
    const course = courseData.find(c => c.id === courseId);
    const { cartItems, addToCart, removeFromCart } = useCart();
    const isInCart = cartItems.some(item => item.id === courseId);

    const { addToHistory } = useViewHistory();
    useEffect(() => {
        if (id) addToHistory(id);
    }, [id]);

    const { favorite, addFavorite } = useFavorite();

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
        }
        return stars;
    };

    const filteredCourses = course.title
        ? courseData.filter(c =>
            c.id !== course.id &&
            (c.title.toLowerCase().includes(course.title.toLowerCase()) ||
                c.category.toLowerCase().includes(course.category.toLowerCase()))
        )
        : courseData;

    const relatedCourse = filteredCourses.slice(0, 10);

    return (
        <div>
            <main className="mx-auto 
                             px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white">
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-shrink-0">
                                    <img
                                        src={course.image || "/default-course.png"}
                                        alt={course.title}
                                        className="w-full sm:w-48 h-48 object-cover rounded-lg shadow-md"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center gap-2 mb-2">
                                        <div className='flex gap-2'>
                                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                {course.category}
                                            </span>
                                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                {course.level}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => addFavorite(courseId)}>
                                            {favorite.includes(courseId) ? (
                                                <FaHeart className="w-5 h-5 text-red-400" />
                                            ) : (
                                                <FaRegHeart className="w-5 h-5 text-red-400" />
                                            )}
                                        </button>
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

                        <div className="bg-white rounded-xl p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Course Description</h2>
                            <p className="text-gray-700 leading-relaxed">
                                {course.description}
                            </p>
                        </div>
                    </div>

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
                                <button
                                    onClick={() => navigate('/cart')}
                                    className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    {isInCart ? (
                                        <>
                                            <BsCartCheckFill />
                                            Go to Cart
                                        </>
                                    ) : (
                                        "Enroll Now"
                                    )}
                                </button>
                                <button
                                    onClick={() => {
                                        if (isInCart) {
                                            removeFromCart(courseId);
                                        } else {
                                            addToCart({
                                                id: courseId,
                                                title: course.title,
                                                instructor: course.instructor,
                                                price: course.price,
                                                duration: course.duration,
                                                level: course.level
                                            });
                                        }
                                    }}
                                    className={`w-full font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2
                                        ${isInCart
                                            ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {isInCart ? (
                                        <>
                                            <BsCartCheckFill />
                                            Remove from Cart
                                        </>
                                    ) : (
                                        <>
                                            <BsCartPlus />
                                            Add to Cart
                                        </>
                                    )}
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
                {/* Related Courses */}
                {relatedCourse.length !== 0 && (
                    <div className="py-16 px-6">
                        <h2 className="text-xl font-bold mb-5 text-gray-900">Related Course</h2>
                        <Suspense fallback={<div>Loading Swiper...</div>}>
                            <CustomSwiper courses={relatedCourse} />
                        </Suspense>
                    </div>
                )}
            </main>
        </div>
    )
}

export default CoursePage