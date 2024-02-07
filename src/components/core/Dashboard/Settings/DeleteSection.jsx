import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";

import { deleteProfile } from "../../../../services/operations/SettingsAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setIsBlurred, setLoading } from "../../../../slices/authSlice";

const DeleteSection = ({setConfirmationModal}) => {
  
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="py-5 lg:px-12 md:px-5 sm:px-10 px-1 bg-gradient-to-b  bg-pink-800 opacity-70">
      <div className="flex sm:gap-7 gap-2 relative">
        
        <div>
          <RiDeleteBinLine  className="sm:text-4xl text-2xl text-pink-200"/>
        </div>

        <div className="flex flex-col gap-5 relative text-richblack-100">
          <h1 className=" text-richblack-5 font-semibold sm:text-xl">Delete Account</h1>
          <p>Would You like to Delete Account</p>
          <p className=" sm:max-w-[80%] w-full text-justify">
            This account contains Paid Courses. Deleting your account will
            remove all the contain associated with it.
          </p>
          <button
            onClick={() =>{
              dispatch(setIsBlurred(true))
              dispatch(setLoading(true))
              setConfirmationModal({
                text1: "Are you Sure ?",
                text2: "you will be Logged out of your account",
                btn1Text: "Delete Account",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(deleteProfile(token, navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }}

          >
            <div className=" italic underline py-2 flex gap-5  items-center text-pink-300 sm:text-xl  font-semibold">
              <span>I Want to Delete my account</span>
            </div>
          </button>
          
        </div>

       

      </div>
    </div>
  );
};

export default DeleteSection;
