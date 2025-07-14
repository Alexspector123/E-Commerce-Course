import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { FaRegStar } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaChartBar } from "react-icons/fa";

import courseData from '../data/CourseData';

import Pagination from '../components/Pagination';
import CourseCard from '../components/course/CourseCard';
import FilterSection from '../components/filter/FilterSection';

import usePaginatedData from '../hooks/usePaginatedData';

// Main Component
const CategoryPage = () => {
  const location = useLocation();
  const [filters, setFilters] = useState({
    category: 'All Categories',
    rating: 'All Ratings',
    language: 'All Languages',
    duration: 'All Durations',
    topic: 'All Topics',
    level: 'All Levels',
    priceRange: { min: '', max: '' }
  });
  const [sortBy, setSortBy] = useState('Relevance');
  const [searchQuery, setSearchQuery] = useState('');

  const pageSize = 6;

  // Extract search query from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get('q') || '';
    setSearchQuery(query.replace(/"/g, ''));
  }, [location.search]);

  const filterOptions = {
    categories: [
      { name: 'All Categories', count: (courseData || []).length },
      { name: 'Development', count: (courseData || []).filter(c => c.category === 'development').length },
      { name: 'Design', count: (courseData || []).filter(c => c.category === 'design').length },
      { name: 'Business', count: (courseData || []).filter(c => c.category === 'business').length },
      { name: 'Marketing', count: (courseData || []).filter(c => c.category === 'marketing').length }
    ],
    ratings: [
      { name: 'All Ratings', count: courseData?.length || 0 },
      { name: '4.5+ Stars', count: courseData?.filter(c => c.rating >= 4.5).length || 0 },
      { name: '4.0+ Stars', count: courseData?.filter(c => c.rating >= 4.0).length || 0 },
      { name: '3.5+ Stars', count: courseData?.filter(c => c.rating >= 3.5).length || 0 },
      { name: '3.0+ Stars', count: courseData?.filter(c => c.rating >= 3.0).length || 0 }
    ],
    languages: [
      { name: 'All Languages', count: courseData?.length || 0 },
      { name: 'English', count: courseData?.filter(c => c.language === 'English').length || 0 },
      { name: 'Spanish', count: courseData?.filter(c => c.language === 'Spanish').length || 0 },
      { name: 'French', count: courseData?.filter(c => c.language === 'French').length || 0 }
    ],
    durations: [
      { name: 'All Durations', count: courseData?.length || 0 },
      { name: '0-2 Hours', count: courseData?.filter(c => parseInt(c.duration) <= 2).length || 0 },
      { name: '3-6 Hours', count: courseData?.filter(c => parseInt(c.duration) >= 3 && parseInt(c.duration) <= 6).length || 0 },
      { name: '7-17 Hours', count: courseData?.filter(c => parseInt(c.duration) >= 7 && parseInt(c.duration) <= 17).length || 0 },
      { name: '17+ Hours', count: courseData?.filter(c => parseInt(c.duration) > 17).length || 0 }
    ],
    topics: [
      { name: 'All Topics', count: courseData?.length || 0 },
      { name: 'Web Development', count: courseData?.filter(c => c.title.toLowerCase().includes('web')).length || 0 },
      { name: 'Mobile Development', count: courseData?.filter(c => c.title.toLowerCase().includes('mobile')).length || 0 },
      { name: 'Data Science', count: courseData?.filter(c => c.title.toLowerCase().includes('data')).length || 0 },
      { name: 'AI & Machine Learning', count: courseData?.filter(c => c.title.toLowerCase().includes('ai') || c.title.toLowerCase().includes('machine')).length || 0 }
    ],
    levels: [
      { name: 'All Levels', count: courseData?.length || 0 },
      { name: 'Beginner', count: courseData?.filter(c => c.level === 'Beginner').length || 0 },
      { name: 'Intermediate', count: courseData?.filter(c => c.level === 'Intermediate').length || 0 },
      { name: 'Advanced', count: courseData?.filter(c => c.level === 'Advanced').length || 0 }
    ]
  };

  const filteredCourses = useMemo(() => {
    if (!courseData) return [];

    return courseData.filter(course => {
      // Search query filter
      if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filters.category !== 'All Categories' && course.category !== filters.category) {
        return false;
      }

      // Rating filter
      if (filters.rating !== 'All Ratings') {
        const ratingThreshold = parseFloat(filters.rating.split('+')[0]);
        if (course.rating < ratingThreshold) return false;
      }

      // Language filter
      if (filters.language !== 'All Languages' && course.language !== filters.language) {
        return false;
      }

      // Duration filter
      if (filters.duration !== 'All Durations') {
        const courseDuration = parseInt(course.duration);
        switch (filters.duration) {
          case '0-2 Hours':
            if (courseDuration > 2) return false;
            break;
          case '3-6 Hours':
            if (courseDuration < 3 || courseDuration > 6) return false;
            break;
          case '7-17 Hours':
            if (courseDuration < 7 || courseDuration > 17) return false;
            break;
          case '17+ Hours':
            if (courseDuration < 17) return false;
            break;
        }
      }

      // Topic filter (simplified - based on title keywords)
      if (filters.topic !== 'All Topics') {
        const topicMap = {
          'Web Development': 'web',
          'Mobile Development': 'mobile',
          'Data Science': 'data',
          'AI & Machine Learning': 'ai'
        };
        const keyword = topicMap[filters.topic];
        if (keyword && !course.title.toLowerCase().includes(keyword)) {
          return false;
        }
      }

      // Level filter
      if (filters.level !== 'All Levels' && course.level !== filters.level) {
        return false;
      }

      // Price range filter
      if (filters.priceRange.min && course.price < parseFloat(filters.priceRange.min)) {
        return false;
      }
      if (filters.priceRange.max && course.price > parseFloat(filters.priceRange.max)) {
        return false;
      }

      return true;
    });
  }, [filters, courseData, searchQuery]);

  // Sort courses
  const sortedCourses = useMemo(() => {
    const sorted = [...filteredCourses];

    switch (sortBy) {
      case 'Price: Low to High':
        return sorted.sort((a, b) => a.price - b.price);
      case 'Price: High to Low':
        return sorted.sort((a, b) => b.price - a.price);
      case 'Rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'Most Popular':
        return sorted.sort((a, b) => b.students - a.students);
      default:
        return sorted;
    }
  }, [filteredCourses, sortBy]);

  const {
    currentPage,
    totalPages,
    paginatedData: displayedCourses,
    goToPage,
    resetPage
  } = usePaginatedData(sortedCourses, pageSize);

  const handlePriceRangeChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: value
      }
    }));
    resetPage();
  };

  const clearAllFilters = () => {
    setFilters({
      category: 'All Categories',
      rating: 'All Ratings',
      language: 'All Languages',
      duration: 'All Durations',
      topic: 'All Topics',
      level: 'All Levels',
      priceRange: { min: '', max: '' }
    });
    resetPage();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {searchQuery ? `Results for "${searchQuery}"` : 'All Courses'}
              </h1>
              <p className="text-gray-600">
                Showing {Math.min(pageSize, displayedCourses.length)} of {sortedCourses.length} results
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <div className="lg:w-80 flex-shrink-0">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                    <button
                      onClick={clearAllFilters}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Category Filter */}
                  <FilterSection
                    title="Categories"
                    filterType='category'
                    options={filterOptions.categories}
                    icon={
                      <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-600 rounded"></div>
                      </div>
                    }
                    filters={filters}
                  />

                  {/* Rating Filter */}
                  <FilterSection
                    title="Rating"
                    filterType='rating'
                    options={filterOptions.ratings}
                    icon={<FaRegStar className="w-5 h-5 text-yellow-500" />}
                    filters={filters}
                  />

                  {/* Language Filter */}
                  <FilterSection
                    title="Language"
                    filterType='language'
                    options={filterOptions.languages}
                    icon={<AiOutlineGlobal className="w-5 h-5 text-yellow-500" />}
                    filters={filters}
                  />

                  {/* Duration Filter */}
                  <FilterSection
                    title="Video Duration"
                    filterType='duration'
                    options={filterOptions.durations}
                    icon={<FaRegClock className="w-5 h-5 text-yellow-500" />}
                    filters={filters}
                  />

                  {/* Topic Filter */}
                  <FilterSection
                    title="Topic"
                    filterType='topic'
                    options={filterOptions.durattopics}
                    icon={<FaChartBar className="w-5 h-5 text-yellow-500" />}
                    filters={filters}
                  />


                  {/* Level Filter */}
                  <FilterSection
                    title="Level"
                    filterType='level'
                    options={filterOptions.levels}
                    icon={
                      <div className="w-5 h-5 bg-red-100 rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-red-600 rounded"></div>
                      </div>
                    }
                    filters={filters}
                  />
                  {/* Price Range */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-5 h-5 bg-green-100 rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-600 rounded"></div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Price Range</h3>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.priceRange.min}
                        onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.priceRange.max}
                        onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                {/* Sort Controls */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option>Relevance</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Rating</option>
                      <option>Most Popular</option>
                    </select>
                  </div>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {displayedCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>

                {/* No Results */}
                {sortedCourses.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      {searchQuery ? `No courses found for "${searchQuery}"` : 'No courses found matching your filters.'}
                    </p>
                    <button
                      onClick={clearAllFilters}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}

                {/* Pagination */}
                {sortedCourses.length > 0 && (
                  <div className="flex justify-center">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={goToPage}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;