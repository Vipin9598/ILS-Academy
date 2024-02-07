import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/operations/PaymentAPI";
import { useEffect } from "react";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import Spinner from "../components/common/Spinner";
import { useState } from "react";
import GetAvgRating from "../utils/AvergeRating";
import RatingStars from "../components/common/RatingStars";
import { formattedDate } from "../utils/TimeFormatter";
import { RiComputerLine } from "react-icons/ri";
import { BsDot } from "react-icons/bs";
import Footer from "../components/common/Footer";
import { PiCursorLight } from "react-icons/pi";
import { FaMobileScreen } from "react-icons/fa6";
import { PiCertificate } from "react-icons/pi";
import { CiTimer } from "react-icons/ci";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { toast } from "react-hot-toast";
import {ACCOUNT_TYPE} from "../utils/constants"
const CourseDetail = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  console.log("cart", cart);
  const dispatch = useDispatch();
  const location = useLocation()
  const navigate = useNavigate();
  const { courseId } = useParams();
  console.log("courseId", courseId);
  const { isBlurred, loading } = useSelector((state) => state.auth);
  const [showSection, setShowSection] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [itemInCart, setItemInCart] = useState(false);
  const [isItemBuyed, setIsItemBuyed] = useState(false);
  const [avgReviewCount, setAverageReviewCount] = useState(0);

  useEffect(() => {
    const getCourseDetail = async () => {
      const CourseDetail = await fetchCourseDetails(courseId, dispatch);
      console.log("courseData.......", CourseDetail.data);
      await setCourseData(CourseDetail.data);
    };
    getCourseDetail();
  }, []);

  useEffect(() => {
    const count = GetAvgRating(courseData?.ratingANDreviews);
    setAverageReviewCount(count);

    if (user?.courses.includes(courseId)) {
      setIsItemBuyed(true);
    } else {
      setIsItemBuyed(false);
    }
    const index = cart.findIndex((item)=>item._id === courseId)
    if (!isItemBuyed && index>=0) {
      setItemInCart(true);
    } else {
      if (!isItemBuyed) {
        setItemInCart(false);
      }
    }
  },[courseData]);

  const handlesectionChange = () => {
    setShowSection(!showSection);
  };

  const handleBuyCourse = () => {

    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
      return;
    }
  };

  const TimeFormatter= (totalTime) => {
    
    var seconds = parseFloat(totalTime).toFixed(2);
    var ans="";
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

  let totalLecture = 0;
  let totalTime = 0;

  for (let i = 0; i < courseData?.courseContent.length; i++) {
    var sectionTime=0;
    for (let j = 0; j < courseData?.courseContent[i]?.subSection.length; j++) {
      sectionTime += parseInt(
        courseData?.courseContent[i]?.subSection[j].timeDuration
      );
      courseData.courseContent[i].subSection[j].subsectionTime = TimeFormatter(courseData?.courseContent[i]?.subSection[j].timeDuration)
      totalLecture++;
    }
    courseData.courseContent[i].sectionTime = TimeFormatter(sectionTime)
    totalTime+=sectionTime;
  }
  const timeDuration = TimeFormatter(totalTime)


  const cartHandler = async (data) => {
    const index = cart.findIndex((course) => course._id === courseId);
    console.log("container", index);
    if (index >= 0) {
      console.log("remove", courseId);
      dispatch(removeFromCart(courseId));
      setItemInCart(false);
    } else {
      console.log("add", courseData);
      dispatch(addToCart(courseData));
      setItemInCart(true);
    }
  };

  const course_created_date = formattedDate(courseData?.createdAt);
  return (
    <div className={` text-white mt-[56px]  ${isBlurred ? "blur-sm" : ""}`}>
      {courseData ? (
        <div className="text-richblack-50 flex flex-col gap-8">
          <div className="  bg-richblack-800 relative pb-5">
            <div className="lg:w-10/12 md:w-[11/12] w-[95%] mx-auto  ">
              <div className="md:w-[62%] sm:w-[70%]  w-fit  flex flex-col md:gap-3 gap-2 py-10 lg:text-lg text-[16px]  sm:mx-0 mx-auto">
                <p className="text-richblack-300">
                  Home / Learning /
                  <span className="text-yellow-100">
                    {" "}
                    {courseData?.category?.name}
                  </span>
                </p>
                <p className="text-xl">{courseData?.courseName}</p>
                <p className="text-richblack-300">
                  {courseData?.courseDescription}
                </p>
                <div className="flex flex-wrap gap-2 ">
                  <p className="text-yellow-100 ">{avgReviewCount}</p>
                  <RatingStars Review_Count={avgReviewCount} />
                  <span>( {courseData?.ratingANDreviews?.length} Rating )</span>
                  <span>{courseData?.studentEnrolled.length} students</span>
                </div>
                <p className="">
                  Created by{" "}
                  <span>
                    {courseData?.instructor?.firstName}{" "}
                    {courseData?.instructor?.lastName}
                  </span>
                </p>
                <p className="">Created at {course_created_date}</p>
              </div>
            </div>
            {/* absolute <div></div> */}

            <div className="sm:absolute  sm:bg-richblack-600  bg-richblack-700   flex sm:flex-col   lg:top-10  courseBuyCard xl:right-52  lg:right-32  md:right-20 sm:right-[5px] w-fit sm:p-0 p-5 rounded-md mx-auto courseBuyModal">
              <div className=" w-[16rem] ">
                <img
                  src={courseData.thumbnail}
                  className=" lg:w-full  md:w-[90%] mx-auto lg:h-[180px] md:h-[150px]  sm:h-[120px] imgCourse object-cover"
                />
              </div>
              <div className="px-2">
                <div className="lg:p-2 p-1 flex flex-col gap-2">
                  <p>Rs {courseData.price} /-</p>
                  {user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (isItemBuyed ? (
                    <></>
                  ) : (
                    <button
                      disabled={loading}
                      className="px-5 lg:py-2 py-1  text-richblack-900 rounded-md bg-yellow-100"
                      onClick={
                        token === null ? () => navigate("/login") : cartHandler
                      }
                    >
                      {itemInCart ? "Remove From Cart" : "Add To Cart"}{" "}
                    </button>)
                  )}
                  {user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                    <button
                      disabled={loading}
                      onClick={
                        token === null
                          ? () => navigate("/login")
                          :( isItemBuyed
                          ? () =>
                              navigate(
                                `/view-course/${courseData?._id}/section/${courseData.courseContent[0]._id}/sub-section/${courseData.courseContent[0].subSection[0]._id}`
                              )
                          : () => handleBuyCourse())
                      }
                      className="text-richblack-25 bg-richblack-900 rounded-md px-5 lg:py-2 py-1"
                    >
                      {isItemBuyed ? "Go To Course" : "Buy Course"}
                    </button>
                  )}
                </div>

                <p className="text-richblack-25 mx-auto text-[15px] text-center">
                  30-Day Money-Back Guarantee
                </p>
                <div className="flex flex-col md:gap-2 gap-1 lg:py-2 py-1">
                  <p>This course includes:</p>

                  <div className="flex gap-1 items-center text-caribbeangreen-200 lg:h-fit h-0 overflow-hidden">
                    <CiTimer />
                    <p>{timeDuration} on-demand video</p>
                  </div>

                  <div className="flex gap-1 items-center   text-caribbeangreen-200">
                    <PiCursorLight />
                    <p>Full Lifetime access</p>
                  </div>

                  <div className="flex gap-1 items-center lg:h-fit h-0 overflow-hidden  text-caribbeangreen-200">
                    <FaMobileScreen />
                    <p>Access on Mobile and TV</p>
                  </div>

                  <div className="flex gap-1 items-center  text-caribbeangreen-200">
                    <PiCertificate />
                    <p>Certificate of completion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* niche vala section*/}

          {/* course data  */}
          <div className="lg:w-10/12 md:w-[11/12] w-[95%] mx-auto flex flex-col gap-3 mt-5">
            {/* what will you learn section  */}
            <div className=" lg:w-[60%] sm:w-[80%] w-[95%]    border border-richblack-600 p-5 flex flex-col gap-5">
              <p className="text-white lg:text-2xl md:text-xl sm:text-lg text-sm">
                What {"  "} you'will {"  "} learn
              </p>
              <p>{courseData?.whatYouWillLearn}</p>
            </div>

            {/* course Content Section  */}

            <div className="lg:w-[62%]  sm:w-[80%] w-[95%]  py-5 flex flex-col gap-5">
              <p className="text-white lg:text-2xl sm:text-xl text-lg ">Course Content</p>
              <details>
                <summary
                  className="text-richblack-50 flex flex-col"
                  onClick={handlesectionChange}
                >
                  <div className="flex justify-between">
                    <div className="flex flex-wrap  sm:gap-1 gap-[2px] items-center  text-[15px]">
                      <p>{courseData?.courseContent.length} Sections</p>
                      <BsDot className="" />
                      <p>{totalLecture} Lecture </p>
                      <BsDot className=" " />
                      <p>Duration : {timeDuration}</p>
                    </div>
                    <div className="text-yellow-100 w-fit cursor-pointer  text-[15px]">
                      {showSection ? (
                        <p>Collapse all sections</p>
                      ) : (
                        <p>Show all sections</p>
                      )}
                    </div>
                  </div>
                </summary>
                <div>
                  {courseData?.courseContent.map((section) => (
                    <details className="border border-richblack-600 text-richblack-50">
                      <summary className="flex justify-between bg-richblack-700 sm:py-2 py-1  text-[15px]">
                        <p className="px-5 text-richblack-5">
                          {section.sectionName}
                        </p>
                        <p className="px-5">{section.sectionTime}</p>
                      </summary>
                      {section.subSection.map((subSection) => (
                        <details className="px-5 lg:py-3 sm:py-2 py-1 flex flex-col gap-1 border-b mb-[5px] ">
                          <summary className="flex justify-between text-[14px]">
                            <div className="flex gap-2 py-1 items-center">
                              <RiComputerLine />
                              <p className="text-richblack-5">
                                {subSection.title}
                              </p>
                            </div>
                            <p>{(subSection.subsectionTime)}</p>
                          </summary>
                          <div className="w-[90%] sm:text-[15px] text-[12px]">
                            Desc : {subSection.description}
                          </div>
                        </details>
                      ))}
                    </details>
                  ))}
                </div>
              </details>
              <div></div>
            </div>
          </div>

          {/* author */}
          <div className="w-10/12 mx-auto ">
            <div className="lg:w-[62%] md:w-[75%] sm:w-[85%] w-[95%] flex flex-col gap-5 text-[15px]">
              <p>Author</p>
              <div className="flex gap-5 items-center">
                <div className="sm:h-12 sm:w-12 h-10 w-10 rounded-full overflow-hidden">
                  <img
                    src={courseData.instructor.image}
                    className="object-cover"
                  />
                </div>
                <p>
                  {courseData.instructor.firstName}{" "}
                  {courseData.instructor.lastName}
                </p>
              </div>
              <p>
                I will be your lead trainer in this course. Within no time, I
                will help you to understand the subject in an easy manner. I
                have a huge experience in online training and recording videos.
                Let's get started!
              </p>
            </div>
          </div>

          {/* <Review></Review> */}
          <div className="w-10/12 mx-auto">
            <p className="text-white md:text-2xl sm:text-lg text-[15px] w-fit mx-auto">
              Reviews From Other Learner
            </p>
            {/* <ReviewSlider/> */}
          </div>
          <Footer />
        </div>
      ) : (
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
