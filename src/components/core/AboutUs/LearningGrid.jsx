import React from 'react'
import HighlightText from '../HomePage/HighlightText';
import CTAButton from '../HomePage/Button';
import { useSelector } from 'react-redux';

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: "Rating Auto-grading",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
]; 

const LearningGrid = () => {
  const {loading} = useSelector((state)=>state.auth)
  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-y-0 gap-y-5 mx-auto my-20  text-richblack-50'>
      {
        LearningGridArray.map((card,index)=>{
          return(
            <div key={index} className={`${index === 0 && "col-span-2 bg-transparent"}
                ${card.order%2 === 1 ? "bg-richblack-700" : "bg-richblack-800"}
                ${card.order === 3 && "col-start-2" } px-4 py-4  sm:min-h-[240px]  h-[200px]
              `}
            >
              {
                card.order < 0 ?(
                  <div className=' flex flex-col gap-6'>
                    <div className={"font-semibold text-xl"}>  
                      {card.heading}
                      <highlightText text={card.highlightText}/>
                    </div>
                    <p>
                      {card.description}
                    </p>
                    <div >
                    <CTAButton active={true}  linkto={card.BtnLink}>
                      {card.BtnText}
                    </CTAButton>
                    </div>
                  </div>
                ) :
                (
                  <div className=' flex flex-col  gap-6  justify-evenly'>
                    <h1 className='font-semibold text-xl'>{card.heading}</h1>
                    <p>{card.description}</p>
                  </div>
                )
              }

            </div>
          )
        })
      }
    </div>
  )
}

export default LearningGrid
