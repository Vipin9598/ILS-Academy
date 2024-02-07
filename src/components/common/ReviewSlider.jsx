import React, { useEffect, useState } from "react";
import { ratingsEndpoints } from "../../services/apis";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Pagination, Autoplay, FreeMode,Navigation } from "swiper/modules";
import { apiConnector } from "../../services/apiconnector";
import RatingStars from "./RatingStars";
import { FaStar } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviewsData = async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      );
      if (data.success) {
        await setReviews(data.AllRating);
      }
    };
    fetchReviewsData();
  },[]);

  const slidesPerView = {
    320: 1, 
    640: 2, 
    1024: 3, 
  };
  return (
    <div className="text-white">
      <div className="h-[200px]  ">
        <Swiper
          breakpoints={{
            280:{
              width:260,
              slidesPerView:1
            },
            
            450:{
              width:350,
              slidesPerView:1
            },
            750:{
              width:750,
              slidesPerView:2
            },
            1050:{
              width:1050,
              slidesPerView:3
            },
          }}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          navigation={true}
          modules={[ FreeMode, Autoplay,Navigation]}

          pagination={{
            clickable: true,
          }}

          className="mySwiper"
        >
          { reviews &&  reviews.map((review, index) => {
            return (
              // <SwiperSlide key={index} className="flex flex-col justify-between gap-2  border border-richblack-25 sm:py-4 sm:px-4 py-2 px-1 bg-richblack-700 rounded-lg h-[200px]   w-[100px]  ">

              //   <div className="flex sm:gap-5 gap-2 items-center">
              //     <img
              //       src={
              //         review?.user?.image
              //           ? review?.user?.image
              //           : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
              //       }
              //       alt="ProfilePicture"
              //       className="sm:h-9 sm:w-9 h-6 w-6 object-cover rounded-full"
              //     />
              //     <div className="flex flex-col gap-1 text-sm">
              //       <p className="flex gap-2 capitalize ">
              //         <span className="">{review?.user?.firstName}</span>
              //         <span>{review?.user?.lastName}</span>
              //       </p>
              //       <p className=" text-richblack-400">{review?.user?.email}</p>
                   
              //     </div>
              //   </div>

              //   <div className="flex flex-col gap-2  text-sm">
              //        <p>CourseName : {review?.course?.courseName}</p>
              //        <p className="text-richblack-400">{review?.review.split(" ").length 
              //        >15 ? review?.review.split(" ").splice(0,16).join(" ") + "..." :review?.review}  </p>
              //   </div>

              //   <div className="flex  gap-5 items-center">
              //    <p> {review?.rating.toFixed(1)}</p>
              //    <ReactStars 
              //     count={5}
              //     value={review?.rating}
              //     size={20}
              //     edit={false}
              //     activeColor="#ffd700"
              //     emptyIcon={<FaStar/>}
              //     fullIcon = {<FaStar/>}
              //   />
              //   </div>
                
                

              // </SwiperSlide>
              <SwiperSlide
              key={index}
              className="flex flex-col justify-between gap-2 border  reviewWidth border-richblack-25 sm:py-4 sm:px-4 py-2 px-1 bg-richblack-700 rounded-lg sm:w-[220px] w-[200px]"
            >
              <div className="flex sm:gap-5 gap-2 items-center">
                <img
                  src={
                    review?.user?.image
                      ? review?.user?.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                  }
                  alt="ProfilePicture"
                  className="sm:h-9 sm:w-9 h-6 w-6 object-cover rounded-full"
                />
                <div className="flex flex-col gap-1 text-sm">
                  <p className="flex gap-2 capitalize ">
                    <span className="">{review?.user?.firstName}</span>
                    <span>{review?.user?.lastName}</span>
                  </p>
                  <p className="text-richblack-400">{review?.user?.email}</p>
                </div>
              </div>
            
              <div className="flex flex-col gap-2 text-sm">
                <p>CourseName: {review?.course?.courseName}</p>
                <p className="text-richblack-400  sm:w-auto w-[200px]">
                  {review?.review.split(" ").length > 15
                    ? review?.review.split(" ").splice(0, 16).join(" ") + "..."
                    : review?.review}
                </p>
              </div>
            
              <div className="flex gap-5 items-center">
                <p>{review?.rating.toFixed(1)}</p>
                <ReactStars
                  count={5}
                  value={review?.rating}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
              </div>
            </SwiperSlide>
            
            
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSlider;



