import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const RootLayout = () => {
  return (
    <div className='min-h-screen
                    flex overflow-hidden'>
      <div className='h-full w-full'>
        <Navbar />
        <div className='px-8 pt-17
                        h-screen'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default RootLayout