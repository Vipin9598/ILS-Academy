import React ,{useEffect}from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
// import RatingStars from "../../common/RatingStars";
import ReactStars from "react-rating-stars-component";
import Iconbtn from "../Dashboard/Iconbtn";
import { createRating } from "../../../services/operations/courseDetailsAPI";
import { useDispatch, useSelector } from "react-redux";
import { setIsBlurred,setLoading } from "../../../slices/authSlice";

const CourseReviewModal = ({ setReviewModal }) => {
    const {user} = useSelector((state)=>state.profile)
    const {courseEntireData} = useSelector((state)=>state.viewCourse)
    const {token,loading} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()

    const {register,setValue,handleSubmit,formState:{errors}} = useForm()

    // useEffect(()=>{
    //     setValue("courseExperience","")
    //     setValue("courseRating",0)
    // },[])


    const ratingChanged = (newRating)=>{
        setValue("courseRating",newRating)
    }

    const submitHandler = async(data) => {
        await createRating({
            courseId:courseEntireData._id,
            rating:data.courseRating,
            review:data.courseExperience
        },token,dispatch)
        setReviewModal(false)
        dispatch(setIsBlurred(false))
        dispatch(setLoading(false))
    }
  return (
    <div className=" bg-richblack-700 text-richblack-50 sm:w-[45%] flex flex-col lg:gap-5 sm:gap-2 gap-1 absolute lg:left-[30%] sm:left-[25%] top-[17%] left-[25%] reviewModalLecture  lg:p-3 py-1 px-3 rounded-md border border-richblack-5">
      <div className="flex flex-col lg:gap-5 gap-2">
        {/* modal header  */}
        <div className="flex gap-5 text-2xl font-bold">
          <p className="">Add Review</p>
          <button onClick={() => {
            setReviewModal(false)
            dispatch(setIsBlurred(false))
            dispatch(setLoading(false))
          }}>
            <RxCross2 />
          </button>
        </div>
        {/* userData */}
        <div className="flex gap-5 items-center">
          <img
            src={user?.image}
            alt="User Image"
            className="aspect-square w-[50px] rounded-full object-cover"
          />
          <div className="flex flex-col gap-2">
            <p className=" text-lg font-semibold flex gap-2 capitalize">
              <span>{user?.firstName}</span>
              <span>{user?.lastName}</span>
            </p>
            <p>Posting Publicly</p>
          </div>
        </div>
        <form className="flex flex-col lg:gap-4 gap-1" onSubmit={handleSubmit(submitHandler)}>
          <div >
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"              
            />
            {
              errors.courseRating && <span>Rating is Required</span>
            }
          </div>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="courseExperience" className="text-xl font-semibold">
                Add your Experience :
            </label>
            <textarea 
              id="courseExperience"
              placeholder="Add you Experience Here"
              {...register("courseExperience",{required:true})}
              className="form-style min-h-[130px] w-full bg-richblack-5 text-richblack-700 placeholder:text-richblack-300 placeholder:text-lg border-none rounded-lg p-2"
            />
            {
                errors.courseExperience && (
                    <span>Please Add your Experience</span>
                )
            }
          </div>
          {/* cancel and Save Button  */}
          <div className="flex gap-5  justify-end">
          <button
            className="bg-richblack-700 text-richblack-50 rounded-lg font-semibold p-2 hover:scale-95 text-[18px]  transition-all duration-200"
            onClick={() =>{
              setReviewModal(false)
              dispatch(setIsBlurred(false))
              dispatch(setLoading(false))
            }}
          >
            Cancel
          </button>

          <button
             className='bg-yellow-5 text-richblack-700 rounded-lg font-semibold px-2 py-1 hover:scale-95 text-[18px] w-fit transition-all duration-200'
            type="submit"
            
          >Save</button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default CourseReviewModal;
