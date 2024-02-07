import React, { useState } from "react";
import countryCode from "../../data/countrycode.json";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../../services/operations/AuthAPI";
import { setSignUpData } from "../../slices/authSlice";

const Signupform = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading} = useSelector((state)=>state.auth)
  const [accountType, setAccountType] = useState("Student");
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    accountType: "",
  });

  function changeHandler(event) {
    setformData((prevdata) => {
      return {
        ...prevdata,
        [event.target.name]: event.target.value,
      };
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    if (formData.password != formData.confirmPassword) {
      toast.error("Password Not Matched");
      return;
    }
    formData.accountType = accountType;
    dispatch(setSignUpData(formData));
    dispatch(sendOtp(formData.email, navigate));

    // setformData({
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   password: "",
    //   confirmPassword: "",
    //   contactNumber:"",
    // })
    // setAccountType("Student")
  }

  const [showPassword, setshowPassword] = useState(false);
  const [showconfirmPassword, setshowconfirmPassword] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <div className="px-2 py-1 rounded-full text-richblack-300 bg-richblack-800 w-fit flex gap-1 mb-1">
        <button
          className={`px-4 py-1 rounded-full ${
            accountType === "Student" ? "bg-richblack-900" : "bg-richblack-800"
          }`}
          onClick={() => {
            setAccountType("Student");
          }}
        >
          Student
        </button>
        <button
          className={`px-4 py-1 rounded-full ${
            accountType === "Instructor"
              ? "bg-richblack-900"
              : "bg-richblack-800"
          }`}
          onClick={() => {
            setAccountType("Instructor");
          }}
        >
          Instructor
        </button>
      </div>
      <form onSubmit={submitHandler} className="flex flex-col  gap-2">
        <div className="flex gap-5 signUpName">
          <label className="w-[43%] flex flex-col gap-1 ">
            <p className=" text-richblack-200 text-xl">
              First Name <sup className=" text-yellow-200">*</sup>
            </p>
            <input
              type="text"
              placeholder="Enter First Name"
              required
              name="firstName"
              value={formData.firstName}
              onChange={changeHandler}
              className="w-full rounded-full px-3 mt-1 text-xl py-1 placeholder:text-richblack-500 placeholder:opacity-80 border-b border-white bg-richblack-700"
            />
          </label>

          <label className="w-[43%] flex flex-col gap-1">
            <p className=" text-richblack-200 text-xl">
              Last Name <sup className="text-yellow-200">*</sup>
            </p>
            <input
              type="text"
              placeholder="Enter Last Name"
              required
              name="lastName"
              value={formData.lastName}
              onChange={changeHandler}
              className="w-full rounded-full px-3 mt-1 py-1 text-xl placeholder:text-richblack-500 placeholder:opacity-80 border-b border-white bg-richblack-700"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1">
          <p className=" text-richblack-200 text-xl">
            Email Address<sup>*</sup>
          </p>
          <input
            type="email"
            placeholder="Enter email here"
            required
            name="email"
            value={formData.email}
            onChange={changeHandler}
            className="w-[90%] rounded-full px-3 mt-1 py-1 text-xl placeholder:text-richblack-500 placeholder:opacity-80 border-b border-white bg-richblack-700"
          />
        </label>

        <div>
          <label>
            <p className=" text-richblack-200 text-xl">
              Phone Number <sup>*</sup>
            </p>
            <input
              type="tel"
              placeholder="0123456789"
              required
              value={formData.contactNumber}
              name="contactNumber"
              onChange={changeHandler}
              className="w-[90%] rounded-full px-3 mt-1 py-1 text-xl placeholder:text-richblack-500 placeholder:opacity-80 border-b border-white bg-richblack-700"
            />
          </label>
        </div>

        <div className="flex gap-5 signUpPassword ">
          <label className="w-[43%] flex flex-col gap-1 relative ">
            <p className=" text-richblack-200 md:text-xl sm:text-lg text-md">
              Password <sup>*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              required
              name="password"
              value={formData.password}
              onChange={changeHandler}
              className="w-full rounded-full px-3 mt-1 text-xl py-1 placeholder:text-richblack-500 placeholder:opacity-80 border-b border-white bg-richblack-700"
            />
            <span
              onClick={() => setshowPassword(!showPassword)}
              className="absolute top-11 right-4 text-blue-400"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="text-richblack-5 text-xl" />
              ) : (
                <AiOutlineEye className="text-richblack-5 text-xl" />
              )}
            </span>
          </label>

          <label className="w-[43%] flex flex-col gap-1 relative ">
            <p className=" text-richblack-200  md:text-xl sm:text-lg text-md">
              Confirm Password <sup>*</sup>
            </p>
            <input
              type={showconfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              required
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={changeHandler}
              className="w-full rounded-full px-3 mt-1 text-xl py-1 placeholder:text-richblack-500 placeholder:opacity-80 border-b border-white bg-richblack-700"
            />
            <span
              onClick={() => setshowconfirmPassword(!showconfirmPassword)}
              className="absolute top-11 right-4 text-blue-400"
            >
              {showconfirmPassword ? (
                <AiOutlineEyeInvisible className="text-richblack-5 text-xl" />
              ) : (
                <AiOutlineEye className="text-richblack-5 text-xl" />
              )}
            </span>
          </label>
        </div>

        <button
          disabled={loading}
          className="text-white bg-yellow-300 rounded-full mt-2  w-[90%] py-1"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signupform;
