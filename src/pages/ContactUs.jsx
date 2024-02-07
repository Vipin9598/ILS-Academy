import React from "react";
import { BiChat } from "react-icons/bi";
import { BiWorld } from "react-icons/bi";
import { IoCallOutline } from "react-icons/io5";
import ContactUsForm from "../components/core/AboutUs/ContactUsForm";
import Footer from "../components/common/Footer";
import Review from "../components/common/Review";
import { useSelector } from "react-redux";

const ContactUs = () => {
  const data = [
    {
      name: "chat with us",
      desc: "our friendly team is here to help",
      example: "@mail address",
      icon: <BiChat />,
    },
    {
      name: "visit us",
      desc: "come and say hello at our office HQ",
      example: "Here is the location/Address",
      icon: <BiWorld />,
    },
    {
      name: "call us",
      desc: "Mon-Fri from 8AM to 5PM",
      example: "+123 456789",
      icon: <IoCallOutline />,
    },
  ];
  const {isBlurred} = useSelector((state)=>state.auth)

  return (
    <div className={`mt-[56px]  ${isBlurred ? "blur-sm" : ""}`}>
      <div className="bg-richblack-900 mb-10 ">
        <div className="lg:w-10/12 md:w-11/12 w-10/12  mx-auto">
          <div className="flex md:flex-row flex-col justify-evenly gap-y-10 mt-20 ">
            <div className=" flex flex-col gap-8 px-5 h-fit lg:pr-20 md:pr-10 sm:pr-20 pr-0 py-10 bg-richblack-800 rounded-lg">
              {data.map((element, index) => {
                return (
                  <div className="flex gap-2" key={index}>
                    <div className="text-lg text-richblack-200 mt-1">
                      {element.icon}
                    </div>

                    <div className="text-richblack-400 text-sm flex flex-col ">
                      <p className="text-lg tracking-wide text-richblack-50">
                        {element.name}
                      </p>
                      <p>{element.desc}</p>
                      <p>{element.example}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* <form></form> */}

            <div className="lg:w-[40%] md:w-[50%] flex flex-col gap-4 outline py-10 md:px-10 px-2 outline-richblack-200 outline-1 rounded-lg">
              <h1 className="text-3xl font-bold text-richblack-100">
                Got a Idea? We’ve got the skills. Let’s team up
              </h1>
              <p className="text-base text-richblack-400 ">
                Tall us more about yourself and what you’re got in mind.
              </p>
              <ContactUsForm />
            </div>
          </div>
        </div>
        {/* review */}
        <div className="mt-20">
          <Review />
        </div>
      </div>
      {/* <footer></footer> */}
      <Footer />
    </div>
  );
};

export default ContactUs;
