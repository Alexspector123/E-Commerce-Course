import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { CiSearch } from "react-icons/ci";

import SearchResultModal from './SearchResultModal';

import CourseData from '../../data/CourseData';

import { useSearch } from '../../context/SearchContext';

const SearchInput = () => {

    const [search, setSearch] = useState("")
    const [isFocused, setIsFocused] = useState(false);
    const [results, setResults] = useState({ course: [] });
    const [showModal, setShowModal] = useState(false);

    const location = useLocation();

    const modalRef = useRef(null);
    const containerRefMobile = useRef(null);

    const navigate = useNavigate();

    const { setSearchTerm } = useSearch();

    {/* Fetch data from input search */ }
    const fetchDropdownOptions = (value) => {
        if (!value) {
            setResults({ course: [] });
            return;
        }

        const filtered = CourseData.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()));
        setResults({ course: filtered });
    };
    const debounceDropDown = useCallback(
        debounce((nextValue) => fetchDropdownOptions(nextValue), 800),
        []
    );

    const handleInputOnchange = (e) => {
        const { value } = e.target;
        setSearch(value);
        setSearchTerm(value);
        debounceDropDown(value);
    }

    // Handle Enter key press to navigate to search results
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && search.trim()) {
            const encoded = encodeURIComponent(search.trim());
            navigate(`/courses/search/?q=${encoded}`);
            setIsFocused(false);
            setShowModal(false)
        }
    };

    // Search result modal for desktop
    useEffect(() => {
        const handleClickOutsideDesktop = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setIsFocused(false);
            }
        };

        console.log("Adding event listener for mousedown");
        document.addEventListener("mousedown", handleClickOutsideDesktop);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideDesktop);
        };
    }, []);

    // Search result modal for mobile
    useEffect(() => {
        if (!showModal) return;

        const handleClickOutsideMobile = (e) => {
            if (containerRefMobile.current && !containerRefMobile.current.contains(e.target)) {
                setShowModal(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutsideMobile);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideMobile);
        };
    }, [showModal]);

    // Reset search input when navigating to a new page
    useEffect(() => {
        setIsFocused(false);
    }, [location]);

    return (
        <div>
            <div className="relative hidden md:block">
                <input
                    type="text"
                    value={search}
                    onChange={handleInputOnchange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search..."
                    onFocus={() => setIsFocused(true)}
                    className="transition-all duration-200 ease-in-out
                        lg:w-110 md:w-60 h-10
                        text-sm
                        bg-slate-100
                        px-3 py-1
                        rounded-xl
                        border
                        focus:outline-none focus:border-green-500 focus:border-2
                        relative"
                />
                {isFocused && <SearchResultModal modalRef={modalRef} results={results} isInput={search.trim() !== "" ? true : false} />}
                <CiSearch className="absolute top-2.5 right-3 transition-all duration-200 ease-in-out
                                    text-xl cursor-pointer" />
            </div>

            { /* For mobile */}
            <div className="md:hidden flex justify-center items-center h-8 w-8 rounded-xl">
                {showModal ? (
                    <div className="fixed inset-0 z-50">
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

                        <div
                            ref={containerRefMobile}
                            className="absolute top-0 left-0 right-0
                            w-full
                            bg-white
                            shadow-lg 
                            p-4 
                            flex items-center gap-2"
                        >
                            <input
                                autoFocus
                                type="text"
                                value={search}
                                onChange={handleInputOnchange}
                                onKeyDown={handleKeyDown}
                                placeholder="Search..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <SearchResultModal results={results} isInput={search.trim() !== "" ? true : false} />
                            <button
                                className="text-2xl text-gray-500 hover:bg-gray-300
                            p-1 rounded
                            transition-all duration-200
                            cursor-pointer"
                                onClick={() => setShowModal(false)}>
                                ✕
                            </button>
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowModal(true);
                        }} >
                        <CiSearch
                            className="text-2xl cursor-pointer" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchInput