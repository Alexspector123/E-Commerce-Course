import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const RootLayout = () => {
  return (
    <div className='min-h-screen
                    flex flex-col overflow-hidden'>
      <div className='h-full w-full'>
        <Navbar />
        <div className='pt-20
                        flex-grow'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default RootLayout