import React from "react";
import ReviewSlider from "./ReviewSlider";


const Review = ()=>{
    return(
        <div className=" w-10/12  mx-auto my-20 flex flex-col gap-5  ">
            
            <p className="font-bold text-3xl text-richblack-50 text-center">Reviews from other learners </p>
            <ReviewSlider/>

        </div>
    )
}

export default Review
