import React from 'react'
import CategoryPage from '../pages/CategoryPage';
import { Outlet, useLocation } from 'react-router-dom';

const CourseLayout = () => {
    const location = useLocation();
  return (
    <div>
        {location.pathname === "/courses/search" && <CategoryPage />}
        <Outlet />
    </div>
  )
}

export default CourseLayout;