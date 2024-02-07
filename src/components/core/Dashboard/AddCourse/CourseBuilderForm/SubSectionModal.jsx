import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {updateSubSection,createSubSection} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from '../../../../../slices/courseSlice'
import { RxCross1 } from 'react-icons/rx'
import Iconbtn from '../../Iconbtn'
import { toast } from 'react-hot-toast'
import Upload from '../../Upload'
import { setIsBlurred } from '../../../../../slices/authSlice'
 
 const SubSectionModal = ({modalData,setModalData,view=false,add=false,edit=false}) => {
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const {token} = useSelector((state)=>state.auth)
    const {course} = useSelector((state)=>state.course)
    

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState:{errors} 
    } = useForm()

    useEffect(()=>{
        if(view || edit ){
            setValue("lectureTitle",modalData.title);
            setValue("lectureDescription",modalData.description);
            setValue("lectureVideoUrl",modalData.videoURl);
        }
    },[])

    const isFormUpdated = () => {
        const currentValue = getValues();
        if(currentValue.lectureTitle !== modalData.title || currentValue.lectureDescription !==  modalData.Description || currentValue.lectureVideoUrl !== modalData.videoURl){
            return true
        }
        return false;
    }

    const handleEditSubSection = async() => {
        const  currentValue = getValues();
        const formData = new FormData()
        console.log("modalData ki section id ",modalData.sectionId)

        // if(currentValue.title !== modalData.title )
        
        formData.append("subSectionId",modalData._id)
        formData.append("sectionId",modalData.sectionId)
        formData.append("title",currentValue.lectureTitle)
        formData.append("description",currentValue.lectureDescription)
        formData.append("videoFile",currentValue.lectureVideo)

        const result = await updateSubSection(formData,token);
        console.log("result update subsection krte vkt ",result)
        if(result){
            const updatedCourseContent = course.courseContent.map((section)=>
            section._id == modalData.sectionId ? result :section)
            const updatedCourse = {...course,courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse))
        }
        setModalData(null)


    }


    const onSubmit = async(data) => {
        if(view) return;
        
        if(edit){
            if(isFormUpdated()){
                handleEditSubSection();
            }
            else{
                toast.error("No changes made in subSection")
            }
            return ;
        }

        const formData = new FormData()
        formData.append("sectionId", modalData)
        formData.append("title", data.lectureTitle)
        formData.append("description", data.lectureDescription)
        formData.append("videoFile", data.lectureVideo)


        const result = await createSubSection(formData,token,dispatch);
      
        console.log("resullt aaya h mitra check krte h ek bvaarr ",result)
        if(result) {
            const updatedCourseContent = course.courseContent.map((section)=>
            section._id == modalData ? result :section)
            const updatedCourse = {...course,courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse))
            console.log("uypdated course ",modalData)
        }
        setModalData(null)
        dispatch(setIsBlurred(false))
    }


   return (
     <div className='flex flex-col gap-4 bg-richblack-800 absolute -top-[32rem] left-[40%] w-[100%] p-5 rounded-lg'>
       <div className='flex gap-3'>
        <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
        <button onClick={()=>{
            setModalData(null)
            dispatch(setIsBlurred(false))
        }}>
            <RxCross1/>
        </button>
       </div>

       <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
            {/* // upload section likhna  */}
            <Upload
                name="lectureVideo"
                label="Lecture Video"
                register={register}
                setValue={setValue}
                errors={errors}
                video={true}
                viewData={view ? modalData.videoURl : null}
                editData={edit ? modalData.videoURl : null}
            />
            <div className='flex flex-col gap-2'>
                <label className="text-sm text-richblack-5">Lecture Title <sup className="text-pink-200">*</sup></label>
                <input 
                    id='lectureTitle'
                    type='text'
                    placeholder='Enter Lecture Title'
                    {...register("lectureTitle",{required:true})}
                    className="bg-richblack-700 text-richblack-5 p-2 rounded-md border-b"
                />
                {
                    errors.LectureTitle && <span>Lecture Title is Required</span>
                }

            </div>

            <div className='flex flex-col gap-2'>
                <label className="text-sm text-richblack-5">Lecture Description <sup className=" text-pink-500 text-xl ">*</sup></label>
                <textarea 
                    type='text'
                    id='lectureDescription'
                    placeholder='Enter lecture Description Here'
                    {...register("lectureDescription",{required:true})}
                    className="bg-richblack-700 lg:min-h-[100px] text-richblack-5 py-1 px-1 rounded-md border-b"
                />

                {
                    errors.lectureDescription && <span>Lecture Description is required</span>
                }
            </div>
            
            {
                !view && (
                    <div className='flex justify-end '>
                        <Iconbtn 
                        text={edit ?" Save Changes" :"Save"}
                        type="submit"
                        />
                    </div>
                )
            }
       </form>
     </div>
   )
 }
 
 export default SubSectionModal
 