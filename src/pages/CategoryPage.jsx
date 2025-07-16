import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import courseData from '../data/CourseData';

import Pagination from '../components/Pagination';
import CourseCard from '../components/course/CourseCard';
import FilterBox from '../components/filter/FilterBox';
import { SuggestionSkeleton } from '../components/skeleton/SuggestionSkeleton';

import usePaginatedData from '../hooks/usePaginatedData';
import { useSuggestion } from '../hooks/useSuggestion';

const CategoryPage = () => {
  const location = useLocation();
  const [filters, setFilters] = useState({
    category: 'All Categories',
    rating: 'All Ratings',
    language: 'All Languages',
    duration: 'All Durations',
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

  const searchedCourses = useMemo(() => {
    if (!courseData) return [];

    return courseData.filter(course => {
      if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [courseData, searchQuery]);

  const { suggestion, loading, error, loadSuggestion } = useSuggestion(1);
  const [useRecommend, setUseRecommend] = useState(false);

  const baseCourses = useMemo(() => {
    return useRecommend ? suggestion : searchedCourses;
  }, [useRecommend, suggestion, searchedCourses]);

  console.log("base", baseCourses);
  console.log("suggestion", suggestion);

  const filteredCourses = useMemo(() => {
    if (!baseCourses) return [];

    return baseCourses.filter(course => {
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
  }, [filters, baseCourses]);

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
    paginatedData: displayedCourses,
    goToPage,
    resetPage
  } = usePaginatedData(sortedCourses, pageSize);

  const toggleRecommend = async () => {
    await loadSuggestion();
    setUseRecommend(true);
  };

  return (
    <div className="bg-gray-50">
      <div className="mx-auto 
                      px-10 py-8">
        <div>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-base lg:text-3xl sm:text-xl font-bold text-gray-900 mb-2">
              {searchQuery ? `Results for "${searchQuery}"` : 'All Courses'}
            </h1>
            <p className="text-gray-600">
              Showing {Math.min(pageSize, displayedCourses.length)} of {sortedCourses.length} results
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <FilterBox searchedCourses={searchedCourses} filters={filters} setFilters={setFilters} resetPage={resetPage} />
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
                <button
                  onClick={toggleRecommend}
                  className="
                    bg-green-500 hover:bg-green-600 
                    text-white text-base font-medium
                    px-4 py-3 
                    rounded-lg 
                    cursor-pointer
                    transition">
                  Recommend
                </button>
              </div>

              {/* Course Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {useRecommend && loading
                  ? <SuggestionSkeleton count={pageSize} />
                  : displayedCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))
                }
              </div>

              {/* No Results */}
              {sortedCourses.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    {searchQuery ? `No courses found for "${searchQuery}"` : 'No courses found matching your filters.'}
                  </p>
                </div>
              )}

              {/* Pagination */}
              {sortedCourses.length > 0 && (
                <div className="flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalCount={sortedCourses.length}
                    pageSize={pageSize}
                    onPageChange={goToPage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;