import React, { useState } from 'react'
import {AiOutlineEye} from "react-icons/ai"
import {AiOutlineEyeInvisible} from "react-icons/ai"
import {toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import{ login} from '../../services/operations/AuthAPI'
const Loginform = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector((state)=>state.auth)
    const [formData,setFormData] = useState({
        email:"",password:""
    })
    const [showpassword,setshowpassword] = useState(false)

    function changeHandler(event) {
        setFormData((prevdata) => {
          return {
            ...prevdata,
            [event.target.name]: event.target.value,
          };
        });
      }

      const {email,password} = formData
    function submitHandler(event){
        event.preventDefault();
        dispatch(login(email,password,navigate));
        console.log("formData printing ",formData)
    }
  return (
    <form onSubmit={submitHandler} className='w-full  flex flex-col gap-5 mt-2 relative' >
      <label className='text-richblack-200'>
        <p>Email Address <sup className='text-red-500'>*</sup></p>
        <input 
            type='email'
            required
            placeholder='Enter Email Here'
            name='email'
            value={formData.email}
            onChange={changeHandler}
            className='w-full rounded-full px-3 mt-1 py-1 placeholder:text-richblack-500 placeholder:opacity-80 border-b border-white bg-richblack-700'
        />

      </label>

      <label  className='text-richblack-200 relative'>
        <p>Password <sup>*</sup></p>
        <input 
            type={showpassword?"text":"password"}
            required
            placeholder='Enter Password'
            name='password'
            value={formData.password}
            onChange={changeHandler}
            className='w-full rounded-full px-3 mt-1 py-1  placeholder:text-richblack-500 placeholder:opacity-80 border-b border-white bg-richblack-700'
        />
        <span
          onClick={() => setshowpassword(!showpassword)}
          className=" absolute right-2 text-blue-100 top-9 "
        >
          {showpassword ? <AiOutlineEyeInvisible className="text-richblack-5 text-2xl" /> : <AiOutlineEye className="text-richblack-5 text-2xl" />}
        </span>
      </label>

      <button disabled={loading} className='text-white bg-yellow-300 rounded-full mt-3 py-1' type='submit'>Sign In</button>

      <button disabled={loading} className='absolute bottom-[-20%] right-2 text-caribbeangreen-600 ' onClick={()=>navigate("/forgot-password")}>
        Forgot Password
      </button>

    </form>
  )
}

export default Loginform
