import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../common/RatingStars"
import { useEffect } from "react";
import GetAvgRating from "../../../utils/AvergeRating";
import { useState } from "react";
import { useSelector } from "react-redux";

const CatalogCourseCard = ({ course}) => {

  const [avgReviewCount,setAverageReviewCount] = useState(0)
  const {loading} = useSelector((state)=>state.auth)


  useEffect(()=>{
    const count = GetAvgRating(course?.ratingANDreviews)
    setAverageReviewCount(count)

  },[course])
  return (
    <div onClick={loading ? (e)=>e.preventDefault():null} className=" border-richblack-700 border lg:p-5 md:p-3 sm:p-2 p-1 rounded-md items-center h-fit  catalogCard">
      <Link to={`/courses/${course._id}`}>
        <div className="flex flex-col gap-y-4">
          <div>
            <img
              src={course?.thumbnail}
              className={` md:h-[250px] sm:h-[200px] h-[180px] object-cover w-full rounded-md`}
            />
          </div>

          <div className="flex flex-col gap-y-1">
            <p>{course?.courseName}</p>
            <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
            <p className="text-blue-100"># {course?.category?.name}</p>
            <div className="flex gap-3 ">
              <span>{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span>{course?.ratingANDreviews?.length} Rating</span>
            </div>
            <p>₹ {course?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CatalogCourseCard;
