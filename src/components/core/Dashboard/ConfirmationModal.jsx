import React, { useEffect } from "react";
import Iconbtn from "./Iconbtn";
import { useDispatch } from "react-redux";
import { setIsBlurred, setLoading } from "../../../slices/authSlice";

const ConfirmationModal = ({ modalData }) => {
  const dispatch = useDispatch();
  const cancelModalHandler = () => {
    modalData?.btn2Handler();
    dispatch(setIsBlurred(false));
    dispatch(setLoading(false));
  };

  const logOutHandler = () => {
    modalData?.btn1Handler();
    dispatch(setIsBlurred(false));
    dispatch(setLoading(false));
  };
  return (
    <div className="text-richblack-50  bg-opacity-100 sm:px-5 px-3 sm:py-5 py-1 min-w-fit flex flex-col sm:gap-8 gap-3 outline outline-1 rounded-lg bg-black  z-10 absolute ">
      <div className="flex flex-col sm:gap-5  gap-2">
        <p>{modalData.text1}</p>
        <p>{modalData.text2} </p>
      </div>
      <div className="flex sm:gap-20 gap-10">
        <button
          onClick={logOutHandler}
          className="bg-yellow-5 text-richblack-700 rounded-lg font-semibold sm:px-2 px-[2px] py-1 hover:scale-95 w-fit transition-all duration-200"
        >
          {modalData.btn1Text}
        </button>

        <button
          onClick={cancelModalHandler}
          className="bg-richblack-700 text-richblack-5 sm:px-2 px-[2px] py-1 rounded-lg"
        >
          {modalData.btn2Text}
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
