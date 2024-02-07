import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch,useSelector} from 'react-redux'
import { resetCourseState, setCourse, setCurrentStep } from '../../../../../slices/courseSlice'
import Iconbtn from '../../Iconbtn'
import { BiRightArrow } from 'react-icons/bi'
import { Course_Status } from '../../../../../utils/constants'
import { useNavigate } from 'react-router-dom'
import {editCourseDetails} from "../../../../../services/operations/courseDetailsAPI"

const PublishCourse = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState:{errors} 
} = useForm()

const  [loading,setLoading] = useState(false)

const dispatch = useDispatch()
const navigate = useNavigate();
const {token} = useSelector((state)=>state.auth)
const {course} =  useSelector((state)=>state.course)

const goBack = () => {
  dispatch(setCurrentStep(2))
}

const gotoCourses = () => {
  dispatch(resetCourseState())
  navigate("/dashboard/my-courses")
}


const onSubmit = async () => {
    if(course?.status === Course_Status.PUBLISHED && getValues("public") === true || (course?.status === Course_Status.DRAFT && getValues("public") === false)){
      gotoCourses();
      return ;
    }

    const formData = new FormData()

    formData.append("courseId",course._id)
    const courseStatus = getValues("public") ? Course_Status.PUBLISHED : Course_Status.DRAFT
    formData.append("status",courseStatus)

    setLoading(true)
    const result = await editCourseDetails(formData,token,dispatch)

    if (result){
      gotoCourses()
    }
    setLoading(false)
}

  return (
    <div>
      <p>Publish Course</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className='flex gap-4 items-center'>
            <input
            type='checkbox'
            id='public'
            name='public'
            {...register("public")}
            className='h-4 w-4 rounded-md'
            />
            Make This Course as Public
          </label>
        </div>
        
        <div className="flex gap-4 mt-3  justify-end">
          <button disabled = {loading}  onClick={goBack} className="rounded-md p-2 bg-richblack-700 text-richblack-100 text-center">Back</button>
          <Iconbtn type="submit" text="Save Changes" disabled= {loading}><BiRightArrow/></Iconbtn>
        </div>
      </form>
    </div>
  )
}

export default PublishCourse
