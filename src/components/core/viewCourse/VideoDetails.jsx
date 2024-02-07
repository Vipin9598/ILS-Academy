import React, { Children, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { FaPlayCircle } from "react-icons/fa";
import Iconbtn from "../Dashboard/Iconbtn";
import { HiArrowPath } from "react-icons/hi2";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";

const VideoDetails = () => {
  const { sectionId, subSectionId, courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { token,loading } = useSelector((state) => state.auth);
  const playerRef = useRef();
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [spinnerLoading, setSpinnerLoading] = useState(false);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((subSection) => subSection._id === subSectionId);
    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((subSection) => subSection._id === subSectionId);
    const subSectionLength =
      courseSectionData[currentSubSectionIndex].subSection.length;
    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === subSectionLength - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((subSection) => subSection._id === subSectionId);
    const subSectionLength =
      courseSectionData[currentSubSectionIndex].subSection.length;
    //same section m next video
    if (currentSubSectionIndex !== subSectionLength - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex + 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    }
    // next section m next video
    else {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  const goToPreviousVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((subSection) => subSection._id === subSectionId);
    const subSectionLength =
      courseSectionData[currentSubSectionIndex].subSection.length;
    // same section previous video

    if (currentSubSectionIndex !== 0) {
      const previousSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${previousSubSectionId}`
      );
    }
    // previous section ki last video
    else {
      const previousSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const previousSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSection.length;
      const previousSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          previousSubSectionLength - 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${previousSectionId}/sub-section/${previousSubSectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    setSpinnerLoading(true);
    const res = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token,dispatch
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setSpinnerLoading(false);
  };

  useEffect(() => {
    const setVideoSpecificDetail = async () => {
      if (!courseSectionData) {
        return;
      } else if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        const filteredData = courseSectionData.filter(
          (section) => section._id === sectionId
        );
        const filteredVideoData = filteredData[0]?.subSection.filter(
          (data) => data._id === subSectionId
        );
        setVideoData(filteredVideoData[0]);
        setVideoEnded(false);
      }
    };
    setVideoSpecificDetail();
  }, [courseSectionData, courseEntireData, location.pathname]);
  return (
    <div className="text-white relative w-full pt-1 overflow-hidden h-screen  overflow-y-hidden">
      {!videoData ? (
        <p>No Data Found</p>
      ) : (
        <div>
          <div onClick={loading &&( (e)=>e.preventDefault())}>
            <Player
              ref={playerRef}
              aspectRatio="16:9"
              playsInline
              controls
              onEnded={() => setVideoEnded(true)}
              src={videoData?.videoURl}
              toggleFullScreen
            />
          </div>

          <div className="absolute  top-[45%] left-[45%] items-center ">
            {videoEnded && (
              <div className="flex flex-col gap-5">
                {!completedLectures.includes(subSectionId) && (
                  <Iconbtn
                    text={spinnerLoading ? "Loading..." : "Mark As Completed"}
                    onClick={() => handleLectureCompletion()}
                  />
                )}

                <Iconbtn
                  onClick={() => {
                    if (playerRef?.current) {
                      playerRef?.current?.seek(0);
                      setVideoEnded(false);
                    }
                  }}
                  Children={`${(<HiArrowPath />)}`}
                  text="ReWatch"
                />

                <div className="flex gap-5">
                  {!isFirstVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToPreviousVideo}
                      className="blackButton text-white text-xl rounded-lg px-5 py-2 bg-richblack-600"
                    >
                      Prev
                    </button> 
                  )}
                  {!isLastVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToNextVideo}
                      className="blackButton text-white text-xl px-5 py-2 rounded-lg bg-richblack-600"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4 pt-2 px-2 bg-richblack-700">
        <p>{videoData?.title}</p>
        <p>{videoData?.description}</p>
      </div>
    </div>
  );
};

export default VideoDetails;
