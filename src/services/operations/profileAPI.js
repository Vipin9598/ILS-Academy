import { toast } from "react-hot-toast"

import {  setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { profileEndpoints } from "../apis"
import { logout } from "./AuthAPI" 
import {setLoading} from "../../slices/authSlice"



const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API,GET_INSTRUCTOR_DASHBOARD_DATA_API } = profileEndpoints

export function getUserDetails(token, navigate,dispatch) {

  dispatch(setLoading(true))
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      dispatch(setUser({ ...response.data.data, image: userImage }))
    } catch (error) {
      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)

  }
  dispatch(setLoading(false))
}

export const getUserEnrolledCourses = async(token,dispatch) => {

  let result = []
  dispatch(setLoading(true))
  const toastId = toast.loading("Loading...")
  try {
    
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  dispatch(setLoading(false))
  toast.dismiss(toastId)
  return result
}


export async function getInstructorData(token,dispatch){

  const toastId = toast.loading("Loading....")
  dispatch(setLoading(true))
  let result =[]
  try{
    const response = await apiConnector("GET",GET_INSTRUCTOR_DASHBOARD_DATA_API,null,
    {
      Authorization:`Bearer ${token}`
    })

    console.log("Instructor Dashboard API Response",response)
   result = response?.data?.data
  } catch(error){
    console.log("Get Instructor Api Eror",error)
    toast.error("could Not Get Instructor Data")
  }
  toast.dismiss(toastId)
  dispatch(setLoading(false))
  return result;
}