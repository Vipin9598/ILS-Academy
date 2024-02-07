import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/operations/AuthAPI";
import { setIsBlurred, setLoading } from "../../../slices/authSlice";
import Sidebar from "../Dashboard/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuCross } from "react-icons/lu";
import { sidebarLinks } from "../../../data/dashboard-links";
import SideBarLink from "../Dashboard/SideBarLink";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";

const ProfileDropDown = ({ setConfirmationModal, subLinks }) => {
  const { user } = useSelector((state) => state.profile);
  const { loading,token } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hamActive, setHamActive] = useState(false);
  const [flag, setFlag] = useState(false);

  const logOutFunction = async () => {
    await dispatch(logout(navigate));
    setConfirmationModal(null);
  };
  return (
    <div className="relative flex gap-5 ">
      {user && token && (
        <div className="flex gap-5 items-center relative">
          {user.accountType !== "Instructor" && (
            <Link
              onClick={loading && ((e) => e.preventDefault())}
              to="/dashboard/cart"
              className="relative"
            >
              <AiOutlineShoppingCart className="text-richblack-50 text-lg" />
              {totalItems > 0 && (
                <span className="absolute -top-5 left-2 text-xl text-richblack-300">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          <div
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="md:flex hidden flex-col relative group cursor-pointer"
          >
            <div className=" flex items-center gap-1  ">
              <div className="h-6 w-6 rounded-full overflow-hidden">
                <img
                  src={user?.image}
                  className="object-cover"
                  alt="Profile Pic"
                />
              </div>
              {isOpen ? (
                <IoMdArrowDropup className="text-richblack-100 text-xl" />
              ) : (
                <IoMdArrowDropdown className="text-richblack-100 text-xl" />
              )}
            </div>
            <div
              className={`group group-hover:visible invisible    flex flex-col gap-2  absolute  z-50 top-8 -left-16 w-32   bg-richblack-700 rounded-md border border-richblack-300 py-2  }  `}
            >
              <button
                disabled={loading}
                className="text-richblack-100  hover:text-richblack-25 px-4 md:block hidden"
                onClick={() => navigate("/dashboard/my-profile")}
              >
                DashBoard
              </button>
              <button
                disabled={loading}
                className="text-richblack-100  hover:text-richblack-25 text-start px-4"
                onClick={() => {
                  dispatch(setIsBlurred(true));
                  dispatch(setLoading(true));
                  setConfirmationModal({
                    text1: "Are you Sure ?",
                    text2: "you will be Logged out of your account",
                    btn1Text: "Log Out",
                    btn2Text: "Cancel",
                    btn1Handler: logOutFunction,
                    btn2Handler: () => setConfirmationModal(null),
                  });
                }}
              >
                <div className=" flex gap-2  items-center text-richblack-50">
                  <VscSignOut className="text-xl" />
                  <span>Log Out</span>
                </div>
              </button>

              {/* rotated  div  */}
              <div className="h-5 w-5 bg-richblack-700 absolute -top-3 left-[5.72rem] z-50 rotate-45 group opacity-0 group-hover:opacity-100"></div>
            </div>
          </div>

          
        </div>
      )}
      <div className=" cursor-pointer"  >
            <div className=" md:hidden flex flex-col gap-1 text-white  ">
              {!hamActive ? (
                <GiHamburgerMenu
                onClick={() => {
                  setIsBlurred(true);
                  setHamActive(true);
                }} 
                />
              ) : (
                <LuCross
                  className="rotate-45"
                  onClick={() => {
                    setIsBlurred(false);
                    setHamActive(false);
                  }}
                />
              )}
            </div>
            {hamActive && (
              <div className="absolute w-[calc(100vw-3.5rem)] h-[calc(100vh-3.5rem)] right-0 bg-richblack-700 text-white md:hidden flex opacity-[0.95] justify-center items-center text-lg font-bold rounded-lg">
                <div className="flex flex-col gap-5">
                  <div className=" flex flex-col gap-5">
                    {token && sidebarLinks.map((link) => {
                      if (link.type && link.type !== user?.accountType)
                        return null;
                      return (
                        <Link
                          to={link.path} onClick={()=>setHamActive(false)}
                          className="hover:scale-90 transition-all duration-300 hover:text-richblack-5"
                        >
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>
                  {/* Catalog  */}
                  <div
                    className="hover:scale-90 relative flex gap-5 items-center transition-all duration-300 hover:text-richblack-5 group"
                    onMouseEnter={
                      loading ? (e) => e.preventDefault() : () => setFlag(true)
                    }
                    onMouseLeave={
                      loading ? (e) => e.preventDefault() : () => setFlag(false)
                    }
                  >
                    <p> All Courses</p>
                    {flag ? (
                      <IoIosArrowDropupCircle className="rotate-90" />
                    ) : (
                      <IoIosArrowDropdownCircle className="rotate-90" />
                    )}
                    <div
                      className="absolute py-2 px-10 bg-richblack-5 w-[250px] h-[150px]  overflow-scroll rounded-md   text-richblack-900 invisible group-hover:visible transition-all duration-200  top-10 right-0 flex flex-col gap-2 z-40"
                    >
                      <div className="absolute p-4 bg-richblack-5 rotate-45 -left-[2%] top-[5%]  opacity-0 group-hover:opacity-100 transition-all duration-200 z-20"></div>

                      {subLinks.map((element, index) => {
                        return (
                          <Link
                            onClick={loading && ((e) => e.preventDefault())}
                            to={`/catalog/${element.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            key={index}
                          >
                            {element.name}
                          </Link>
                        );
                      })}
                    </div>

                    <div></div>
                  </div>
                  <Link
                    to="/about" onClick={()=>setHamActive(false)}
                    className="hover:scale-90 transition-all duration-200"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact" onClick={()=>setHamActive(false)}
                    className="hover:scale-90 transition-all duration-200"
                  >
                    Contact Us
                  </Link>
                  <div>
                    {token === null ? (
                      <div className="flex gap-5">
                        <button onClick={()=>{
                          navigate("/login")
                          setHamActive(false)
                        }} className="  text-richblack-50 px-2 py-1 border hover:scale-90 duration-200 transition-all rounded-lg">Log In</button>
                        <button onClick={()=>{
                          navigate("/signup")
                          setHamActive(false)
                        }} className="hover:scale-90 duration-200 transition-all   text-richblack-50 px-2 py-1 border rounded-lg">Sign Up</button>
                      </div>
                    ) : (
                      <div>
                        <button
                          disabled={loading}
                          onClick={() => {
                            setConfirmationModal({
                              text1: "Are you Sure ?",
                              text2: "you will be Logged out of your account",
                              btn1Text: "Log Out",
                              btn2Text: "Cancel",
                              btn1Handler:  logOutFunction,
                              btn2Handler: () => setConfirmationModal(null),
                            });
                            dispatch(setIsBlurred(true));
                            dispatch(setLoading(true));
                          }}
                        >
                          <div className="  flex gap-5 border px-2 py-1 rounded-lg   items-center text-richblack-50 hover:scale-90 duration-200 transition-all">
                            <VscSignOut className="text-xl" />
                            <span>Log Out</span>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
    </div>
  );
};

export default ProfileDropDown;
