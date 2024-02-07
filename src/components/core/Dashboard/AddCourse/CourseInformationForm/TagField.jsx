import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {RxCross2} from "react-icons/rx"

const TagField = ({name,label,register,errors,setValue,getValues}) => {
    const [tag,setTag] = useState("")
    const [tagList,setTagList] = useState([])
    const {course,editCourse} = useSelector((state)=>state.course)

    useEffect(()=>{
        if(editCourse){
            // setTagList(course?.tags)
        }
        register(name, { required : true, validate: (value) => value.length > 0 })
    },[])

    useEffect(()=>{
        setValue(name,tagList)
    },[tagList])

    const addTagHandler = (event)=> {
        event.preventDefault();
        if(tag !==""){
            setTagList([...tagList,tag])
            setTag("")
        }
    }

    const removeTagHandler = (index,event) => {
        event.preventDefault()
        // setTagList(tagList.splice(index,1))
        const updatedTagList = [...tagList]
        updatedTagList.splice(index,1)
        setTagList(updatedTagList)
    }

    // useEffect(()=>{
    //     console.log("updated tag list :",tagList)
    // })

    // const changeHandler = (event) => {
    //     setTag(event.target.value)
    //     console.log("tag ",tag)
    //     const lastChar = tag[tag.length-1]
    //     console.log("last character is : ",lastChar)
    //     if(lastChar == ','){
    //         console.log("koma h ")
    //         setTag(tag.slice(0,-1))
    //         addTagHandler();
    //     }
    // }
    // useEffect(()=>{
    //     const lastChar = tag[tag.length-1]
    //     console.log("aa gya ",tag)
    //     if(lastChar == ','){
    //         console.log("tag phle  koma k :",tag)
    //         setTag(tag.slice(0,-1))
    //         console.log("tag baad m koma k :",tag)
    //         addTagHandler();
    //     }
    // },[tag])
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-wrap gap-3'>
        {
            tagList.map((tag,index)=>{
                return (
                    <span key={index} className=' bg-yellow-600 w-fit rounded-md p-1 flex gap-x-1'>
                        {tag}
                        <button onClick={(event)=>removeTagHandler(index,event)}><RxCross2/></button>    
                    </span>
                    
                )
            })
        }
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor={name} className="text-sm text-richblack-5" >{label} <sup className="text-pink-200">*</sup></label>
        <input
            name={name}
            id={name}
            value={tag}
            onChange={(event)=>setTag(event.target.value)}
            placeholder='Enter tags'
            className="bg-richblack-700 text-richblack-5 p-2 rounded-md border-b"
        />
        {
            errors.name && <span>Enter Tag first</span>
        }
        
      </div>
      <button onClick={addTagHandler} className='text-start w-fit text-yellow-5 font-semibold' >Add</button>
    </div>
  )
}

export default TagField
