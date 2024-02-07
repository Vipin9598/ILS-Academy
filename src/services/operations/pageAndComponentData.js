import React from 'react'
import {toast} from "react-hot-toast"
import { apiConnector } from '../apiconnector';
import { catalogData } from '../apis';
import { setLoading } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';
export const getCatalogaPageData = async(categoryId,dispatch) => {

  const toastId = toast.loading("Loading...");
  dispatch(setLoading(true))
  let result = [];
  try{
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, 
        {categoryId: categoryId,});

        if(!response?.data?.success)
            throw new Error("Could not Fetch Category page data");

         result = response?.data;

  }
  catch(error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    toast.error(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  dispatch(setLoading(false))
  return result;
}

