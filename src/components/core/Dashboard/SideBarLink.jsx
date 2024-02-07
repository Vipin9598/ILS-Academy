import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch, useSelector } from 'react-redux'
import { matchPath, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const SideBarLink = ({link}) => {

    const Icon = Icons[link.icon]
    const location = useLocation()
    const dispatch = useDispatch()
    const {loading} = useSelector((state)=>state.auth)

    const matchRoute =(route)=>{
        return matchPath({path:route},location.pathname)
    }

  return (
    <Link onClick={loading ? (e)=>e.preventDefault() : ""}  className={`px-5 py-2 flex gap-5  items-center text-richblack-50  ${matchRoute(link.path) ? "bg-yellow-800 border-l-4 border-yellow-50" :"bg-transparent"}`} to={link.path}>
      <Icon className="text-xl"/>
      <span>{link.name}</span>
    </Link>
  )
}

export default SideBarLink
