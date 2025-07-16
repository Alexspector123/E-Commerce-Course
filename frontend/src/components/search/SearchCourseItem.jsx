import React from 'react'

import { GoDotFill } from "react-icons/go";
import { Link } from 'react-router-dom';

const SearchCourseItem = ({ data }) => {
  const { id, image, title, instructor } = data;
  return (
    <Link
      to={`/courses/${id}`}
      className='w-full'>
      <div className='p-1
                      cursor-pointer
                      flex gap-2'>
        <div>
          {image ? (
            <img src={image} alt="Course thumbnail" />
          ) : null}
        </div>
        <div>
          <p className='text-base
                        font-medium'>
            {title}
          </p>
          <p className='text-sm text-gray-400'>
            {instructor}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default SearchCourseItem