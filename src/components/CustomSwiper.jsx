import React, { useRef, useEffect, useState } from 'react';
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
  const [slidesPerView, setSlidesPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(2);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative">
      <button
        ref={prevRef}
        className="
          absolute -left-3 sm:-left-5 top-1/2 transform -translate-y-1/2 
          z-10 
          sm:bg-white sm:border sm:border-gray-300 sm:shadow-lg rounded-full sm:hover:bg-gray-50 
          p-2"
      >
        <FaChevronLeft />
      </button>
      
      <button
        ref={nextRef}
        className="
          absolute -right-3 sm:-right-5 top-1/2 transform -translate-y-1/2 
          z-10 
          sm:bg-white sm:border sm:border-gray-300 sm:shadow-lg rounded-full sm:hover:bg-gray-50
          p-2"
      >
        <FaChevronRight />
      </button>
      
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={window.innerWidth < 768 ? 10 : window.innerWidth < 1024 ? 15 : 20}
        onSwiper={(swiper) => {
          setTimeout(() => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }, 100);
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
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