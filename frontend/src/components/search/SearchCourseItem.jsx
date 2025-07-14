import React from 'react'

import { GoDotFill } from "react-icons/go";

const SearchCourseItem = ({data}) => {
  const { id, image, title, instructor } = data;
  return (
    <div className='w-full'>
      <div className='p-1
                      flex gap-2'>
        <div>
          <img src={image} alt="thumbnail" />
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
    </div>
  )
}

export default SearchCourseItem