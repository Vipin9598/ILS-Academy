import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-hot-toast"
import { Outlet, useLocation, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  updateCompletedLectures,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import VideoDetailSideBar from "../components/core/viewCourse/VideoDetailSideBar";
import CourseReviewModal from "../components/core/viewCourse/CourseReviewModal";
import Spinner from "../components/common/Spinner";
import { setIsBlurred,setLoading } from "../slices/authSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuCross } from "react-icons/lu";
import { resetViewCourse } from "../slices/viewCourseSlice";

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const [hamActive,setHamActive] = useState(false)
  const [spinnerLoading,setSpinnerLoading] = useState(true)
  const { courseId,subSectionId } = useParams();
  const { token ,isBlurred} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {courseSectionData} = useSelector((state)=>state.viewCourse)
  

  useEffect(() => {
    
    const setCourseSpecificDetails = async () => {
      try{
        const courseData = await getFullDetailsOfCourse(courseId, token,dispatch);
      console.log("courseData",courseData.courseDetails)
       dispatch(setEntireCourseData(courseData.courseDetails));
      
      dispatch(
        setCourseSectionData(courseData.courseDetails.courseContent)
      );
       dispatch(setTotalNoOfLectures(courseData.totalLecture));
       dispatch(setCompletedLectures(courseData.completedVideos));
      }
      catch(error){
        toast.error(error.message)
      }
      setSpinnerLoading(false)
      // console.log("courseData",courseData.courseDetails)
      
    };
    setCourseSpecificDetails();
  }, []);



  return (
    <div className="mt-[56px]" >
      {spinnerLoading ? (
        <Spinner />
      ) : (
        <div className={` ${isBlurred ? "blur-sm":""} flex h-[calc(100vh-3.5rem)] relative`}>
          <div className="md:block hidden">
          <VideoDetailSideBar setReviewModal={setReviewModal} />
          </div>
          <div className="md:hidden  flex flex-col  text-richblack-5  text-xl ">
          <div className={` ${hamActive ? "bg-richblack-700 pt-5 pl-5" :"pl-2 pt-2" }`}>
          {!hamActive ? (
                <GiHamburgerMenu
                onClick={() => {
                  setIsBlurred(true);
                  setHamActive(true);
                }} className=" text-white"
                />
              ) : (
                <LuCross
                  className="rotate-45  text-white"
                  onClick={() => {
                    setIsBlurred(false);
                    setHamActive(false);
                  }} 
                />
              )}
          </div>
              {
                hamActive && (
                  <VideoDetailSideBar setReviewModal={setReviewModal} />
                )
              }
          </div>
          <div className="h-[calc(100vh-3.5rem)] md:w-[80%] w-[100%] overflow-hidden mb-5">
            {
              courseSectionData && (
                <div className="mx-auto md:w-[80%] w-[100%]  h-full">
              <Outlet />
            </div>
              )
            }
          </div>
        </div>
      )}

      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}

    </div>
  );
};

export default ViewCourse;
