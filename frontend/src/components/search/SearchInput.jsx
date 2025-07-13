import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';

import { CiSearch } from "react-icons/ci";

import SearchResultModal from './SearchResultModal';

const SearchInput = () => {

    const [search, setSearch] = useState("")
    const [isFocused, setIsFocused] = useState(false);
    const [results, setResults] = useState({ course: [] });

    const [showModal, setShowModal] = useState(false);

    const location = useLocation();

    const handleInputOnchange = (e) => {
        const { value } = e.target;
        setSearch(value);
        debounceDropDown(value);
    }

    const modalRef = useRef(null);
    const containerRefMobile = useRef(null);

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
                    placeholder="Search..."
                    onFocus={() => setIsFocused(true)}
                    className="transition-all duration-200 ease-in-out
                        md:w-72 h-8
                        bg-slate-100
                        px-4 py-1
                        text-[17px]
                        rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-green-500
                        
                        relative"
                />
                {isFocused && <SearchResultModal modalRef={modalRef} results={results} isInput={search.trim() !== "" ? true : false} />}
                <CiSearch className="absolute top-1.5 right-3 transition-all duration-200 ease-in-out
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