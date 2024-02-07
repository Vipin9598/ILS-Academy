import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../../slices/cartSlice";
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import GetAvgRating from "../../../../utils/AvergeRating"

const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart);
  const { loading } = useSelector((state) => state.auth);
  const [avgReviewCount,setAverageReviewCount] = useState(0)
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log("cart ka ",cart);
    const count = GetAvgRating(cart[0]?.ratingANDreviews)
    console.log("count cart ka ",count);
    setAverageReviewCount(count)
  },[cart]);
  return (
    <div className="lg:w-[75%] w-[100%]">
      <div>
        {cart.map((course, index) => (
          <div className="flex  justify-between  border-b pb-5 py-7 gap-y-5  cartflex">
            <div className="flex lg:gap-8 md:gap-4 sm:gap-8 ">
              <div className="sm:w-[15rem] sm:h-[180px] w-[8rem] h-[100px] mx-5 rounded-lg overflow-hidden border">
                <img
                  src={course?.thumbnail}
                  alt="image aayegi yha"
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="flex flex-col gap-4 w-[45%] lg:text-lg md:text-xl sm:text-[15px] text-sm">
                <div className="flex flex-col gap-4  ">
                <p>{course?.courseName}</p>
                <p>{course?.category?.name}</p>
                </div>
                <div className="flex flex-wrap sm:gap-5 gap-1 items-center">
                  {/* //kaam krna h ispe  */}
                  <span>{avgReviewCount}</span>
                  <ReactStars
                    count={5}
                    value={avgReviewCount}
                    size={20}
                    edit={false}
                    activecolor="#ffd700"
                    emptyIcon={<GiNinjaStar />}
                    fullIcon={<GiNinjaStar />}
                  />
                  <span>{course?.ratingANDreviews.length} Ratings</span>
                </div>
              </div>
            </div>

            <div className=" cartInner gap-5 ">
              <button
                disabled={loading}
                onClick={() => dispatch(removeFromCart(course._id))}
                className="flex gap-4 px-3 py-2 items-center bg-richblack-700 sm:text-lg text-[15px] text-pink-300 rounded-lg"
              >
                <RiDeleteBin6Line />
                <span>Remove</span>
              </button>
              <span className="px-3 py-2">Rs {course?.price} /-</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderCartCourses;
