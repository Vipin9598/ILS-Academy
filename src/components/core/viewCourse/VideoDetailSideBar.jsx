import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Iconbtn from "../Dashboard/Iconbtn";
import { RiArrowDropDownLine,RiArrowDropUpLine } from "react-icons/ri";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { setIsBlurred, setLoading } from "../../../slices/authSlice";

const VideoDetailSideBar = ({ setReviewModal }) => {
  const { sectionId, subSectionId } = useParams();
  const {loading} = useSelector((state)=>state.auth)
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);


  useEffect(() => {
    (() => {
      if (!courseSectionData.length) {
        console.log("curreent sectiondata m data nhi h  videodetail sidebar m")
        return;
      }
      //   const currentSectionIndex = courseSectionData.findIndex(
      //     (data) => data._id === sectionId
      //   );

      let currentSectionIndex = -1; // Default value if not found
      for (let i = 0; i < courseSectionData.length; i++) {
        if (courseSectionData[i]._id === sectionId) {
          currentSectionIndex = i;
          console.log("id nhi mili")
          break; // Stop the loop once found
        }
      }

    //   const currentSubSectionIndex = courseSectionData?.subSection.findIndex(
    //     (data) => data._id === subSectionId
    //   );
      console.log("currentSection",currentSectionIndex)
    let currentSubSectionIndex = -1; // Default value if not found
      for (let i = 0; i < courseSectionData[currentSectionIndex].subSection.length; i++) {
        if (courseSectionData[currentSectionIndex].subSection[i]._id === subSectionId) {
          currentSubSectionIndex = i;
          break; // Stop the loop once found
        }
      }

      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection[
          currentSubSectionIndex
        ]._id;
      console.log("activeSubSectionId",activeSubSectionId)
      setVideoBarActive(activeSubSectionId);
      setActiveStatus(courseSectionData[currentSectionIndex]._id);
    })();
  }, [courseSectionData, location.pathname, courseEntireData]);
  return (
    <div  className=" text-richblack-5 flex flex-col gap-5 px-3 w-full bg-richblack-700 pt-5  h-full relative">
      {/* for buttons and title */}
      <div className="flex flex-col gap-2">
        {/* for buttotn */}
        <div className="flex xl:gap-10 lg:gap-7 md:gap-5 gap-10 items-center ">
          <div onClick={async(e) => {
            if(loading){
              e.preventDefault()
            }
            else{
            
            navigate("dashboard/enrolled-courses")
            }
            
          }
          
          } className="text-[15px]">Back</div>
          <div className="h-auto w-fit">
            <button  className='bg-yellow-5 text-richblack-700  rounded-lg font-semibold  px-1 py-1  md:w-fit w-[120px] hover:scale-95 lg:text-[16px] text-[15px] transition-all duration-200' onClick={() => {
              dispatch(setLoading(true))
              setReviewModal(true)  
              dispatch(setIsBlurred(true))
            }} >Add Review</button>
          </div>
        </div>
        {/* for title  */}
        <div className="flex flex-col gap-2 py-2">
          <p className=" lg:xl md:lg text-[15px]">{courseEntireData?.courseName}</p>
          <p className=" lg:xl md:lg text-[15px]">
            {completedLectures?.length} / {totalNoOfLectures}
          </p>
        </div>
      </div>

      {/* for section and subsection  */}
      <div className="py-2">
        {courseSectionData.map((section, index) => {
          return (
            <div
              onClick={(e) =>{
                if(loading)  e.preventDefault()
                else setActiveStatus(section._id)
              }
                }
              key={index}
              className=""
            >
              {/* section  */}
              <div className="flex justify-between items-center lg:xl md:lg text-[15px]">
                <div >{section?.sectionName}</div>
                <div >
                  {activeStatus === section._id ? <RiArrowDropUpLine /> : <RiArrowDropDownLine /> }
                </div>
              </div>

              {/* subsection  */}
              <div>
                {activeStatus === section._id && (
                  <div>
                    {section.subSection.map((subSection, index) => (
                        <div
                          key={index}
                          className={`${
                            videoBarActive === subSection._id
                              ? "bg-yellow-200 text-richblack-800"
                              : " bg-richblack-800 text-richblack-25"
                          } flex gap-5 p-2`}
                          onClick={() => {
                            navigate(
                              `/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${subSection._id}`
                            );
                            setVideoBarActive(subSection._id);
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={completedLectures.includes(subSection._id)}
                          />
                          <p className="lg:xl md:lg text-[15px]">{subSection.title}</p>
                        </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoDetailSideBar;
