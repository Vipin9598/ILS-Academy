import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimelineImage  from "../../../assets/Images/TimelineImage.png"

const data =[
    {
        Logo:Logo1,
        Heading:"Leadership",
        Description:"Fully commited to the success company"
    },
    {
        Logo:Logo2,
        Heading:"Responsibility",
        Description:"Students will always be our top priority"
    },
    {
        Logo:Logo3,
        Heading:"Flexibility",
        Description:"The ability to switch is an important skills"
    },
    {
        Logo:Logo4,
        Heading:"Solve The problem",
        Description:"Code your way to a solution"
    },
]

const TimelineSection = ()=>{
    return(
        <div className="flex sm:flex-row flex-col gap-5 justify-evenly w-full mt-10 relative">
            <div className="flex flex-col gap-5  sm:w-[45%] w-full mt-16">

                {
                    data.map( (element,index)=>{
                        return (
                            <div className="flex lg:gap-6 sm:gap-4 gap-8 " key={index}>
                                <div className=" bg-white w-10 h-10 rounded-full flex items-center justify-center">
                                    <img src={element.Logo}/>
                                </div>
                                <div>
                                    <h2 className="font-bold md:text-lg sm:text-base text-lg ">{element.Heading}</h2>
                                    <p className="md:text-base sm:text-sm text-base">{element.Description}</p>
                                </div>
                            </div>
                        )
                    } )
                }

            </div>

            {/* right part */}
            <div className="relative items-center flex">
                <img src ={TimelineImage}  className="  xl:h-[450px] lg:h-[380px] md:h-[320px] sm:h-[250px] h-full  "/>
                {/* <div className="h-[300px] w-[550px] absolute bg-gradient-to-b from-blue-200  to-blue-500 opacity rounded-full "></div> */}
            </div>

            {/* absolute box */}
            <div className="flex sm:flex-row flex-col items-center lg:gap-5 gap-3 absolute bg-caribbeangreen-700 lg:py-5 md:py-3 sm:py-1 lg:px-6 sm:px-2  md:bottom-[-10%]  md:left-[45%] sm:left-[45%] sm:bottom-[10%] bottom-[-10%]
            left-[25%] z-5 ">
                <div className="flex lg:gap-5 gap-3 items-center  px-2">
                    <p className=" font-bold lg:text-3xl md:text-2xl text-xl text-white ">10</p>
                    <p className=" text-caribbeangreen-200 md:text-lg text-sm max-w-[100px]">Years of Experience</p>
                </div>
                <div className="sm:w-1 sm:h-16 w-32 h-1 bg-caribbeangreen-400"></div>
                <div className="flex flex-row lg:gap-5 gap-3 items-center ">
                    <p className=" font-bold lg:text-3xl sm:text-2xl text-xl  text-white ">250</p>
                    <p className=" text-caribbeangreen-200 md:text-lg text-sm max-w-[100px]">Types of Courses</p>
                </div>
            </div>
        </div>
    )
}

export default TimelineSection