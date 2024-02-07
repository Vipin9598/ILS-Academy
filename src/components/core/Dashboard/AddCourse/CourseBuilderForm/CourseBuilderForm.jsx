import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Iconbtn from "../../Iconbtn";
import { GrAddCircle } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import {BiRightArrow} from "react-icons/bi"
import {setCourse, setCurrentStep,setEditCourse} from "../../../../../slices/courseSlice"
import toast from "react-hot-toast";
import NestedView from "./NestedView";
import { createSection,updateSection } from "../../../../../services/operations/courseDetailsAPI";

const CourseBuilderForm = () => {
  const dispatch = useDispatch()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {course} = useSelector((state)=>state.course)
  const [editSectionName, setEditSectionName] = useState(null);
  const [loading,setLoading] = useState(false)
  const {token} = useSelector((state)=>state.auth)

  const submitHandler = async(data) => {
    setLoading(true)

    let result;
     if(editSectionName){
      result = await updateSection({
        // section id smjh nhi aaya

        sectionName:data.sectionName,
        sectionId:editSectionName,
        // sectionid:editSectionName,
        courseId:course._id
      },token,dispatch)
     }  
     else{
      result = await createSection({
        sectionName:data.sectionName,
        courseId : course._id
      },token,dispatch)
     }
     if(result){
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName","")
     }
     console.log("baad m result ",course)
     setLoading(false)
  }



  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  //cancel edit 

  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName","")
  }

  //back btn 

  const goBack = () =>{
    dispatch(setCurrentStep(1))
    dispatch(setEditCourse(true)) 
  }

// next btn 


  const goToNext = () =>{
    if(course.courseContent.length === 0){
      toast.error("Please add atleast one Section")
      return;
    }
    if(course.courseContent.some((section)=>section.subSection.length === 0)){
      toast.error("add atleast one subsection in every section ")
      return;
    }
    // if evetthing is ok then go to next page
    dispatch(setCurrentStep(3))
  }
  return (
    <div>
      <div className="flex flex-col gap-3 relative">
        <p className="text-xl">Course Builder</p>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(submitHandler)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="sectionName" className="text-sm text-richblack-5">Section Name <sup className="text-pink-200">*</sup></label>
            <input
              id="sectionName"
              placeholder="Enter Section Name"
              {...register("sectionName", { required: true })}
              className="bg-richblack-700 text-richblack-5 p-2 rounded-md border-b"
            />
            {errors.sectionName && <span>Section Name is required</span>}
          </div>
          <div className="flex gap-5 mt-2">
            <Iconbtn
              type="submit"
              text={editSectionName ? "Edit section" : "Create Section"}
              outline={true}
            >
              <GrAddCircle />
            </Iconbtn>
            {editSectionName && <button className="underline" onClick={cancelEdit}>cancel Edit</button>}
          </div>
        </form>
        {
          course?.courseContent?.length > 0 && 
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
        }

        <div className="flex gap-4 mt-3  justify-end">
          <button onClick={goBack} className="rounded-md p-2 bg-richblack-700 text-richblack-100 text-center">Back</button>
          <Iconbtn text="Next" onclick={goToNext}><BiRightArrow/></Iconbtn>
        </div>

      </div>
    </div>
  );
};

export default CourseBuilderForm;
