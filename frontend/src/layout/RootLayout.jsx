import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import ScrollToTop from '../components/custom/ScrollToTop';

import { SearchProvider } from '../context/SearchContext.jsx';

const RootLayout = () => {
  return (
    <SearchProvider>
      <div className='min-h-screen
                    flex flex-col overflow-hidden'>
        <div className='h-full w-full'>
          <Navbar />
          <div className='
                        flex-grow'>
            <ScrollToTop />
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </SearchProvider>
  )
}

export default RootLayout