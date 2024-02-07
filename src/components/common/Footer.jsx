import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className=" pb-20 bg-richblack-800 items-center">
      {/* width vali */}
      <div className="text-richblack-300 xl:w-10/12 lg:w-11/12 w-full px-2 mx-auto flex flex-col  gap-5 pt-10">
        <div  className="flex md:flex-row flex-col gap-5  md:justify-between  mx-auto   border-b-2 w-fit border-richblack-50 py-5 pb-20">
          {/* left section  */}
          <div className="flex sm:flex-row flex-wrap  xl:gap-10 lg:gap-7 gap-5 justify-between  md:w-[50%] w-fit md:border-r border-r-0 md:border-b-0 border-b  border-richblack-600">
            <div className="flex flex-col gap-3 px-5">
              {/* <div>
                <img src={Logo}  width={130} />
              </div> */}
              <p className="text-richblack-25 text-lg ">ILS Academy</p>
              <div className="flex flex-col gap-2 ">
                {["About", "Careers", "Affiliates"].map((element, index) => {
                  return (
                    <p key={index}>
                      <Link to={element.split(" ").join("-").toLowerCase()} key={index} className="text-[15px]" >
                        {element}
                      </Link>
                    </p>
                  );
                })}
              </div>
              <div className="flex gap-2 text-[18px] mt-2">
                <FaFacebook className="hover:text-pink-200"/>
                <FaGoogle className="hover:text-pink-300"/>
                <FaTwitter className="hover:text-pink-300"/>
                <FaYoutube className="hover:text-pink-300"/>
              </div>
            </div>

            <div className=" flex flex-col gap-3 px-5">
              <p className="text-richblack-100 text-lg ">
                Resources
              </p>
              <div className="flex flex-col gap-2">
                {Resources.map((element, index) => {
                  return (
                    <Link
                    className="text-[15px]" 
                      key={index}
                      to={element.split(" ").join("-").toLowerCase()}
                    >
                      {element}
                    </Link>
                  );
                })}
              </div>
              <p className="text-richblack-100 text-lg ">Support</p>
              <div>
                <Link to="/help-center" className="text-[15px]" >Help-center</Link>
              </div>
            </div>

            <div className="flex flex-col gap-3 px-5">
              <p className="text-richblack-100 text-lg">Plans</p>
              <div className="flex flex-col gap-2">
                {Plans.map((element, index) => {
                  return (
                    <Link
                      to={element.split(" ").join("-").toLowerCase()}
                      key={index}
                      className="text-[15px]" 
                    >
                      {element}
                    </Link>
                  );
                })}
              </div>
              <p className="text-richblack-100 text-lg ">
                Community
              </p>
              <div className="flex flex-col gap-2">
                {Community.map((element, index) => {
                  return (
                    <Link
                      to={element.split(" ").join("-").toLowerCase()}
                      key={index}
                      className="text-[15px]" 
                    >
                      {element}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* right section  */}
          <div className=" flex sm:flex-row flex-wrap xl:gap-10 lg:gap-7 md:gap-5 gap-4 w-fit">
            {FooterLink2.map((element, index) => {
              return (
                <div key={index} className="flex flex-col gap-3 px-5 ">
                  <p className="text-richblack-25 text-lg ">
                    {element.title}
                  </p>
                  <div className="flex flex-col gap-2">
                    {element.links.map((elem, index) => {
                      return (
                        <Link key={index} to={elem.link} className="text-[15px]" >
                          {elem.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* bottom vala  */}
        <div className="flex justify-between sm:flex-row flex-col gap-5">

            <div className=" flex sm:flex-row flex-col  gap-2">
                {
                    BottomFooter.map((element,index)=>{
                        return (
                            <p key={index} className={` text-[15px] ${BottomFooter.length-1 == index ? "":"border-r-2 border-richblack-400"} px-3`}>
                                {element}
                            </p>
                        )
                    })
                }
            </div>
            <div className="text-center">Made with ❤️  2023 ILS Academy</div>
        </div>
      </div> 
    </div>
  );
};

export default Footer;
