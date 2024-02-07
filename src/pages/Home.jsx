import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAbutton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import Review from "../components/common/Review";
import TabSection from "../components/core/HomePage/TabSection";
import Banner from "../assets/Images/banner.mp4";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import SwissLearning from "../components/core/HomePage/SwissLearning";
import Instructor from "../assets/Images/Instructor.png";
import Footer from "../components/common/Footer";
import { useSelector } from "react-redux";

const Home = () => {
  const {isBlurred,loading} = useSelector((state)=>state.auth)
  return (
    <div className={` ${isBlurred ? "blur-sm" : ""} w-screen`} overflow-y-hidden >
      {/* Section 1 */}
      <div className=" relative mx-auto flex flex-col mt-[56px] w-[95%] md:w-10/12 items-center text-white justify-between overflow-hidden">
        <Link onClick={loading ? (e)=>e.preventDefault() : ""} to={"/signup"} className="mt-16">
          <div className=" group  transition-all duration-200 hover:scale-95 bg-richblack-800  rounded-full w-fit">
            <div className="flex gap-3 relative items-center py-2 px-3 transition-all duration-200 group-hover:bg-richblack-900 w-fit">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="  gap-2 inline lg:text-4xl md:text-3xl sm:text-2xl text-xl max-sm:flex-col    mt-6 font-bold">
          Empower Your Future With <HighlightText text={"Coding Skills"} />
        </div>

        <div className="mt-4 md:w-[70%] w-full   text-center font-semibold lg:text-lg  sm:text-base  text-sm mx-auto">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className=" flex md:gap-10  sm:gap-5 gap-3 mt-8">
          <CTAbutton  active={true} linkto={"/signup"}>
            Learn More
          </CTAbutton>

          <CTAbutton active={false} linkto={"/login"}>
            Book a Demo
          </CTAbutton>
        </div>

        <div className="relative w-full flex items-center justify-center mt-12">
          <div className="h-[100%]  sm:w-[60%] w-[90%]  bg-white absolute  sm:left-[21%]  sm:top-3 left-9 top-2 z-0 "></div>
          <video
            muted
            autoPlay
            loop
            className=" z-30 sm:h-[40%] sm:w-[60%] w-[90%] object-cover"
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* code <section></section> */}
        <div className="flex flex-col">
          {/* code section 1 */}
          <div className="lg:mt-12 md:mt-10 mt-8">
            <CodeBlocks
              position={"md:flex-row flex-col "}
              heading={
                <div>
                  Unlock Your <HighlightText text={"coding potential"} /> with
                  our online courses
                </div>
              }
              subheading={
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              }
              ctabutton1={{
                btntext: "Try it Yourself",
                active: true,
                linkto: "/signup",
              }}
              ctabutton2={{
                btntext: "Learn more",
                active: false,
                linkto: "/login",
              }}
              codeblocks={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a></h1>\n<nav><ahref="one/">One</a>\n<ahref="two/">Two</a>\n<ahref="three/">Three</a>\n</nav>`}
              codecolor={"text-yellow-25"}
            />
          </div>

          {/* code section 2 */}

          <div className="lg:mt-12 md:mt-10 mt-8 ">
            <CodeBlocks
              position={"md:flex-row-reverse  flex-col"}
              heading={
                <div>
                  Start <HighlightText text={"Coding In Seconds"} />
                </div>
              }
              subheading={
                "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
              }
              ctabutton1={{
                btntext: "Continue Lesson",
                active: true,
                linkto: "/signup",
              }}
              ctabutton2={{
                btntext: "Learn more",
                active: false,
                linkto: "/login",
              }}
              codeblocks={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a></h1>\n<nav><ahref="one/">One</a>\n<ahref="two/">Two</a>\n<ahref="three/">Three</a>\n</nav>`}
              codecolor={"text-yellow-25"}
            />
          </div>
        </div>

        <TabSection />
      </div>
      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        {/* bg-image section */}
        <div className="homepage_bg h-[333px]">
          <div className=" w-full h-full flex items-center  lg:gap-8 justify-center md:gap-5 sm:gap-3 gap-2">
            <CTAbutton active={true} linkto="/signup">
              <div className="flex items-center gap-3">
                Explore Full Catalog
                <FaArrowRight />
              </div>
            </CTAbutton>

            <CTAbutton active={false} linkto="/login">
              Learn More
            </CTAbutton>
          </div>
        </div>
        {/* bacha hua  part of section 2  */}
        <div className=" w-10/12 mx-auto ">
          <div className="flex justify-evenly sm:flex-row flex-col h-[200px] py-8 mt-4 gap-10">
            <div className="lg:text-3xl text-2xl font-semibold  md:w-[40%] sm:w-[50%] w-full">
              Get the skills you need for a{" "}
              <HighlightText text="job that is in Demand " />
            </div>
            <div className="flex flex-col  justify-between gap-2 sm:w-[45%] ">
              <p className="text-lg">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>
              <CTAbutton active={true} linkto={"/signup"}>
                Learn More
              </CTAbutton>
            </div>
          </div>

          <div>
            <TimelineSection />
            <SwissLearning />
          </div>
        </div>

        {/* <SwissLearning/> */}
      </div>
      {/* Section 3 */}
      <div className=" relative mx-auto flex sm:flex-row flex-col w-10/12  items-center text-white lg:gap-32 md:gap-24 gap-10 my-8 py-8 overflow-hidden ">
        <div className="w-fit h-fit border-t-8 border-l-8 pt-2 pl-2 ">
          {/* absolute image  */}
          <img
            src={Instructor}
            alt="InstructorImage"
            // className="absolute bottom-[-3%] left-4"
          />
        </div>

        <div className="flex flex-col gap-5 py-5">
          <div className="md:text-2xl text-xl  text-start">
            <p className="lg:mx-2">Become an</p>
            <HighlightText text={"Instructor"} />
          </div>
          <p className="text-lg mx-2 mb-5 max-w-[500px]">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>
          <CTAbutton active={true} linkto={"/signup"}>
            <div className="flex gap-3 items-center">
              Start Teaching Today
              <FaArrowRight />
            </div>
          </CTAbutton>
        </div>
      </div>
      c{/* Review  */}
      <Review />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
