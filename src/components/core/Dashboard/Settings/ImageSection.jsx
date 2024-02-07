import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form"
import {AiOutlineCloudUpload} from "react-icons/ai"
import {updateDisplayPicture} from "../../../../services/operations/SettingsAPI"
import { setLoading } from "../../../../slices/authSlice";

const ImageSection = () => {
  const { user } = useSelector((state) => state.profile);
  const {token,loading} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,setValue
  } = useForm()

  const submitImageForm = async() =>{
    const data = getValues()
    try{
        const formData = new FormData()
        formData.append("displayPicture",data.displayPicture[0])
        console.log("displayPicture",data.displayPicture[0])
        dispatch(setLoading(true))
        await dispatch(updateDisplayPicture(token,formData))
    } catch(error){
      console.log(error.message)
    }
    setValue("displayPicture",'')
   dispatch( setLoading(false))
  }
  return (
    <div className=" flex  gap-x-6 items-center rounded-md border-[1px] border-richblack-700 bg-richblack-800 py-5 lg:px-12 md:px-5 sm:px-10 px-1 w-full justify-center">
      <div className="overflow-hidden rounded-full  items-center">
        <img src={user.image} className="w-[60px]  aspect-square " />
      </div>
      <div className="flex flex-col gap-2 w-full ">
        <p className="">Change Profile Image</p>
        <form onSubmit={handleSubmit(submitImageForm)} className="  flex  justify-between items-center">
        <input
              type="file"
              id="Image"
              name="image"
              accept=".png , .jpeg , .jpg , .svg "
              {...register("displayPicture",{required:true})}
            />
            {
              errors.displayPicture && <span>Select Image</span>
            }
          <button disabled={loading} type='submit' className='bg-yellow-5 text-richblack-700 rounded-lg font-semibold  lg:px-2 md:px-1 sm:px-2 px-1 py-1 hover:scale-95   transition-all duration-200 flex gap-2 items-center'>
            <span>Upload</span>
            <AiOutlineCloudUpload className="text-xl text-semibold"/>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ImageSection;
