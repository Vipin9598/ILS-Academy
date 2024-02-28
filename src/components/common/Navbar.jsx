import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/ILS.png";
import { Link, matchPath} from "react-router-dom";
import NavbarLinks from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";
import { IoIosArrowDropdownCircle,IoIosArrowDropupCircle } from "react-icons/io";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { categories } from "../../services/apis";
import { setLoading } from "../../slices/authSlice";
import { apiConnector } from "../../services/apiconnector";


import ConfirmationModal from "../core/Dashboard/ConfirmationModal";


const NavBar = () => {
  const { token,isBlurred,loading } = useSelector((state) => state.auth);

  const location = useLocation();
  const [confirmationModal, setConfirmationModal] = useState(null);
  // const [loading,setLoading] = useState(false)

  const [sublinks, setsublinks] = useState([]);
  const [flag,setFlag] = useState(false)
  const dispatch = useDispatch()


  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setsublinks(result.data.data);
      dispatch(setLoading(false))
    } catch (error) {
      console.log("could not fetch the category list");
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(setLoading(true))
    fetchSublinks();
  }, []);

  const matchroute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  
  return (
    <div className={` flex h-[56px]   items-center justify-center border-b border-richblack-500 bg-richblack-800 fixed z-50 w-full  `}>


      <div className={`md:w-11/12 relative w-full flex justify-between items-center mx-auto lg:px-20  sm:px-10 px-2   ${isBlurred ? "blur-sm" :""}`}>
        <Link onClick={loading ? (e)=>e.preventDefault():""} to={"/"} >
            {/* <div className="lg:w-[150px] md:w-[120px] w-[150px] h-[50px]   ">
            <img src={logo} className="object-cover h-[50px] w-full logoimg" alt="Study_Notion"  />
            </div> */}
            <p className="text-white text-xl hover:text-richblack-200">MEDITECH</p>
        </Link>

        <nav>
          <ul className={`md:flex lg:gap-x-6  sm:gap-x-3 text-richblack-25 hidden  `}>
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div   onMouseEnter={loading ?(e)=>e.preventDefault() :()=>setFlag(true)} onMouseLeave={loading?(e)=>e.preventDefault() :()=>setFlag(false)} className=" relative flex items-center gap-2 group ">
                      {link.title}

                      {flag?<IoIosArrowDropupCircle />:<IoIosArrowDropdownCircle />}

                      <div 
                        className="absolute p-4 bg-richblack-5 lg:w-[250px] rounded-md   text-richblack-900 
                                                  invisible group-hover:visible transition-all duration-200  top-[130%] left-[-120%] flex flex-col gap-2 z-40"
                      >
                        <div className="absolute p-4 bg-richblack-5 rotate-45 left-[60%] top-[-5%]  opacity-0 group-hover:opacity-100 transition-all duration-200"></div>

                        {sublinks.map((element, index) => {
                          return (
                            <Link
                              onClick={loading && ((e)=>e.preventDefault())}
                              to={`/catalog/${element.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              key={index}
                              className=""
                            >
                              {element.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <Link onClick={loading && ((e)=>e.preventDefault())} to={link?.path}>
                      <p
                        className={`${
                          matchroute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {" "}
                        {link.title}{" "}
                      </p>
                      {/* second way by using active className */}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex lg:gap-5 sm:gap-2 items-center">
          
          {token === null && (
            <Link to="/login" className="md:block hidden">
              <button className=" text-richblack-200 border border-richblack-700 rounded-md bg-richblack-800 px-3 py-1">
                Log in
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/signup " className="md:block hidden">
              <button className=" text-richblack-200 border border-richblack-700 rounded-md bg-richblack-800 px-3 py-1">
                Sign Up
              </button>
            </Link>
          )}

          { !loading && <ProfileDropDown setConfirmationModal={setConfirmationModal} subLinks={sublinks}/>}
        </div>
      </div>
      <div className="absolute top-[14rem]  sm:min-w-[350px] min-w-[250px]">
        {confirmationModal && (
          <ConfirmationModal modalData={confirmationModal} />
        )}
      </div>
    </div>
  );
};

export default NavBar;
