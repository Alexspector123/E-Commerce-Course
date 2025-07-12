import React from 'react'
import SearchCourseItem from './SearchCourseItem'

const SearchResultModal = ({ results, isInput, modalRef }) => {
  return (
    <div>
      <div
        ref={modalRef}
        className="absolute
                        top-16 md:top-full right-0 left-0 md:right-auto md:left-auto
                        mt-2
                        bg-white z-50 
                        w-full max-h-[90vh]
                        overflow-y-auto
                        rounded-b-lg
                        shadow-lg
                        p-4 pb-8">
        {isInput ? (
          <div>
            {/*Course search*/}
            <div>
              {results.course?.length > 0 && (
                <div className='mb-4'>
                  <div className='flex justify-between items-center mb-4'>
                  </div>

                  <div className='flex flex-col gap-3'>
                    {results.course.slice(0, 5).map((course) => (
                      <SearchCourseItem data={course} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {(results.manga?.length === 0) && (results.group?.length === 0) && (results.author?.length === 0) && (
              <p className="text-gray-500">No result found.</p>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Please enter a search term.</p>
        )}
      </div>
    </div>
  )
}

export default SearchResultModal