import React from 'react'
import Template from '../components/Form/Template'
import signupImage from "../assets/Images/signup.webp"

const Signup = () => {
  return (
    <div className='lg:w-10/12 md:w-11/12 w-full mx-auto md:px-5 px-1 mt-[56px] pb-[20px]' >
      <Template
      title={"Join The millions learning to code with studyNotion for free"}
      desc1 ={"Build skills for today, tomorrow, and beyond."}
      desc2={" Education to future-proof your career."}
      formType={"signup"}
      image={signupImage}/>
      
    </div>
  )
}

export default Signup
