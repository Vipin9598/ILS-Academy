import React from 'react'
import { useState } from 'react'
import {RxCross2} from "react-icons/rx"
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const RequirementField = ({name,label,register,errors,setValue,getValues    }) => {
    const [requirement,setRequirement] = useState("")
    const [requirementList,setRequirementList] = useState([])
    const { editCourse, course } = useSelector((state) => state.course)

    useEffect(() => {
      if (editCourse) {
        // setRequirementList(course?.instructions)
      }
      register(name, { required : true, validate: (value) => value.length > 0 })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      setValue(name, requirementList)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requirementList])

    const handleAddRequirement = (event) => {
        event.preventDefault()
        if(requirement){

            setRequirementList([...requirementList,requirement])
            setRequirement("")
        }
    }

    const removeRequirementList = (index,event) => {
        event.preventDefault();
        

            const updateRequirementList = [...requirementList]
            updateRequirementList.splice(index,1)
            setRequirementList(updateRequirementList)

            // y hmne likh ah 
            // requirementList.filter((currRequirement)=>currRequirement !== event.target.value )
        
    }
  return (
    <div className='mb-5'>
      <div className='flex flex-col gap-2 mb-4'>
        <label htmlFor={name} className="text-sm text-richblack-5" >{label} <sup className="text-pink-200">*</sup></label>
        <input
            className="bg-richblack-700 text-richblack-5 p-2 rounded-md border-b"
            id={name}
            value={requirement}
            onChange={(event)=>setRequirement(event.target.value)}
            placeholder='Enter The Requirements'
        />
        <button onClick={handleAddRequirement} className='text-start w-fit text-yellow-5 font-semibold'>Add</button>
      </div>
      <ul className='flex flex-wrap gap-2'>
        {   requirementList.length > 0  && 
            requirementList.map((currRequirement,index)=>{
                return (
                    <li key={index} className=' bg-yellow-600 w-fit rounded-md p-1 flex gap-x-1'>
                        {currRequirement}
                        <button onClick={(event)=>removeRequirementList(index,event)}><RxCross2/></button>
                    </li>
                )
            })
        }
      </ul>

     
    </div>
  )
}

export default RequirementField
