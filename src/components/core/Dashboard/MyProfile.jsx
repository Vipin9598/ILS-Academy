import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Iconbtn from "./Iconbtn";

import { VscEdit } from "react-icons/vsc";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  console.log("User",user)
  const { isBlurred } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <div
      className={`text-richblack-50 xl:px-20 lg:px-10 md:px-5  xl:w-[80%] lg:w-[85%] w-[97%] mx-auto ${
        isBlurred ? "blur-sm" : ""
      }`}
    >
      <div className=" xl:w-11/12 w-full mx-auto flex flex-col gap-5  ">
        <h1 className="sm:text-2xl text-xl ">My Profile</h1>
        <div className="flex w-full justify-between outline outline-1 bg-richblack-700 lg:px-10 md:px-4 sm:px-10 px-4 py-3 rounded-lg lg:text-lg md:text-[15px] sm:text-lg text-[15px]">
          <div className=" flex sm:gap-8  gap-4 w-full">
            <div className="items-center flex">
              <img
                src={user?.image}
                alt={`${user?.firstName.charAt(0)}`}
                className=" aspect-square  rounded-full w-[40px]  "
              />
            </div>
            <div className=" flex flex-col gap-2 w-full ">
              <div className="flex justify-between w-[100%]">
                <p>{user?.firstName + " " + user?.lastName}</p>
                <Iconbtn
                  text={"Edit"}
                  onclick={() => navigate("/dashboard/settings")}
                >
                  <VscEdit />
                </Iconbtn>
              </div>
              <div>
                {user?.email}
              </div>
            </div>
          </div>
        </div>

        {/* section 2 */}

        <div className=" bg-richblack-700 lg:px-10 md:px-4 sm:px-10 px-4 py-3 lg:text-lg md:text-[15px] sm:text-lg text-[15px] rounded-lg outline outline-1">
          <div className=" flex justify-between items-center mb-5 ">
            <p>About</p>
            <Iconbtn
              text={"Edit"}
              onclick={() => navigate("/dashboard/settings")}
            >
              <VscEdit />
            </Iconbtn>
          </div>
          <p>
            {user?.additionalDetails?.about ??
              "Write Something about yourself........"}
          </p>
        </div>

        {/* section 3 */}

        <div className="flex flex-col gap-2 bg-richblack-700 rounded-lg lg:px-10 md:px-4 sm:px-10 px-4 py-3 outline outline-1">
          <div className="flex justify-between items-center mb-5">
            <p>Personal Details</p>
            <Iconbtn
              text={"Edit"}
              onclick={() => navigate("/dashboard/settings")}
            >
              <VscEdit />
            </Iconbtn>
          </div>
          <div className="grid grid-cols-2  gap-5 lg:text-lg md:text-[15px] sm:text-lg text-[15px] ">
            <div className="flex flex-col gap-1">
              <p className="text-richblack-400">First Name</p>
              <p className="lg:text-lg md:text-[15px] sm:text-lg text-[15px]  text-richblack-100">
                {user?.firstName}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className=" text-richblack-400">Last Name</p>
              <p className=" text-richblack-100">{user?.lastName}</p>
            </div>

            <div className="flex flex-col gap-1 contactGrid3">
              <p className=" text-richblack-400">Email</p>
              <p className=" text-richblack-100">{user?.email}</p>
            </div>

            <div className="flex flex-col gap-1 contactGrid4">
              <p className=" text-richblack-400">Contact Number</p>
              <p className=" text-richblack-100">
                {user?.additionalDetails?.contactNumber ??
                  "Enter Contact Number"}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className=" text-richblack-400">Gender</p>
              <p className=" text-richblack-100">
                {user?.additionalDetails?.gender ?? "Enter your Gender"}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className=" text-richblack-400">Date of Birth</p>
              <p className=" text-richblack-100">
                {user?.additionalDetails?.dateOfBirth ?? "Enter Date of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
