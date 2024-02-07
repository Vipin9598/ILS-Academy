import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'
import CourseTable from './CourseTable'
import Iconbtn from '../Iconbtn'
import { FaPlus } from "react-icons/fa6";

const MyCourse = () => {

  const {token,isBlurred} = useSelector((state)=>state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [courses,setCourses] = useState([])

  useEffect(()=>{
    const fetchCourses = async()=> {
      const result = await fetchInstructorCourses(token,dispatch)
      if(result){
        setCourses(result)
      }
    }
    fetchCourses();
  },[])
  return (
    <div className={`  ${isBlurred ? "blur-sm" : ""} text-richblack-50 w-[75%] mx-auto flex flex-col gap-10 pt-5`}>
      <div className='flex justify-between items-center mb-10'>
        <p className='text-2xl font-bold'>My Courses</p>
        <Iconbtn text="Add Course" onclick={()=>navigate('/dashboard/add-course')} >
          <FaPlus />
        </Iconbtn>
      </div>

      {
        courses && <CourseTable courses={courses} setCourses={setCourses} />
      }
    </div>
  )
}

export default MyCourse
