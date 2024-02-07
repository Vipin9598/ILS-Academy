import React from "react";
import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import {catalogData} from "../apis"
import { setLoading } from "../../slices/authSlice"

export const fetchCatalogPageData = async(data,dispatch) => {

    const toastId = toast.loading("Loading....");
    dispatch(setLoading(true))
    let result = null;

    try{
        const response = await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,data)
        console.log("Fetch catalog data ji api response .......",response)
        if(!response.data.success){
            throw new Error("Could not fetch catalog detail")
        }
        result = response?.data?.data
        console.log("result dekhte h ",result)
        
    } catch(error){
        console.log("fetch catalog data  ji api error....",error)
        toast.error(error.message)
       
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
    return result
}

