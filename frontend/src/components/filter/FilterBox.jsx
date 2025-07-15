import React from 'react'

import { FaRegStar } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaChartBar } from "react-icons/fa";

import FilterSection from './FilterSection';

const FilterBox = ({ searchedCourses, filters, resetPage, setFilters }) => {
    const filterOptions = {
        categories: [
            { name: 'All Categories', count: (searchedCourses || []).length },
            { name: 'Development', count: (searchedCourses || []).filter(c => c.category === 'Development').length },
            { name: 'Design', count: (searchedCourses || []).filter(c => c.category === 'Design').length },
            { name: 'Business', count: (searchedCourses || []).filter(c => c.category === 'Business').length },
            { name: 'Marketing', count: (searchedCourses || []).filter(c => c.category === 'Marketing').length }
        ],
        ratings: [
            { name: 'All Ratings', count: searchedCourses?.length || 0 },
            { name: '4.5+ Stars', count: searchedCourses?.filter(c => c.rating >= 4.5).length || 0 },
            { name: '4.0+ Stars', count: searchedCourses?.filter(c => c.rating >= 4.0).length || 0 },
            { name: '3.5+ Stars', count: searchedCourses?.filter(c => c.rating >= 3.5).length || 0 },
            { name: '3.0+ Stars', count: searchedCourses?.filter(c => c.rating >= 3.0).length || 0 }
        ],
        languages: [
            { name: 'All Languages', count: searchedCourses?.length || 0 },
            { name: 'English', count: searchedCourses?.filter(c => c.language === 'English').length || 0 },
            { name: 'Spanish', count: searchedCourses?.filter(c => c.language === 'Spanish').length || 0 },
            { name: 'French', count: searchedCourses?.filter(c => c.language === 'French').length || 0 }
        ],
        durations: [
            { name: 'All Durations', count: searchedCourses?.length || 0 },
            { name: '0-2 Hours', count: searchedCourses?.filter(c => parseInt(c.duration) <= 2).length || 0 },
            { name: '3-6 Hours', count: searchedCourses?.filter(c => parseInt(c.duration) >= 3 && parseInt(c.duration) <= 6).length || 0 },
            { name: '7-17 Hours', count: searchedCourses?.filter(c => parseInt(c.duration) >= 7 && parseInt(c.duration) <= 17).length || 0 },
            { name: '17+ Hours', count: searchedCourses?.filter(c => parseInt(c.duration) > 17).length || 0 }
        ],
        levels: [
            { name: 'All Levels', count: searchedCourses?.length || 0 },
            { name: 'Beginner', count: searchedCourses?.filter(c => c.level === 'Beginner').length || 0 },
            { name: 'Intermediate', count: searchedCourses?.filter(c => c.level === 'Intermediate').length || 0 },
            { name: 'Advanced', count: searchedCourses?.filter(c => c.level === 'Advanced').length || 0 }
        ]
    };

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
            level: 'All Levels',
            priceRange: { min: '', max: '' }
        });
        resetPage();
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
        resetPage();
    };

    return (
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
                    handleFilterChange={handleFilterChange}
                />

                {/* Rating Filter */}
                <FilterSection
                    title="Rating"
                    filterType='rating'
                    options={filterOptions.ratings}
                    icon={<FaRegStar className="w-5 h-5 text-yellow-500" />}
                    filters={filters}
                    handleFilterChange={handleFilterChange}
                />

                {/* Language Filter */}
                <FilterSection
                    title="Language"
                    filterType='language'
                    options={filterOptions.languages}
                    icon={<AiOutlineGlobal className="w-5 h-5 text-yellow-500" />}
                    filters={filters}
                    handleFilterChange={handleFilterChange}
                />

                {/* Duration Filter */}
                <FilterSection
                    title="Video Duration"
                    filterType='duration'
                    options={filterOptions.durations}
                    icon={<FaRegClock className="w-5 h-5 text-yellow-500" />}
                    filters={filters}
                    handleFilterChange={handleFilterChange}
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
                    handleFilterChange={handleFilterChange}
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
    )
}

export default FilterBox