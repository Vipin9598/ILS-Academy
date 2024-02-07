import React, { useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import { useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import Spinner from "../../common/Spinner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const EnrolledCourses = () => {
  const { token, isBlurred, loading } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const TimeFormatter= (seconds) => {
    var ans = ""
  if(seconds>=3600){
    const hours = Math.floor(seconds / 3600);
    ans+=hours.toString() + "Hr "
    seconds=seconds%3600
  }
  if(seconds>=60){
    const minutes = Math.floor((seconds % 3600) / 60);
    ans +=minutes.toString() + "Min "
    seconds=seconds%60;
  }
  
  if(seconds>0){
    ans+=seconds.toString()+"Sec"
  }
  return ans;
  }

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token, dispatch);
      response.forEach((course) => {
        let totalLecture = 0;
        let totalTime = 0;

        for (let i = 0; i < course?.courseContent.length; i++) {
          for (
            let j = 0;
            j < course?.courseContent[i]?.subSection.length;
            j++
          ) {
            totalTime += parseInt(
              course?.courseContent[i]?.subSection[j].timeDuration
            );
            totalLecture++;
          }
        }
        const courseProgressIndex = user.courseProgress.findIndex((item)=>item.courseId == course._id)
         const completedLecture = user.courseProgress[courseProgressIndex]?.completedVideos.length
        course.progressPercentage = (completedLecture/totalLecture)*100;
        course.totalDuration = TimeFormatter(totalTime);
        

      });
      setEnrolledCourses(response);
    } catch (error) {
      console.log("errror aa agya while fetchng teh details",error);
    }
  };


  useEffect(() => {
    getEnrolledCourses();
  }, []);

  

  return (
    <div
      className={`text-richblack-50 xl:px-10  md:px-5  sm:px-10 px-3 xl:w-[80%] lg:w-[95%] w-[97%] mx-auto flex flex-col gap-10  ${
        isBlurred ? "blur-lg" : ""
      }`}
    >
      <>
        <div className="text-3xl text-richblack-50">Enrolled Courses</div>
        {!enrolledCourses ? (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        ) : !enrolledCourses.length ? (
          <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
            You have not enrolled in any course yet.
            {/* TODO: Modify this Empty State */}
          </p>
        ) : (
          <div className="my-8 text-richblack-5">
            {/* Headings */}
            <div className="flex rounded-t-lg bg-richblack-500 ">
              <p className="w-[45%] px-5 py-3">Course Name</p>
              <p className="w-1/4 px-2 py-3">Duration</p>
              <p className="flex-1 px-2 py-3">Progress</p>
            </div>
            {/* Course Names */}
            {enrolledCourses.map((course, i, arr) => (
              <div
                className={`flex items-center border border-richblack-700 ${
                  i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                }`}
                key={i}
              >
                <div
                  className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    );
                  }}
                >
                  <img
                    src={course.thumbnail}
                    alt="course_img"
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                  <div className="flex max-w-xs flex-col gap-2">
                    <p className="font-semibold">{course.courseName}</p>
                    <p className="text-xs text-richblack-300">
                      {course.courseDescription.length > 50
                        ? `${course.courseDescription.slice(0, 50)}...`
                        : course.courseDescription}
                    </p>
                  </div>
                </div>
                <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
                <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                  <p>Progress: {course.progressPercentage || 0}%</p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    </div>
  );
};

export default EnrolledCourses;
