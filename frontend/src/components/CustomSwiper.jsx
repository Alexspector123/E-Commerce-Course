import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CourseCard from './course/CourseCard';

const CustomSwiper = ({ courses }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative">
      <div
        ref={prevRef}
        className="custom-prev 
                   absolute -left-5 top-1/2 -translate-y-1/2 
                   z-10
                   p-5
                   bg-white rounded-4xl hover:bg-gray-100 cursor-pointer 
                   text-green-600
                   transition duration-300">
        <FaChevronLeft className='w-6 h-6' />
      </div>
      <div
        ref={nextRef}
        className="custom-next 
                   absolute -right-5 top-1/2 -translate-y-1/2
                   z-10 
                   p-5
                   bg-white rounded-4xl hover:bg-gray-100 cursor-pointer 
                   text-green-600
                   transition duration-300">
        <FaChevronRight className='w-6 h-6' />
      </div>

      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        modules={[Navigation]}
        className="relatedCourse"
      >
        {courses.map(course => (
          <SwiperSlide key={course.id}>
            <CourseCard course={course} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomSwiper;
