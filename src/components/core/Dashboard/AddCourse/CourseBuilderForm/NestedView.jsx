import React from 'react'
import { useState } from 'react'
import { RxDropdownMenu } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import {MdEdit} from "react-icons/md"
import ConfirmationModal from "../../ConfirmationModal"
import {deleteSubSection,deleteSection} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from '../../../../../slices/courseSlice'
import { MdDelete } from "react-icons/md";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { MdOutlineArrowDropUp } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import SubSectionModal from './SubSectionModal'


const NestedView = ({handleChangeEditSectionName}) => {
    const {token} = useSelector((state)=>state.auth)
    const {course,currentStep} = useSelector((state)=>state.course)
    const dispatch = useDispatch()
    
    const [addSubSection,setAddSubSection] = useState(null)
    const [showSubSection,setShowSubSection] = useState(false)
    const [viewSubSection,setViewSubSection] = useState(null)
    const [editSubSection,setEditSubSection] = useState(null)

    const [confirmationModal,setConfirmationModal] = useState(null)

    const handleDeleteSection = async (data) =>{
      
      let result = await deleteSection({data
        ,token,dispatch
      })
      console.log( "result   ....   ",result)

      if (result) 
        dispatch(setCourse(result))

      setConfirmationModal(null)
    }

    const handleDeleteSubSection = async (subSectionId,sectionId) =>{
      let result =  await deleteSubSection({subSectionId,sectionId},token,dispatch)
      if(result){
        const updatedCourseContent = course.courseContent.map((section)=>
            section._id === sectionId ? result :section)
        const updatedCourse = {...course,courseContent:updatedCourseContent}
        dispatch(setCourse(updatedCourse))
      }
      setConfirmationModal(null)
    }

  return (
    <div className='bg-richblack-700 p-5 mt-10 rounded-md relative '>
      <div>
        {
            course?.courseContent?.map((section)=>(
                <details key={section._id}>
                    <summary className='flex items-center  justify-between gap-x-1 border-b-2 px-4'>
                        <div className='flex gap-4 items-center'>
                            <RxDropdownMenu/>
                            <p>{section.sectionName}</p>
                        </div>
                        <div className=' flex gap-x-4 items-center'>
                            <button onClick={()=>handleChangeEditSectionName(section._id,section.sectionName)}>
                                <MdEdit/>
                            </button>
                            
                            <button onClick={()=>setConfirmationModal(
                              {
                                text1:"Delete This Section",
                                text2:"All the lecture in this  section will be deleted",
                                btn1Text:"Delete",
                                btn2Text:"Cancel",
                                btn1Handler:()=>handleDeleteSection({sectionId:section._id,courseId:course._id}),
                                btn2Handler : ()=>setConfirmationModal(null)
                              }
                            )}>
                              <MdDelete/>
                            </button>
                            <span className=' font-bold'>|</span>
                              <MdOutlineArrowDropDown className='text-xl'/>

                            
                        </div>
                    </summary>

                    <div>
                      {
                        section.subSection.map((subSection)=>(
                          <div key={subSection._id} onClick={()=>setViewSubSection({...subSection})}
                            className='flex items-center  justify-between gap-x-1 border-b-2 px-4 ml-5'
                            >
                            <div className=' flex gap-4 items-center '>
                              <RxDropdownMenu/>
                              <p>{subSection.title}</p>
                            </div>

                            <div onClick={(e)=>e.stopPropagation()}  className=' flex gap-x-4 items-center'>
                              <button onClick={()=>setEditSubSection({...subSection,sectionId:section._id})}>
                                <MdEdit/>
                              </button>

                              <button onClick={()=>setConfirmationModal(
                              {
                                text1:"Delete This Sub Section",
                                text2:"Selected lecture will be deleted",
                                btn1Text:"Delete",
                                btn2Text:"Cancel",
                                btn1Handler:()=>handleDeleteSubSection(subSection._id,section._id),
                                btn2Handler : ()=>setConfirmationModal(null)

                              }
                            )}>
                              <MdDelete/>
                            </button>
                            </div>
                          </div>
                        ))
                      }

                      <button onClick={()=>setAddSubSection(section._id)} className='text-yellow-50  flex items-center my-2 mx-2 gap-x-3'> 
                        <FaPlus />
                        <p>Add Lecture</p>
                      </button>
                    </div>
                </details>
            ))
        }
      </div>

      <div className='relative '>
      {
        addSubSection ? <SubSectionModal 
          modalData={addSubSection}
          setModalData= {setAddSubSection} 
          add={true} />
        : viewSubSection ? <SubSectionModal 
          modalData={viewSubSection}
          setModalData= {setViewSubSection} 
          view={true} />  
        : editSubSection ? <SubSectionModal
          modalData={editSubSection}
          setModalData= {setEditSubSection} 
          edit={true}/>  
        :<></>
      }
      
      {
        confirmationModal ? <ConfirmationModal modalData={confirmationModal}/> :<></>
      }
      </div>
    </div>
  )
};

export default NestedView
