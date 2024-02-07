import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/AuthAPI";
import Spinner from "../components/common/Spinner";
import {BsArrowLeft} from "react-icons/bs"

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function submitHandler(event) {
    event.preventDefault();
    dispatch(getPasswordResetToken({ email }, setEmailSent));
  }
  console.log(email);
  return (
    <div className="text-richblack-100 h-screen mt-[56px] w-full sm:mx-0  mx-1  flex-shrink-0  flex justify-center items-center">
      <div className="xl:max-w-[27%] lg:max-w-[32%] md:max-w-[40%] sm:max-w-[45%] max-w-[265px]"  >
        {loading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-5 w-full ">
            <h1 className="md:text-3xl  sm:text-2xl text-xl font-semibold text-center">
              {!emailSent ? "Reset Your Password" : "Check Your Email"}
            </h1>
            <p className=" md:text-lg sm:text-md  text-sm  text-center">
              {!emailSent
                ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                : `We have sent the reset email to  ${email}`}
            </p>
            <form onSubmit={submitHandler} className="flex flex-col gap-5 mt-2">
              {!emailSent && (
                <label className="flex flex-col gap-2 text-start">
                  <p className="md:text-lg text-md">Email Address <sup className=" text-pink-700 text-2xl">*</sup></p>
                  <input
                    type="email"
                    required
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter Email Address"
                    className="p-2 rounded-md bg-richblack-600"
                  />
                </label>
              )}
              <button type="submit" className=" bg-yellow-300 text-richblack-900    rounded-md md:py-2 py-1 px-10 ">
                {!emailSent ? "Reset Password " : "Resend Email"}
              </button>
            </form>

            <div>
              <Link to="/login" className="flex gap-2   items-center text-richblack-50">
                <BsArrowLeft/>
                <p>Back to Login</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
