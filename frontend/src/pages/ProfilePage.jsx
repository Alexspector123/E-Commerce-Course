import React, { useState } from 'react';

import { IoMailOutline } from "react-icons/io5";
import { FiMapPin } from "react-icons/fi";
import { FaRegCalendar } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { LuHistory } from "react-icons/lu";
import { FiEdit3 } from "react-icons/fi";

import CourseCard from '../components/course/CourseCard';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('favorites');

  const userData = {
    name: "Hitori",
    email: "alexspector8766@email.com",
    location: "HCMC, VN",
    joinDate: "July 2025",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    bio: "Full-stack developer passionate about creating innovative web applications. Always learning and exploring new technologies.",
    stats: {
      coursesCompleted: 12,
      certificatesEarned: 8,
      totalLearningHours: 156,
      currentStreak: 7
    }
  };

  const favoriteCourses = [
    {
      id: 1,
      title: "Complete React Developer Course",
      instructor: "John Smith",
      rating: 4.8,
      students: 45678,
      duration: "40 hours",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Web Development"
    },
    {
      id: 2,
      title: "Python Data Science Masterclass",
      instructor: "Dr. Sarah Wilson",
      rating: 4.9,
      students: 32456,
      duration: "55 hours",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Data Science"
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      instructor: "Maria Garcia",
      rating: 4.7,
      students: 28934,
      duration: "32 hours",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Design"
    }
  ];

  const historyItems = [
    {
      id: 1,
      title: "JavaScript ES6+ Complete Guide",
      instructor: "Mike Johnson",
      rating: 4.6,
      progress: 100,
      completedDate: "2024-01-15",
      duration: "28 hours",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "JavaScript"
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Anna Chen",
      rating: 4.8,
      progress: 65,
      lastAccessed: "2024-01-10",
      duration: "45 hours",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Machine Learning"
    },
    {
      id: 3,
      title: "Advanced CSS and Sass",
      instructor: "Lisa Anderson",
      rating: 4.7,
      progress: 100,
      completedDate: "2023-12-22",
      duration: "22 hours",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "CSS"
    }
  ];

  return (
    <div>
      <div className="mx-auto 
                       px-4 sm:px-10 lg:px-20 py-8">
        <div className="bg-white 
                          rounded-xl shadow-sm border border-gray-300
                          p-6 
                          mb-8">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-32 h-32 
                           rounded-full object-cover shadow-md"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold 
                                 mb-2">
                    {userData.name}
                  </h1>
                  <p className="text-gray-600 
                                  mb-3">{userData.bio}</p>
                </div>
                <button className="p-2 
                                text-gray-600 hover:text-gray-900 
                                  cursor-pointer
                                  h-5
                                  transition">
                  <FiEdit3 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 
                              mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {userData.stats.coursesCompleted}
                  </div>
                  <div className="text-sm text-gray-500">Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {userData.stats.certificatesEarned}
                  </div>
                  <div className="text-sm text-gray-500">Certificates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {userData.stats.totalLearningHours}h
                  </div>
                  <div className="text-sm text-gray-500">Learning</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {userData.stats.currentStreak}
                  </div>
                  <div className="text-sm text-gray-500">Day Streak</div>
                </div>
              </div>

              <div className="flex flex-col gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <IoMailOutline className="w-4 h-4" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiMapPin className="w-4 h-4" />
                  <span>{userData.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaRegCalendar className="w-4 h-4" />
                  <span>Joined {userData.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl shadow-sm border-gray-400 
                        mb-8">
          <div className="flex 
                          border-b
                          border-gray-200">
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex-1 
                          py-4 px-6 text-sm font-medium 
                          transition duration-400
                          ${activeTab === 'favorites'
                            ? 'text-green-500 border-b-2 border-green-500'
                            : 'text-gray-500 hover:text-gray-700'
                          }`}
            >
              <div className="flex items-center justify-center gap-2">
                <FaRegHeart className="w-4 h-4" />
                <span>Favorites ({favoriteCourses.length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 
                          py-4 px-6 text-sm font-medium 
                          transition duration-400
                          ${activeTab === 'history'
                            ? 'text-green-500 border-b-2 border-green-500'
                            : 'text-gray-500 hover:text-gray-700'
                          }`}
            >
              <div className="flex items-center justify-center gap-2">
                <LuHistory className="w-4 h-4" />
                <span>Learning History ({historyItems.length})</span>
              </div>
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'favorites' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">My Favorite Courses</h2>
                  <button className="text-green-500 hover:text-green-600
                                        cursor-pointer
                                        transition duration-300
                                        text-sm font-medium">
                    View All
                  </button>
                </div>

                {favoriteCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FaHeart className="w-12 h-12 
                                      text-gray-300 
                                        mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 
                                    mb-2">No favorites yet</h3>
                    <p className="text-gray-500">Start adding courses to your favorites to see them here</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <div className="flex items-center justify-between 
                                mb-6">
                  <h2 className="text-xl font-bold text-gray-900">View History</h2>
                  <button className="text-green-500 hover:text-green-600
                                        cursor-pointer
                                        transition duration-300
                                        text-sm font-medium">
                    Clear History
                  </button>
                </div>

                {historyItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {historyItems.map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <LuHistory className="w-12 h-12 text-gray-300 
                                          mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 
                                    mb-2">
                        No view history
                    </h3>
                    <p className="text-gray-500">Your preview course history will appear here</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;