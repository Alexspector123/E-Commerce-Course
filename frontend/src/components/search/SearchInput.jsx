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
        </div>
    )
}

export default SearchInput