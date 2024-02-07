import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../../services/apiconnector";
import { contactusEndpoint } from "../../../services/apis";
import countryCode from "../../../data/countrycode.json"
import {toast} from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../slices/authSlice";

const ContactUsForm = () => {
  const {loading} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(
        {
          email: "",
          firstName: "",
          lastName: "",
          phoneNumber: "",
          message: "",
        },
        [reset, isSubmitSuccessful]
      );
    }
  });

  const submitHandler = async (data) => {
    const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))

    try {
      
      const response = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );
      // const response = {status:"ok"}
      console.log("Logging response ", response);
      if(response.data.success){
        toast.success("Message Sent Successfully")
      }
      
    } catch (error) {
      console.log("Error : ", error);
      
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-5  w-[100%] text-richblack-50 ">
      <div className="flex w-full justify-between contactFormName">
        {/* first name  */}
        <div className="flex flex-col gap-1 w-[47%] contactNameWidth ">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter First Name"
            className=" rounded-md py-2 px-1 border-b-2 border-richblack-25 w-full bg-richblack-700 "
            {...register("firstName", { required: true })}
          />
          {errors.firstName && <span>Please Enter Your Name</span>}
        </div>

        {/* last Name */}

        <div className="flex flex-col gap-1 w-[47%] contactNameWidth">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter Last Name"
            className=" rounded-md py-2 px-1 border-b-2 border-richblack-25  bg-richblack-700 "
            {...register("lastName")}
          />
        </div>
      </div>

      {/* email\ */}

      <div className="flex flex-col gap-1">
        <label htmlFor="email">Enter Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
          className=" rounded-md py-2 px-1 border-b-2 border-richblack-25  bg-richblack-700 "
          {...register("email", { required: true })}
        />
        {errors.email && <span>Please Enter Your email</span>}
      </div>

      {/* Phone Number with country code  */}

      <div className="flex flex-col gap-2 w-full" >
        <label htmlFor="phone-number">Phone Number</label>
        <div className="flex  gap-5 w-full justify-between">
          {/* drop down  */}
          <div className="w-[40%] ">
            <select
            name="dropDown"
            id="dropDown"
            {...register("countryCode",{required:true})}
            className=" rounded-md py-2 px-1 border-b-2 border-richblack-25  bg-richblack-700 w-full">
             {
              countryCode.map((element,index)=>{
                return(
                  <option key={index} value={element.code}  className= "optionwidth bg-richblack-800"
                  selected={element.code==="+91"} >
                    {element.code}-{element.country}
                    
                  </option>
                )
              })
             }
            </select>
          </div>

          {/* //number */}
          <div className="w-[70%] ">
            <input
              type="tel"
              name="phone-number"
              id="phone-number"
              placeholder="12345 67890"
              {...register("phoneNumber",
                {required:{value:true,message:"Please enter mobile number"},
                 maxLength:{value:10,message:"Enter Valid Phone Number"},
                 minLength:{value:10,message:"Enter Valid Phone Number"}  
                })
              }
              className=" rounded-md py-2 px-1 border-b-2 border-richblack-25  bg-richblack-700 w-full "
            />
            {
              errors.phoneNumber  && (
                <span>{errors.phoneNumber.message}</span>
              )
            }
          </div>

        </div>

      </div>

      {/* message */}
      <div className="flex flex-col gap-1">
        <label htmlFor="message">Message</label>
        <textarea name="message" id="message"
          placeholder="Leave your thoughts here.... "
          cols={20}
          rows={5}
          {...register("message",{required:true})}
          className=" rounded-md py-1 px-1 border-b-2 border-richblack-25  bg-richblack-700 "
        />
        {
          errors.message && (
            <span>
              Please Leave the message Here
            </span>
          )
        }
      </div>

      {/* button  */}
      <button 
        disabled={loading}
        className="bg-yellow-50 text-black w-full rounded-md py-2 text-xl transition-all duration-200 hover:scale-95" type="submit">
        Send Message
      </button>
    </form>
  );
};

export default ContactUsForm;
