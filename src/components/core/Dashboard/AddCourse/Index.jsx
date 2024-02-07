import React from "react";
import RenderSteps from "./RenderSteps";
import { BsLightningChargeFill } from "react-icons/bs";
import { useSelector } from "react-redux";
const TipsData = [
  "Set the Course Price option or make it free.",
  "Standard size for the course thumbnail is 1024x576.",
  "Video section controls the course overview video.",
  "Course Builder is where you create & organize a course.",
  "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
  "Information from the Additional Data section shows up on the course single page.",
  "Make Announcements to notify any important",
  "Notes to all enrolled students at once.",
];


// image baki h lgani thumbnail 
const AddCourse = () => {
  const {isBlurred} = useSelector((state)=>state.auth)
  return (
    <div className={`text-richblack-50 xl:w-[80%] lg:w-[92%] md:w-[97%] mx-auto  flex flex-col gap-8 py-5  ${isBlurred ? "blur-sm" : ""} `}>
        <h1 className=" text-2xl md:ml-0 sm:ml-10 sm:text-start text-center">Add Course</h1>
      <div className="flex md:flex-row flex-col-reverse  gap-10 ">
        <div className=" md:w-[60%] sm:w-[90%] w-[95%] mx-auto">
          
          <RenderSteps />
        </div>
        <div className="flex flex-col gap-2  md:ml-0 sm:ml-10 mx-2 md:max-w-[30rem] w-full">
          <div className="flex gap-2">
            <BsLightningChargeFill className="text-yellow-300 text-xl " />
            <p>Course Upload Tips</p>
          </div>

          <div>
            <ul>
              {TipsData.map((tip, index) => {
                return <li key={index} className="">{tip}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
