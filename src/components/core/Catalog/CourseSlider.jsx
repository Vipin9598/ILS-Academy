import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'
import 'swiper/css/free-mode';
import { Pagination,Autoplay,Navigation } from 'swiper/modules';
import CatalogCourseCard from './CatalogCourseCard';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

const CourseSlider = ({courses}) => {
  const {loading} = useSelector((state)=>state.auth)
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <div  onClick={loading ? (e)=>e.preventDefault() :null }>
      {
        courses?.length > 0 ? (
          <Swiper
          spaceBetween={30}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{clickable:true}}
          navigation={true}
          modules={[ Pagination, Navigation]}
          breakpoints={{
            350:{
              width:350,
              slidesPerView:1
            },
            750:{
              width:1050,
              slidesPerView:2
            },
            1050:{
              width:1050,
              slidesPerView:3
            },
          }}
          className="mySwiper"
          >
            {
              courses.map((course,index)=>(
                <SwiperSlide key={index}>
                  <CatalogCourseCard course={course}  />
                </SwiperSlide>
              ))
            }
          </Swiper>
        ) :
        (
          <p>No Course available</p>
        )
      }     
    </div>
  )
}

export default CourseSlider
