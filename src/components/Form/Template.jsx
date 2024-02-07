import React, { useState } from "react";
import pattern from "../../assets/Images/frame.png";
import HighlightText from "../../components/core/HomePage/HighlightText";
import Loginform from "./Loginform";
import Signupform from "./Signupform";

const Template = ({ title, desc1, desc2, formType, image }) => {
  return (
    <div className="sm:w-[90%] w-[97%] mx-auto sm:justify-between mt-5 flex sm:flex-row flex-col-reverse justify-center items-center gap-y-20">
      <div className="flex flex-col lg:w-[50%] md:w-[55%] sm:text-xl text-lg gap-2">
        <p className=" font-bold sm:text-2xl text-xl text-richblack-400">{title}</p>

        <div className="flex flex-col gap-2 my-2">
          <p className=" md:text-xl sm:text-lg text-sm text-richblack-300">{desc1}</p>
          <div className="-ml-2 md:text-xl sm:text-xl text-sm flex justify-start">
            <HighlightText text={desc2} />
          </div>
        </div>

        {formType === "login" ? <Loginform /> : <Signupform />}
      </div>

      {/* Image Part */}
      <div className="relative mt-5">
        <img
          src={image}
          className="relative  z-10 object-cover xl:max-h-[450px] lg:max-h-[350px] md:max-h-[250px] sm:max-h-[200px]"
          alt="Login-Image"
        />

        <img
          src={pattern}
          alt="Pattern Image"
          className="absolute top-4 left-4 xl:max-h-[450px] lg:max-h-[350px] md:max-h-[250px] sm:max-h-[200px]"
        />
      </div>
    </div>
  );
};

export default Template;
