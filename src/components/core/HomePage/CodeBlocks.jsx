import React from "react";
import CTAbutton from "../HomePage/Button"
import {FaArrowRight} from "react-icons/fa"
import { TypeAnimation } from "react-type-animation";



const codeBlocks = ({position ,heading,subheading,ctabutton1,ctabutton2,codeblocks, codecolor }) => {

    return (
        <div className={`flex ${position} lg:my-20  mt-10  gap-10 justify-betweeen w-[90%] mx-auto `}>
            {/* Section 1  */}
            <div className={`md:w-[45%] w-[90%] mx-auto flex flex-col gap-8 `}>
                <div className="md:text-2xl sm:text-xl text-md md:font-bold font-semibold  ">
                    {heading}
                </div>
                <div className="font-bold text-richblack-300 md:max-w-[80%] w-100%">
                    {subheading}
                </div>
                <div className="flex gap-4 ">
                    <CTAbutton active={ctabutton1.active} linkto={ctabutton1.linkto}>
                        {ctabutton1.btntext}
                    </CTAbutton>
                    <CTAbutton active={ctabutton2.active} linkto={ctabutton2.linkto}>
                        <div className="flex gap-4 items-center">
                            {ctabutton2.btntext}
                            <FaArrowRight/>
                        </div>
                    </CTAbutton>
                </div>

            </div>

            {/* Section 2  */}
            <div className="flex h-fit md:w-[45%] w-[90%] md:overflow-hidden  relative ">


                <div className="flex flex-col text-center w-[10%]">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>
                <div className={`flex flex-col ${codecolor} md:w-[80%] w-90%  md:tracking-wide tracking-normal sm:text-lg text-sm`}>
                    <TypeAnimation
                        sequence={[codeblocks,1000,""]}
                        repeat={Infinity}
                        cursor={true}
                        omitDeletionAnimation={false}
                        style={
                            {   
                                whiteSpace:"pre-line",
                                display:"block",
                                
                            }
                        }
                    />

                </div>

            </div>
        </div>
    )
}

export default codeBlocks