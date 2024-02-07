import React, { useEffect, useState } from "react";
import Spinner from "../components/common/Spinner";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../services/operations/AuthAPI";
import { Link } from "react-router-dom";
import { signUp } from "../services/operations/AuthAPI";
import { BsArrowLeft } from "react-icons/bs";
import { GiBackwardTime } from "react-icons/gi";

const VerifyEmail = () => {
  const [OTP, setOTP] = useState("");
  const { loading, signUpData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
      if(!signUpData){
          navigate("/signup");
      }
  },[])

  function submitHandler(event) {
    event.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signUpData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        OTP,
        navigate
      )
    );
  }

  return (
    <div className="h-screen flex justify-center items-center mt-[56px]">
      {
        <div className=" flex flex-col gap-6 w-[28%]">
          <h1 className="text-richblack-50 text-3xl text-center font-semibold">
            Verify Email
          </h1>
          <p className="text-richblack-200 text-lg">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={submitHandler} className=" flex flex-col gap-5">
            <OTPInput
              value={OTP}
              onChange={setOTP}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
            <button
            disabled={loading}
              type="submit"
              className="bg-yellow-300 p-2 text-richblack-900 text-lg font-semibold w-full rounded-lg"
            >
              Verify Email
            </button>
          </form>

          <div className="flex justify-between my-2">
            <div>
              <Link
                onClick={loading ? (e)=>e.preventDefault() : ""}
                to="/login"
                className="flex gap-2   items-center text-richblack-50"
              >
                <BsArrowLeft />
                <p>Back to Login</p>
              </Link>
            </div>

            <button
              onClick={() => dispatch(sendOtp(signUpData.email, navigate))}
              className=" text-caribbeangreen-400 text-lg flex gap-2 items-center"
            >
              <GiBackwardTime className="text-xl" />
              Resend it
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default VerifyEmail;
