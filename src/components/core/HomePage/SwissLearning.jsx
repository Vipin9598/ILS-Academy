import React from "react";
import HighlightText from "./HighlightText";
import image1 from "../../../assets/Images/Know_your_progress.svg"
import image2 from "../../../assets/Images/Compare_with_others.png"
import image3 from "../../../assets/Images/Plan_your_lessons.png"
import CTAbutton from "./Button"

const SwissLearning = ()=>{
    return(
        <div className=" flex flex-col gap-5 justify-evenly w-full mt-[10rem]">
            <div className="flex flex-col gap-5 items-center justify-center">
                <div className="md:flex inline-block lg:text-4xl  md:text-3xl sm:text-2xl text-xl">
                    <p className="font-semibold  ">Your Swiss Knife for{" "}</p>
                    <HighlightText text={"learning any language"}  />
                </div>
                <div className="text-lg max-w-3xl text-center text-black font-inter"> 
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>
            </div>
            <div className="w-full  flex md:flex-row flex-col items-center  justify-center relative p-2  mt-5 md:h-[500px]">
                <img src={image1} className="md:-mr-[10%] md:-mb-[0%] -mb-[15%] lg:w-[380px] md:w-[270px] sm:w-[320px] w-[250px]"/>
                <img src={image2} className="lg:w-[380px] md:w-[270px] sm:w-[320px] w-[250px]"/>
                <img src={image3} className="md:-ml-[12%]  md:-mt-[0%] -mt-[20%] lg:w-[400px] md:w-[270px] sm:w-[320px] w-[250px]"/>

            </div>
            <div className=" flex items-center justify-center  mt-7 mb-5">
                <CTAbutton active={true} linkto="/signup">
                    Learn More 
                </CTAbutton>
            </div>
        </div>
    )
}

export default SwissLearning