import React from 'react'
import Template from '../components/Form/Template'
import loginimage from "../assets/Images/login.webp"

function Login() {
  return (
    <div className='lg:w-10/12 md:w-11/12 w-full mx-auto px-5 mt-[56px] pb-[20px]' >
      <Template
      title={"Welcome Back"}
      desc1 ={"Build skills for today, tomorrow, and beyond."}
      desc2={"Education to future-proof your career."}
      formType={"login"}
      image={loginimage}/>
      
    </div>
  )
}

export default Login
