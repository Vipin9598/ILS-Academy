import React, { useState } from "react";
import Spinner from "../components/common/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../services/operations/AuthAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import {BsArrowLeft} from "react-icons/bs"

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  function changeHandler(event) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }
  const { password, confirmPassword } = formData;

  function submitHandler(event) {
    event.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  }
  return (
    <div className="text-richblack-100 h-screen mt-[56px] w-full flex justify-center items-center">
      <div className="xl:max-w-[27%] lg:max-w-[32%] md:max-w-[40%] sm:max-w-[45%] max-w-[265px] ">
        { 
          <div className="text-richblack-25 flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">Choose New Password</h1>
            <p className="text-richblack-300">Almost done. Enter your new password and you're all set.</p>
            <form onSubmit={submitHandler} className="w-full flex flex-col gap-5">
              <label className="flex flex-col gap-2 relative">
                <p> New Password</p>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  required
                  placeholder="Enter Password"
                  onChange={changeHandler}
                  className="p-2 rounded-lg bg-richblack-700 text-richblack-25"
                />
                <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 bottom-3 text-xl">
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </label>

              <label className="flex flex-col gap-2 relative">
                <p>Confirm New Password</p>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  required
                  placeholder="Enter Confirm Password"
                  onChange={changeHandler}
                  className="p-2 rounded-lg bg-richblack-700 text-richblack-25"
                />

                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 bottom-3 text-xl"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
              </label>

              <button disabled={loading} type="submit" className="bg-yellow-300 p-2 rounded-lg mt-2">Reset Password</button>
            </form>
            <div>
              <Link onClick={loading ? (e)=>e.preventDefault() : ""} to="/login" className="flex gap-2   items-center text-richblack-50">
                <BsArrowLeft/>
                <p>Back to Login</p>
              </Link>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default UpdatePassword;
