import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/AboutUs/Quote";
import FoundingStory from "../assets/Images/FoundingStory.png";
import StatsComponent from "../components/core/AboutUs/StatsComponent";
import LearningGrid from "../components/core/AboutUs/LearningGrid";
import ContactFormSection from "../components/core/AboutUs/ContactFormSection";
import Footer from "../components/common/Footer";
import Review from "../components/common/Review"
import { useSelector } from "react-redux";
// import dotenv from 'dotenv'; 

const AboutUs = () => {


  const {isBlurred} = useSelector((state)=>state.auth)
  return (
    <div className={`pb-5 mt-[56px]  ${isBlurred ? "blur-sm" : ""}`}>
      {/* section 1 */}

      

      <section className="bg-richblack-700 border-b-2   border-richblack-100 relative pb-64">
        <div className="lg:w-10/12 md:w-11/12 w-full md:px-0 sm:px-5 px-2  mx-auto ">
          <div>
          <p className="text-richblack-50 md:text-xl text-lg  py-10 text-center">About Us</p>
            <header className="text-richblack-400 text-center lg:text-3xl md:text-2xl text-xl   ">
              Driving Innovation in Online Education for a<br/>
              <HighlightText text={"Brighter Future"} />
              <p className="md:text-lg  text-[16px] text-justify mt-10 lg:max-w-[65%] md:max-w-[75%] sm:max-w-[85%] max-w-[95%] mx-auto">
                Studynotion is at the forefront of driving innovation in online
                education. We're passionate about creating a brighter future by
                offering cutting-edge courses, leveraging emerging technologies,
                and nurturing a vibrant learning community.
              </p>
            </header>
            <div
              className="flex 
                  absolute -bottom-20 lg:ml-0 md:ml-[4rem] ml-[1rem] lg:gap-5   md:gap-[5rem]  gap-[4rem]" 
            >
              <img src={BannerImage1} alt="BannerImage" className=" xl:w-[350px] lg:w-[300px]  md:w-[300px] sm:w-[250px] h-auto w-[350px]" />
              <img src={BannerImage2}  alt="BannerImage" className="xl:w-[350px] lg:w-[300px]  md:w-[300px] sm:w-[250px] w-[0px] h-auto"/>
              <img src={BannerImage3}  alt="BannerImage" className="xl:w-[350px] lg:w-[300px]  w-[0px] "/>
            </div>
          </div>
          
        </div>
      </section>

      <div className="bg-richblack-900  border-b-2 border-richblack-300">
        <div className="w-10/12 mx-auto">
          <Quote />
        </div>
      </div>

      {/* section 2 */}

      <section className="my-16 ">

        <div className="text-richblack-5 flex flex-col gap-5 lg:w-10/12 md:w-11/12 w-full mx-auto xl:px-24 lg:px-16 md:px-8 sm:px-10 px-15">
            {/* founding story main <div></div> */}
            <div className="flex md:flex-row flex-col gap-y-5 justify-between mb-12">
              {/* founding story left part */}
              <div className="xl:w-[40%] md:w-[50%] w-[90%] mx-auto flex flex-col gap-5">
                <h1 className="text-brown-200 lg:text-2xl sm:text-xl text-lg">Our Founding Story</h1>

                <p className="text-base text-richblack-300 ">
                  Our e-learning platform was born out of a shared vision and
                  passion for transforming education. It all began with a group
                  of educators, technologists, and lifelong learners who
                  recognized the need for accessible, flexible, and high-quality
                  learning opportunities in a rapidly evolving digital world.
                </p>

                <p className="text-base text-richblack-300">
                  As experienced educators ourselves, we witnessed firsthand the
                  limitations and challenges of traditional education systems.
                  We believed that education should not be confined to the walls
                  of a classroom or restricted by geographical boundaries. We
                  envisioned a platform that could bridge these gaps and empower
                  individuals from all walks of life to unlock their full
                  potential.
                </p>
              </div>

              {/* founding story right part / image */}
              <div className="flex justify-center items-center">
                <img src={FoundingStory} width={400} alt="Founding Story" />
              </div>
            </div>

            {/* vision and  mission wala <div></div> */}
            <div className="flex md:flex-row flex-col gap-y-5 mt-10 justify-between mx-auto ">
              {/* left box */}
              <div className="flex flex-col gap-5 md:w-[45%]  w-[90%] mx-auto ">
                <p className="text-brown-200 text-2xl">Our Vision</p>
                <p className="text-base text-richblack-300 text-justify">
                  With this vision in mind, we set out on a journey to create an
                  e-learning platform that would revolutionize the way people
                  learn. Our team of dedicated experts worked tirelessly to
                  develop a robust and intuitive platform that combines
                  cutting-edge technology with engaging content, fostering a
                  dynamic and interactive learning experience.
                </p>
              </div>
              {/* right part */}
              <div className="flex flex-col gap-5 md:w-[45%]  w-[90%] mx-auto">
                <p className="text-blue-200 text-2xl">Our Mission</p>
                <p className="text-base text-richblack-300 text-justify">
                  our mission goes beyond just delivering courses online. We
                  wanted to create a vibrant community of learners, where
                  individuals can connect, collaborate, and learn from one
                  another. We believe that knowledge thrives in an environment
                  of sharing and dialogue, and we foster this spirit of
                  collaboration through forums, live sessions, and networking
                  opportunities.
                </p>
              </div>
            </div>
        </div>
      </section>

      {/* section 3 */}

      <section className="bg-richblack-700">
        <div className="lg:w-10/12 md:w-11/12 w-full mx-auto py-16">
          <StatsComponent />
        </div>
      </section>

      {/* section 4 */}

      <section>
        <div className="w-10/12 mx-auto">
          <LearningGrid />
          <ContactFormSection />
        </div>
      </section>

      {/* section 5 */}

      <section>
        <Review/>
      </section>

      {/* footer  */}
      <Footer/>

    </div>
  );
};

export default AboutUs;
