import React, { useState } from 'react'

const FilterSection = ({ title, filterType, options, icon, filters, handleFilterChange }) => {
    const [openSections, setOpenSections] = useState({
        category: true,
        rating: false,
        language: false,
        duration: false,
        topic: false,
        level: false,
        price: false,
    });
    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className="mb-4 pb-2">
            <div
                className="flex items-center justify-between cursor-pointer mb-2"
                onClick={() => toggleSection(filterType)}
            >
                <div className="flex items-center gap-2">
                    {icon}
                    <h3 className="text-md font-semibold text-gray-900">{title}</h3>
                </div>
                <span className="text-gray-600 text-sm">
                    {openSections[filterType] ? '−' : '+'}
                </span>
            </div>

            {openSections[filterType] && (
                <div className="space-y-3 pl-6">
                    {options.map((option) => (
                        <label key={option.name} className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name={filterType}
                                checked={filters[filterType] === option.name}
                                onChange={() => handleFilterChange(filterType, option.name)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                            />
                            <span className="ml-3 text-gray-700 flex-1">{option.name}</span>
                            <span className="text-gray-500 text-sm">({option.count})</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    )
}

export default FilterSection