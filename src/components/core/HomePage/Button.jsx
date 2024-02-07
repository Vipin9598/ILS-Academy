import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Button = ({children,active,linkto}) => {
    const {loading} = useSelector((state)=>state.auth)
    
    return (
        <Link  to={linkto} onClick={loading ? (e) => e.preventDefault() :""} >
            <div   className ={`text-center font-semibold sm:text-[13px] text-[11px]   sm:px-6 px-5   py-3 rounded-md  w-fit ${active? " bg-yellow-50 text-black" : "bg-richblack-800 text-richblack-50"}
             transition-all duration-200 hover:scale-95 shadow-sm shadow-white  `}>
                {children}
            </div>
        </Link>
    )
}

export default Button