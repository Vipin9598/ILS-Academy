import React from "react";
import { useSelector } from "react-redux";
import { GiCheckMark } from "react-icons/gi";
import { FaCheck } from "react-icons/fa"
import CourseInformationForm from "./CourseInformationForm/CourseInformationForm"
import CourseBuilderForm from "./CourseBuilderForm/CourseBuilderForm"
import PublishCourse from "./PublishCourse/PublishCourse";

const steps = [
  {
    id: 1,
    type: "Course Information",
  },
  {
    id: 2,
    type: "Course Builder",
  },
  {
    id: 3,
    type: "Publish",
  },
];

const RenderSteps = () => {
  const { currentStep } = useSelector((state) => state.course);
  return (
    <div className="w-full ">
      <div className=" flex flex-col gap-2">
        {/* <div className="  flex w-[90%] lg:ml-7">
          {steps.map((step) => {
            return (
              <div key={step.id} className="flex gap-0 items-center">
                <p
                  className={`${
                    step.id === currentStep
                      ? "bg-yellow-900 outline-yellow-50 outline-1 outline text-yellow-50"
                      : "bg-richblack-700 text-richblack-50 border-richblack-50"
                  } ${
                    step.id < currentStep && "bg-yellow-50"
                  } w-12 h-12 aspect-square rounded-full flex items-center justify-center my-auto text-xl`}
                >
                  <>
                    {step.id < currentStep ? (
                      <GiCheckMark className="text-richblack-900 " />
                    ) : (
                      `${step.id}`
                    )}
                  </>
                </p>
                {step.id < steps.length && (
                  <div
                    className={`border-dashed border-t-2 lg:w-[14rem] md:w-[12rem] w-[10rem]  sm:w-[15rem] h-1 ${
                      step.id < currentStep
                        ? "border-yellow-50"
                        : "border-richblack-50"
                    }`}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mb-5 ">
            {steps.map((step, index) => {
              return (
                <div>
                  <span key={index}>{step.type}</span>
                  <div
                    className={`lg:w-[14rem] md:w-[12rem] w-[6rem]  sm:w-[18rem] h-1`}
                  ></div>
                </div>
              )
            })}
        </div> */}
        <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item) => (
          <>
            <div
              className="flex flex-col items-center "
              key={item.id}
            >
              <button
                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                  currentStep === item.id
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                } ${currentStep > item.id && "bg-yellow-50 text-yellow-50"}} `}
              >
                {currentStep > item.id ? (
                  <FaCheck className="font-bold text-richblack-900" />
                ) : (
                  item.id
                )}
              </button>
              
            </div>
            {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                    currentStep > item.id  ? "border-yellow-50" : "border-richblack-500"
                } `}
                ></div>
              </>
            )}
          </>
        ))}
      </div>

      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <>
            <div
              className="flex min-w-[130px] text-sm textStep flex-col items-center gap-y-2"
              key={item.id}
            >
              
              <p
                className={` ${
                  currentStep >= item.id ? "text-richblack-5" : "text-richblack-500"
                }`}
              >
                {item.type}
              </p>
            </div>
            
          </>
        ))}
      </div>

        {
            currentStep === 1 && <CourseInformationForm />
        }
        {
            currentStep === 2 && <CourseBuilderForm />
        }
         {
            currentStep === 3 && <PublishCourse/>
        }
      </div>
    </div>
  );
};

export default RenderSteps;
