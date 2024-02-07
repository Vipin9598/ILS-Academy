import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { changePassword } from "../../../../services/operations/SettingsAPI"
import {toast} from "react-hot-toast"
import { setLoading } from "../../../../slices/authSlice"

const PasswordSection = () => {
  const [showOldPassword,setShowOldPassword] = useState(false)
  const [showNewPassword,setShowNewPassword] = useState(false)
  const dispatch= useDispatch()
  const navigate = useNavigate()
  const {token,loading} = useSelector((state)=>state.auth)
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async(data) =>{
    dispatch(setLoading(true))
    try{
      if(data.oldPassword === data.newPassword){
        toast.error("Old & New Password is Same")
      }
      else{
        dispatch(changePassword(token,data))
        
      }
     
       

    } catch(error){
      console.log(error.message)
      
    }
    dispatch(setLoading(false))
    reset()
  }

  return (
    <form onSubmit={handleSubmit(submitPasswordForm)} className="flex flex-col gap-5 my-5 ">
      <div className="flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8   lg:px-12 md:px-5 sm:px-10 px-1 ">
           <p className="">Password</p>
           <div className=" flex sm:flex-row justify-between flex-col gap-y-5">
            <div className="flex flex-col gap-2 sm:w-[45%]  relative">
              <label className="" htmlFor="oldPassword">Current Password</label>
              <input
                type={showOldPassword?"text":"password"}
                id="oldPassword"
                name="oldPassword"
                placeholder="Enter Current Password"
                {...register("oldPassword", { required: true })}
                className="bg-richblack-700 px-2 py-1  rounded-md border-b border-richblack-100  "
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-10 z-[10] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>

            <div className="flex flex-col gap-2 sm:w-[45%] relative">
              <label className="" htmlFor="newPassword">Current Password</label>
              <input
                type={showNewPassword?"text":"password"}
                id="newPassword"
                name="newPassword"
                placeholder="Enter New Password"
                {...register("newPassword", { required: true })}
                className="bg-richblack-700 px-2 py-1  rounded-md border-b border-richblack-100 relative"
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-10 z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>
           </div>
      </div>
      <div className=" flex gap-5  justify-end">
        <button disabled={loading}  className='bg-richblack-50 text-richblack-900 rounded-lg font-semibold lg:px-2 md:px-1 sm:px-2 px-1 py-1 hover:scale-95 text-[18px]  transition-all duration-200' onClick={()=>navigate(-1)}>Cancel</button>
        <button disabled={loading} type="submit" className='bg-yellow-5 text-richblack-700 rounded-lg font-semibold lg:px-2 md:px-1 sm:px-2 px-1 py-1 hover:scale-95 text-[18px]  transition-all duration-200'>Update</button>
      </div>
    </form>
  )
}

export default PasswordSection
