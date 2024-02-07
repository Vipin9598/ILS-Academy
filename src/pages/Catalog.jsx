import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import { fetchCatalogPageData } from "../services/operations/CatalogDataApi";
import toast from "react-hot-toast";
import CatalogCourseCard from "../components/core/Catalog/CatalogCourseCard";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Footer from "../components/common/Footer";
import Spinner from "../components/common/Spinner";
import { useDispatch, useSelector } from "react-redux";

const Catalog = () => {
  const { catalogName } = useParams();
  const dispatch = useDispatch()
  const [categoryId, setCategoryId] = useState(null);
  const [spinnerLoading,setSpinnerLoading] = useState(true)
  const [catalogPageData, setCatalogPageData] = useState(null);
  const {isBlurred} = useSelector((state)=>state.auth)

  useEffect(() => {
    const getCategories = async () => {
      setSpinnerLoading(true)
      const response = await apiConnector("GET", categories.CATEGORIES_API,dispatch);
      console.log("response categor ka ",response)
      if (!response?.data?.success) {
        throw new Error("Failed in fetch All category");
        toast.error("Failed to fetch Category");
      }
      const category_Id = response?.data?.data.filter(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]._id;
      await setCategoryId(category_Id);
      console.log("category_id", category_Id, categoryId);
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    
    const getCatalogPageData = async () => {
      try {
        const result = await fetchCatalogPageData({ categoryId },dispatch);
        console.log("resut", result);
        await setCatalogPageData(result);
      } catch (error) {
        console.log(error);
      }
      setSpinnerLoading(false)
    };
    if (categoryId) {
      getCatalogPageData();
    }
    
  }, [categoryId]);

  return (
    <div  className={`mt-[56px]  ${isBlurred ? "blur-sm" : ""}`} >
      {spinnerLoading ? (
        <div className="w-screen h-screen  items-center flex justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="text-white flex flex-col gap-3 ">
          <div className="  bg-richblack-800">
            <div className="lg:w-10/12 sm:w-11/12 w-[95%] mx-auto flex flex-col gap-3 py-10 md:text-lg  text-[15px]">
              <p>
                Home / Catalog /
                <span className="text-yellow-100">
                  {" "}
                  {catalogPageData?.selectedCategory?.name}
                </span>
              </p>
              <p>{catalogPageData?.selectedCategory?.name}</p>
              <p className="text-richblack-400">
                <span className="text-white">Description  : </span>{catalogPageData?.selectedCategory?.desc}{" "}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3  w-10/12 mx-auto">
            {/* section 1 */}

            <div className=" flex flex-col gap-3 py-3 ">
              <div>
                <p className="text-xl">Courses to Get You Started</p>
              </div>

              <div className="flex gap-5 ">
                <p>Most Popular</p>
                <p>New</p>
              </div>

              <div className="py-5">
                {catalogPageData?.selectedCategory?.courses.length == 0 ? (
                  <div>No data Found For This Course</div>
                ) : (
                  <CourseSlider
                    courses={catalogPageData?.selectedCategory?.courses}
                  />
                )}
              </div>
            </div>

            {/* section 2 */}

            <div className=" flex flex-col gap-3 pt-3 ">
              <p className="text-xl">
                Top Courses in{" "}
                <span className="text-yellow-100">
                  {catalogPageData?.differentCategory?.name}
                </span>
              </p>
              <div className="py-5">
                {catalogPageData?.differentCategory?.courses.length == 0 ? (
                  <div className=" italic">No data Found For This Course</div>
                ) : (
                  <CourseSlider
                    courses={catalogPageData?.differentCategory?.courses}
                  />
                )}
              </div>
            </div>

            {/* section 3  */}
            <div className=" flex flex-col gap-3 py-3 ">
              <div className="text-xl">Frequently Bought</div>
              <div className="py-5">
                {catalogPageData?.mostSellingCourses.length == 0 ? (
                  <div>
                    Courses is Under Progress Please Give us Time to make
                    courses and provide you golden Content{" "}
                  </div>
                ) : (
                  <div className="flex flex-wrap justify-center items-center gap-5">
                    {catalogPageData?.mostSellingCourses
                      .slice(0, 4)
                      .map((course, index) => (
                        <CatalogCourseCard
                          course={course}
                          key={index}
                          height={"h-[250px]"}
                        />
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Footer />
        </div>
      )}
    </div>
  );
};

export default Catalog;
