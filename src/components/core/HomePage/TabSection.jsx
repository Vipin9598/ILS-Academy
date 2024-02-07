import React, { useState } from "react";
import HighlightText from "./HighlightText";
import { HomePageExplore } from "../../../data/homepage-explore";
import {IoMdPeople} from "react-icons/io"
import {IoIosPerson} from "react-icons/io"

const tabsname = [
    'Free',
    'New to coding',
    'Most popular',
    'Skills paths',
    'Career paths'
]

const TabSection = ()=>{

    const [currentTab,setCurrentTab]=useState(tabsname[0]);
    const [courses,setCourses] = useState(HomePageExplore[0].courses)
    const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading)

    const setMyCard = async(value) => {
        setCurrentTab(value);
        
        const result = HomePageExplore.filter((course)=>course.tag===value)
        setCourses(result[0].courses)
        setCurrentCard(result[0].courses[0].heading)
    }
    const setCard = (value)=>{
        setCurrentCard(value.heading)
    }
     return (
        <div className="flex flex-col items-center mt-10  gap-5 my-5">
            <div className="flex gap-3 md:text-4xl text-2xl sm:flex-row flex-col">
                <p className="text-white">Unlock the </p>
                <HighlightText text={"Power of Code"}/> 
            </div>
            <p className="text-richblack-50">Learn to Build Anything You Can Imagine</p>

            {/* Tab Section  */}

            <div className="flex flex-wrap rounded-full sm:border border-white p-1 px-3 mb-10 ">
            {
                tabsname.map( (element,index)=>{
                    return (
                        <div className={`md:text-lg sm:text-md text-sm text-center lg:px-4 sm:px-2 px-[7px] py-2  transition-all duration-200 hover:text-richblack text-richblack-5 cursor-pointer ${currentTab===element?
                        "bg-richblack-200 text-richblack-900 font-medium rounded-full"
                        :"text-richblack-200 bg-richblack-900"}`}
                        key={index} onClick={()=>setMyCard(element)}>                          
                            {element } 

                        </div>
                    )
                })
            }
            </div>

            {/* card  */}

            <div className="flex sm:flex-wrap lg:gap-10 gap-5  items-center justify-center w-full my-10 sm:flex-row flex-col">
            {
                courses.map((element,index)=>{
                    return (
                        <div className={`flex flex-col cursor-pointer gap-10 px-2 py-4 justify-evenly md:h-[250px] min-h-[250px] xl:max-w-[23%] lg:max-w-[30%] md:max-w-[40%] sm:max-w-[60%] w-fit bg-richblack-800 text-richblack-100  ${currentCard===element.heading ? "border-r-8 border-yellow-25  border-b-8 box-border text-blue-300" : "border-none"} `}
                        onClick={()=>setCard(element)} key={index}>
                            <div className="flex flex-col gap-5 text-start">
                                <p className="font-bold sm:text-lg text-base text-richblack-50">{element.heading}</p>
                                <p className="text-richblack-200 sm:text-base text-sm">{element.description}</p>
                            </div>
                            <div className="flex gap-5 items-center border-dotted border-t pt-2 border-richblack-200">
                                <div className="flex gap-2 items-center">
                                    <IoMdPeople/>
                                    <p>{element.level}</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <IoIosPerson/>
                                    <p>{element.lessionNumber}</p>
                                    <p>Lessons</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div>

        </div>
     )
}

export default TabSection