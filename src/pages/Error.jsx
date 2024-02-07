import React from 'react'
import { useSelector } from 'react-redux'

const Error = () => {
  const {isBlurred}=useSelector((state)=>state.auth);
  return (
    <div className={`flex justify-center items-center text-3xl text-red mt-[56px]  ${isBlurred ? "blur-sm" : ""}`}>
      Error-404 Not Found
    </div>
  )
} 

export default Error
