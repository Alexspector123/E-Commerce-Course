import React, { lazy, Suspense, useMemo } from 'react';
const CustomSwiper = lazy(() => import('../components/CustomSwiper')); // Add lazy loading for swiper

import courseData from '../data/CourseData';

import { CiPlay1 } from "react-icons/ci";
import { FiBookOpen } from "react-icons/fi";
import { FiAward } from "react-icons/fi";
import { GrTarget } from "react-icons/gr";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa";

import EmailBox from '../components/EmailBox';

import { useSearch } from '../context/SearchContext';

const HomePage = () => {

  const { searchTerm } = useSearch();
  const relatedCourse = useMemo(() => {
    if (!courseData) return [];

    const filtered = searchTerm
      ? courseData.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : courseData;

    return filtered.slice(0, 10);
  }, [courseData, searchTerm]);

  return (
    <div className="bg-stone-100 
                    flex flex-col">
      {/* Main Content */}
      <div className="flex-1">
        {/* Hero Section */}
        <div className="relative 
                            bg-gradient-to-r from-green-800 to-green-600 
                            text-white">
          <div className="absolute 
                          inset-0 bg-black bg-opacity-20"></div>
          <div className="relative 
                          max-w-7xl 
                          mx-auto px-4 
                          sm:px-6 lg:px-8 py-24">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl 
                              font-bold mb-6 
                              leading-tight">
                Master New Skills,<br />
                Advance Your Career
              </h1>
              <p className="text-xl text-green-100
                            mb-8">
                Learn from industry experts with our comprehensive online courses.<br />
                Build real-world skills that matter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-green-500 hover:bg-green-600
                                   text-white font-semibold
                                      px-8 py-3 
                                      rounded-lg 
                                      transition duration-400 transform hover:scale-105">
                  EXPLORE COURSES
                </button>
                <button className="border-2 border-white 
                                 text-white hover:text-green-600 font-semibold
                                 hover:bg-white
                                   px-8 py-3 
                                   rounded-lg transition duration-400
                                   items-center flex">
                  <CiPlay1 className="w-5 h-5 inline mr-2" />
                  WATCH DEMO
                </button>
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-0 
                          w-1/2 h-full 
                          bg-cover bg-center opacity-90 
                          hidden lg:block"
            style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23ddd6fe' width='400' height='300'/%3E%3Ctext x='200' y='140' text-anchor='middle' fill='%23666' font-size='16'%3EOnline Learning%3C/text%3E%3Ctext x='200' y='160' text-anchor='middle' fill='%23666' font-size='16'%3EIllustration%3C/text%3E%3C/svg%3E')" }}></div>
        </div>

        {/* Stats Section */}
        <div className="py-16 
                          bg-white">
          <div className="max-w-7xl 
                          mx-auto 
                          px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 
                            text-center
                            text-3xl font-bold text-green-500">
              <div>
                <div className="mb-2">50K+</div>
                <p className="text-gray-600">Students Enrolled</p>
              </div>
              <div>
                <div className="mb-2">500+</div>
                <p className="text-gray-600">Expert Instructors</p>
              </div>
              <div>
                <div className="mb-2">1000+</div>
                <p className="text-gray-600">Online Courses</p>
              </div>
              <div>
                <div className="mb-2">95%</div>
                <p className="text-gray-600">Success Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Genres */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-gray-900">Popular Genres</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Full Stack Developer",
                  description: "Master both frontend and backend development",
                  courses: 8,
                  duration: "6 months",
                  icon: "💻"
                },
                {
                  title: "Data Scientist",
                  description: "Learn analytics, machine learning, and AI",
                  courses: 6,
                  duration: "4 months",
                  icon: "📊"
                },
                {
                  title: "Digital Marketer",
                  description: "Master SEO, social media, and advertising",
                  courses: 5,
                  duration: "3 months",
                  icon: "📱"
                }
              ].map((path, index) => (
                <div key={index} className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="text-4xl mb-4">{path.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{path.title}</h3>
                  <p className="text-gray-600 mb-4">{path.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{path.courses} courses</span>
                    <span>{path.duration}</span>
                  </div>
                  <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
                    Start Learning
                    <FaChevronRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Courses */}
        <div className="py-16 
                          bg-stone-50">
          <div className="max-w-7xl 
                          mx-auto 
                          px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-gray-900">Featured Courses</h2>
            <Suspense fallback={<div>Loading Swiper...</div>}>
              <CustomSwiper courses={courseData} />
            </Suspense>
          </div>
        </div>

        {/* Related Courses */}
        {relatedCourse.length !== 0 && (
          <div className="py-16 
                          bg-stone-50">
            <div className="max-w-7xl 
                          mx-auto 
                          px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-12 text-gray-900">Because you have searched "{searchTerm}"</h2>
              <Suspense fallback={<div>Loading Swiper...</div>}>
                <CustomSwiper courses={relatedCourse} />
              </Suspense>
            </div>
          </div>
        )}

        {/* Why Choose Us */}
        <div className="py-16 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose ITUL?</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiBookOpen className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">EXPERT INSTRUCTORS</h3>
                <p className="text-sm text-gray-600">Learn from industry professionals with real-world experience.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiAward className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">CERTIFICATES</h3>
                <p className="text-sm text-gray-600">Earn verified certificates upon course completion.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AiOutlineGlobal className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">LIFETIME ACCESS</h3>
                <p className="text-sm text-gray-600">Access your courses anytime, anywhere, forever.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GrTarget className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">PRACTICAL PROJECTS</h3>
                <p className="text-sm text-gray-600">Build real projects to showcase your skills.</p>
              </div>
            </div>
          </div>
        </div>

        <EmailBox />
      </div>
    </div>
  )
}

export default HomePage