import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import Spinner from "../../../common/Spinner";
import InstructorChart from "./InstructorChart";
import { Link } from "react-router-dom";
import { FaHandsClapping } from "react-icons/fa6";

const Instructor = () => {
  const { token,isBlurred,loading } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [spinnerLoading, setSpinnerLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    const getCourseDataWithStats = async () => {
      setSpinnerLoading(true);
      const instructorApiData = await getInstructorData(token,dispatch);
      const instructorCourses = await fetchInstructorCourses(token,dispatch);

      console.log("Instructor Api Data", instructorApiData);
      console.log("Instructor curses Datta", instructorCourses);

      if (instructorApiData.length) {
        setInstructorData(instructorApiData);
      }
      if (instructorCourses) {
        setCourses(instructorCourses);
      }
      setSpinnerLoading(false);
    };
    getCourseDataWithStats();
  }, []);

  const totalIncome = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );
  const totalStudent = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentEnrolled,
    0
  );
  return (
    <div className={`text-white xl:w-[70%]  lg:w-[80%] md:w-[85%] sm:w-[90%] w-[95%] mx-auto flex flex-col gap-5  ${isBlurred ? "blur-sm" : ""}`}>
      <div className="text-xl flex flex-col gap-3">
        <div className="text-xl flex gap-5">
          <p>Hi {user?.firstName}</p>
          {/* <FaHandsClapping className="text-yellow-100" /> */}
        </div>

        <p>Start's Something New</p>
      </div>
      {spinnerLoading ? (
        <Spinner />
      ) : courses.length > 0 ? (
        <div className="flex flex-col gap-20 ">
          <div className="flex md:flex-row flex-col-reverse gap-y-5 w-full justify-between border-b border-richblack-200 pb-10">
            <InstructorChart courses={instructorData} />
            <div className="flex flex-col gap-5  md:w-[20%] w-full h-fit rounded-2xl bg-richblack-700 xl:px-10 lg:px-7 md:px-5 sm:px-10 px-2 py-5 border">
              <p className="font-semibold text-2xl md:text-center sm:text-start text-center">Statistics</p>
             <div className="flex md:flex-col flex-wrap gap-5 justify-between">
             <div className="flex flex-col gap-1 mx-auto">
                <p >Total Courses</p>
                <p  className="text-richblack-300">{courses.length}</p>
              </div>
              <div className="flex flex-col gap-1 mx-auto">
                <p>Total Student's</p>
                <p className="text-richblack-300">{totalStudent}</p>
              </div>
              <div className="flex flex-col gap-1 mx-auto">
                <p>Total Income</p>
                <p className="text-richblack-300">Rs  {totalIncome.toFixed(2)}</p>
              </div>
             </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex justify-between text-xl">
              <p>Your Courses</p>
              <Link onClick={loading && ((e)=>e.preventDefault())} to="/dashboard/my-courses">
                <p className="text-yellow-100 ">view all</p>
              </Link>
            </div>
            <div className="flex flex-wrap justify-between gap-4 items-center ">
              {courses.slice(0, 3).map((course, index) => (
                <div key={index} className="flex flex-col gap-5 w-[32%] min-w-[200px]  h-[250px] pt-2 px-2 rounded-lg  bg-richblack-800 border mx-auto ">
                  <div className="w-[100%] h-[60%] rounded-md overflow-hidden">
                    <img src={course.thumbnail} className=" w-full h-full object-cover " />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className=" capitalize">{course.courseName}</p>
                    <div className="flex gap-2 text-richblack-300">
                      <p>{course.studentEnrolled.length} students</p>
                      <p> | </p>
                      <p>Rs {course.price.toFixed(2)} /-</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>You Have not created any course yet</p>
          <Link onClick={loading && ((e)=>e.preventDefault())} to="/dashboard/add-course">Create Course</Link>
        </div>
      )}
    </div>
  );
};

export default Instructor;
