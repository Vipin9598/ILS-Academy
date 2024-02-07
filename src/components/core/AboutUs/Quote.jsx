import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className='text-richblack-5 bg-richblack-900  py-32 lg:text-3xl  md:text-2xl sm:text-xl text-lg text-justify max-w-[75%]  md:text-center mx-auto'>
      We are passionate about revolutionizing the way we learn. Our innovative platform  {" "}
      <HighlightText text={"combines technology"}/>{" "}
      <span className=' bg-gradient-from-#FF512F bg-gradient-to-#F09819'>{" "} expertise </span>{" "}
      , and community to create an
      <span>unparalleled educational experience.</span>

    </div>
  )
}

export default Quote
