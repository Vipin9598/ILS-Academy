import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../../services/operations/SettingsAPI";
import { setLoading } from "../../../../slices/authSlice";

const ProfileSection = () => {
  const { user } = useSelector((state) => state.profile);
  const { token,loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(
        {
          phoneNumber: `${user.additionalDetails.contactNumber}`,
          about: `${user.additionalDetails.about}`,
          gender: `${user.additionalDetails.gender}`,
          dateOfBirth: `${user.additionalDetails.dateOfBirth}`,
        },
        [reset, isSubmitSuccessful]
      );
    }
  });

  const submitHandler = async (data) => {
    dispatch(setLoading(true))
    console.log("before",user);
    try {
      console.log("form data :", data);
      
      await dispatch(updateProfile(token, data,dispatch));
      
    } catch (error) {
      console.log("error a gya mitro  profile update krte hue...  ", error);
    }
    dispatch(setLoading(false))
    console.log("after ", user);
  };
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className=" rounded-md   text-richblack-100 flex flex-col gap-5 py-5 "
    >
      <div className=" flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 py-5 lg:px-12 md:px-5 sm:px-10 px-1">
        <h1 className="text-xl">Profile Information</h1>
        <div className="grid grid-cols-2  w-full lg:gap-x-20 md:gap-x-10 sm:gap-x-20 gap-x-5 gap-y-8 ">
          <div className=" flex flex-col gap-2 w-full">
            <p className="">First Name</p>
            <input
              type="text"
              defaultValue={user.firstName}
              {...register("firstName", { required: true })}
              placeholder="Enter First Name"
              className="bg-richblack-700 px-2 py-1 placeholder:text-richblack-500 rounded-md border-b border-richblack-100 "
            />
          </div>
          <div className=" flex flex-col gap-2 w-full">
            <p className="">Last Name</p>
            <input
              type="text"
              defaultValue={user.lastName}
              placeholder="Enter Last Name"
              className="bg-richblack-700 px-2 py-1 placeholder:text-richblack-500 rounded-md border-b border-richblack-100 "
            />
          </div>
          <div className=" flex flex-col gap-2 w-full">
            <label className="" htmlFor="dateOfBirth">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              defaultValue={user?.additionalDetails?.dateOfBirth}
              placeholder={"dd/mm/yyyy"}
              {...register("dateOfBirth", { required: true })}
              className="bg-richblack-700 px-2 py-1  calenderText placeholder:text-richblack-500  rounded-md border-b border-richblack-100 "
            />
            {errors.dateOfBirth && <span>Enter Date of Birth</span>}
          </div>

          <div className=" flex flex-col gap-2 w-full">
            <label className="" htmlFor="gender">
              Gender
            </label>
            <select
              defaultValue={user?.additionalDetails?.gender ?? "Male"}
              name="gender"
              id="gender"
              {...register("gender", { required: true })}
              className="bg-richblack-700 px-2 py-1 placeholder:text-richblack-500  rounded-md border-b border-richblack-100   "
            >
              <option>Male</option>
              <option>Female</option>
            </select>
            {errors.gender && <span>Please Select Your Gender</span>}
          </div>

          <div className=" flex flex-col gap-2 w-full editProfilegrid">
            <label className="">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              id="contactNumber"
              placeholder={"Enter Your Number"}
              defaultValue={user?.additionalDetails?.contactNumber}
              {...register("contactNumber", {
                required: {
                  value: true,
                  message: "Please enter mobile number",
                },
                maxLength: { value: 10, message: "Enter Valid Phone Number" },
                minLength: { value: 10, message: "Enter Valid Phone Number" },
              })}
              className="bg-richblack-700   px-2 py-1 placeholder:text-richblack-500  rounded-md border-b border-richblack-100 "
            />
            {errors.contactNumber && (
              <span>Please Enter Your Contact Number</span>
            )}
          </div>

          <div className=" flex flex-col gap-2 w-full editProfilegrid">
            <p className="">About</p>
            <input
              type="text"
              name="about"
              id="about"
              defaultValue={user?.additionalDetails?.about}
              placeholder="Enter Bio Details"
              {...register("about", { required: true })}
              className="bg-richblack-700  px-2 py-1 placeholder:text-richblack-500 rounded-md border-b border-richblack-100 "
            />
            {errors.about && <span>Please Enter Your Bio Details</span>}
          </div>
        </div>
      </div>
      <div className=" flex gap-5  justify-end ">
        <button disabled={loading}
          className="bg-richblack-50 text-richblack-900 rounded-lg font-semibold lg:px-2 md:px-1 sm:px-2 px-1 py-1 hover:scale-95 text-[18px]  transition-all duration-200"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button disabled={loading}
          type="submit"
          className="bg-yellow-5 text-richblack-700 rounded-lg font-semibold lg:px-2 md:px-1 sm:px-2 px-1 py-1 hover:scale-95 text-[18px]  transition-all duration-200"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default ProfileSection;
