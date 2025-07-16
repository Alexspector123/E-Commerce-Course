import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import ScrollToTop from '../components/custom/ScrollToTop';

import { SearchProvider } from '../context/SearchContext.jsx';
import Sidebar from '../components/skeleton/Sidebar.jsx';

const RootLayout = () => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <SearchProvider>
      <div className='min-h-screen
                    flex flex-col overflow-hidden'>
        {sidebar && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebar(false)}
          />
        )}
        <div className={`fixed lg:relative top-0 left-0 h-full transition-all duration-200
        ${sidebar ? "w-[260px]" : "w-0 overflow-hidden"}  
        ${sidebar ? "translate-x-0" : "-translate-x-full"}
        shadow-lg lg:shadow-none z-50`}>
          {sidebar && <Sidebar closeSidebar={() => setSidebar(false)} />}
        </div>

        <div className='h-full w-full'>
          <Navbar showSidebar={() => setSidebar(!sidebar)} sidebar={sidebar} />
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