import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import RequirementField from "./RequirementField";
import TagField from "./TagField";
import {
  addCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";
import Iconbtn from "../../Iconbtn";
import { setCourse, setCurrentStep } from "../../../../../slices/courseSlice";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";
import toast from "react-hot-toast";
import { Course_Status } from "../../../../../utils/constants";
import { current } from "@reduxjs/toolkit";
import Upload from "../../Upload";

const CourseInformationForm = () => {
  const { token } = useSelector((state) => state.auth);
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const category = await fetchCourseCategories(dispatch);
      if (category.length > 0) {
        setCategories(category);
      }

      if (editCourse) {
        setValue("courseTitle", course.courseName);
        setValue("courseShortDesc", course.courseDescription);
        setValue("coursePrice", course.price);
        setValue("courseTags", course.tag);
        setValue("courseBenefits", course.WhatYouWillLearn);
        setValue("courseCategory", course.category);
        setValue("courseRequirements", course.instructions);
        setValue("courseImage", course.thumbnail);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      // currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString()
      // currentValues.courseImage !== course.thumbnail
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async () => {
    const data = getValues();

    if (editCourse) {
      if (isFormUpdated()) {
        const formData = new FormData();
        formData.append("courseId", course._id);
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory);
        formData.append("tags",data.courseTags)
        formData.append(
          "instructions",
          JSON.stringify(data.courseRequirements)
        )

        setLoading(true);
        const result = await editCourseDetails(formData, token,dispatch);  
        if (result) {
          dispatch(setCurrentStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changesmade so far");
      }
      return;
    }

    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("tags",data.courseTags)
    formData.append("thumbnail",data.courseImage)

    formData.append("status", Course_Status.DRAFT);


    setLoading(true);
    const result = await addCourseDetails(formData, token,dispatch);
    if (result) {
      dispatch(setCurrentStep(2));
      dispatch(setCourse(result));
     
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="courseTitle" className="text-sm text-richblack-5" >
            Course Title<sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            placeholder="Enter Course Title"
            id="courseTitle"
            {...register("courseTitle", { required: true })}
            className="bg-richblack-700 text-richblack-5 p-2 rounded-md border-b"
          />
          {errors.courseTitle && <span>Course Title is Mandetory</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="courseShortDesc" className="text-sm text-richblack-5" >
            Course Short Description <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            placeholder="Enter Course Description"
            id="courseShortDesc"
            {...register("courseShortDesc", { required: true })}
            className="bg-richblack-700 lg:min-h-[100px] text-richblack-5 p-2 rounded-md border-b"
          />
          {errors.courseShortDesc && (
            <span>Course Description is Mandetory</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="coursePrice" className="text-sm text-richblack-5" >
            Course Price <sup className="text-pink-200">*</sup>
          </label>
          <input
            placeholder="Enter Course price"
            id="coursePrice"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
            })}
            className="bg-richblack-700 text-richblack-5 p-2 rounded-md border-b"
          />
          {errors.coursePrice && (
            <span>Course Price is Mandetory OR in numeric</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="courseCategory" className="text-sm text-richblack-5" >Category <sup className="text-pink-200">*</sup></label>
          <select
            placeholder="Choose A category"
            defaultValue=""
            id="courseCategory"
            {...register("courseCategory", { required: true })}
            className="bg-richblack-700 text-richblack-5 p-2 rounded-md border-b"
          >
            <option value="">Choose A category</option>
            {categories.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
            {errors.courseCategory && <span>Choose category</span>}
          </select>
        </div>

        {/* tag bnaanna h  */}

        <TagField name="courseTags"
          label="Tags"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}/>

        {/* image bhi  */}

        <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

        <div className="flex flex-col gap-2">
          <label htmlFor="courseBenefits" className="text-sm text-richblack-5" >
            Benefits Of the course <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            className="bg-richblack-700 lg:min-h-[100px] text-richblack-5 p-2 rounded-md border-b"
            id="courseBenefits"
            placeholder="Enter Benefits of the Course"
            {...register("courseBenefits", { required: true })}
          />
          {errors.courseBenefits && (
            <span> Benefits OF course is required</span>
          )}
        </div>

        <RequirementField
          name="courseRequirements"
          label="Requirements/Instructions"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        <div className="flex gap-5   justify-end">
          <button
            className="bg-richblack-700 text-richblack-50 rounded-lg font-semibold p-2 hover:scale-95 text-[18px]  transition-all duration-200"
            onClick={() => dispatch(setCurrentStep(2))}
          >
            Continue Without Saving
          </button>

          
          <button type="submit" className='bg-yellow-5 text-richblack-700 rounded-lg font-semibold lg:px-2 md:px-1 sm:px-2 px-1 py-1 hover:scale-95 lg:text-lg md:text-[15px] sm:text-lg text-[15px] w-fit transition-all duration-200'>{editCourse ? "Update Changes" : "Next"}</button>
        </div>
      </form>
    </div>
  );
};

export default CourseInformationForm;
