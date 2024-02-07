import React, { useState } from "react";
import SideBarLink from "./SideBarLink";
import { sidebarLinks } from "../../../data/dashboard-links";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";

import { useSelector } from "react-redux/es/hooks/useSelector";
import Spinner from "../../common/Spinner";
import { logout } from "../../../services/operations/AuthAPI";
import { setIsBlurred, setLoading } from "../../../slices/authSlice";

const Sidebar = ({setConfirmationModal}) => {
  const { isBlurred, loading } = useSelector(
    (state) => state.auth
  );
  const { user } = useSelector(
    (state) => state.profile
  );
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // if (loading ) {
  //   return <Spinner />;
  // }

  return (
    <div
      className={`flex flex-col gap-5 min-w-[fit]  bg-richblack-700 pt-5 relative `}
    >
      <div className={`flex flex-col gap-5 ${isBlurred ? "blur-sm" : ""}`}>
        <div className=" flex flex-col gap-2 ">
          {sidebarLinks.map((link) => {
            if (link.type && link.type !== user?.accountType) return null;
            return <SideBarLink link={link} key={link.id} />;
          })}
        </div>

        {/* <border></border> */}

        <div className="h-[0.1rem] bg-richblack-800 w-[90%] mx-auto"></div>
        <div className=" flex flex-col gap-2">
          <SideBarLink
            link={{
              name: "Settings",
              path: "dashboard/settings",
              icon: "VscSettingsGear",
            }}
          />

          

          <button
          disabled={loading}
            onClick={() => {
              setConfirmationModal({
                text1: "Are you Sure ?",
                text2: "you will be Logged out of your account",
                btn1Text: "Log Out",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              });
              dispatch(setIsBlurred(true));
              dispatch(setLoading(true))
            }}
          >
            <div className="px-5 py-2 flex gap-5  items-center text-richblack-50">
              <VscSignOut className="text-xl" />
              <span>Log Out</span>
            </div>
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default Sidebar;
