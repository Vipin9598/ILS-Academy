const { reset } = require("nodemon")
const Category = require("../models/category")
const Course = require("../models/course")
const CourseProgress = require("../models/courseprogress")
const User = require("../models/user")
const {uploadtoCloudinary} = require("../utils/cloudinaryUploader")
const { default: mongoose } = require("mongoose")
    
// create course

exports.createCourse = async(req,res) => {
    try{
        const {courseName,courseDescription,category,whatYouWillLearn,price,instructions,tags}= req.body

        const thumbnail = req.files.thumbnail;
        console.log("thumbnail",req.files.thumbnail)
        // y lgana h  || !thumbnail
        console.log("courseName",thumbnail)
        // console.log("courseDescription",courseDescription)
        // console.log("category",category)
        // console.log("whatYouWillLearn",whatYouWillLearn)
        // console.log("price",price)
        // console.log("tags",tags)

        if(!courseName || !courseDescription || !category || !price || !whatYouWillLearn || !instructions || !tags || !thumbnail){
            return res.status(402).json({
                success:false,
                message:"All fields are mandatry smjh n a"
            })
        }

        const userId = req.user.id
        const InstructorDetail = await User.findById(userId)
        console.log("Instructor detail : ",InstructorDetail)

        if(!InstructorDetail){
            return res.status(404).json({
                success:false,
                message:"Instructor not found"
            })
        }

        const categoryDetails = await Category.findById(category) // y line smjh nhi aai
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category not found"
            })
        }

        const thumbnailImage = await uploadtoCloudinary(thumbnail,process.env.FOLDER_NAME)
        console.log("..............................",whatYouWillLearn)

        const newCourse= await Course.create({
            courseName,
            courseDescription,
            instructor:InstructorDetail._id,
            category:categoryDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            instructions:instructions,
            tags:tags,
            thumbnail:thumbnailImage.secure_url,
            status:"Draft"
        })
        console.log(".....",newCourse);

        await User.findByIdAndUpdate({_id:InstructorDetail._id},
            {
                $push:{
                    courses:newCourse._id
                }
            },{new:true}
        )
        
        // update category 

        await Category.findByIdAndUpdate({_id:category},
            {
                $push:{
                    courses:newCourse._id
                }
            },{new:true}
        )

        return res.status(200).json({
                success:true,
                message:"course created successfully",
                data:newCourse
        })


    } catch(error){
        return res.json({
            success:false,
            message:"Failed to create new course try again",
            error:error.message
        })
    }
}

//get all courses  name 

exports.getAllCourses = async(req,res) => {
    try{

        const allCourses = await Course.find({},{
                                                courseName:true,
                                                courseDescription:true,
                                                price:true,
                                                instructor:true,
                                                ratingANDreviews:true,

        }).populate("instructor").exec();

        return res.status(200).json({
            success:true,
            message :"all courses are fetched  successfully",
            allCourses
        })

    } catch(error){
        return res.status(404).json({
            success:false,
            message:"Error while fetching the Course Data",
            error:error.message
        })
    }
}

// get course detail

exports.getCourseDetail = async(req,res) => {
    
    try{
        const {courseId} = req.body

        const courseDetail = await Course.findById(courseId)
                                                    .populate({
                                                        path:"instructor",
                                                        populate:{
                                                            path:"additionalDetails"
                                                        }
                                                    })
                                                     .populate("category")
                                                    .populate("ratingANDreviews")
                                                    .populate({
                                                        path:"courseContent",
                                                        populate:{
                                                            path:"subSection"
                                                        }
                                                    })
        
    // validation 


      if(!courseDetail){
        return res.status(400).json({
            success:false,
            message:`could not find the course with this  id ${courseId}`,          
        })
      }
      
      return res.status(200).json({
        success:true,
        message:"course detail fetched successfully",
        data:courseDetail
      })

    } catch (error) {
        console.log(error)
        return  res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

exports.editCourseDetail = async(req,res) => {
    try {
        const { courseId } = req.body
        const updates = req.body
        const course = await Course.findById(courseId)
    
        if (!course) {
          return res.status(404).json({ error: "Course not found" })
        }
    
        // If Thumbnail Image is found, update it
        if (req.files) {
          console.log("thumbnail update")
          const thumbnail = req.files.thumbnail
          const thumbnailImage = await uploadtoCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
          )
          course.thumbnail = thumbnailImage.secure_url
        }
    
        // Update only the fields that are present in the request body
        for (const key in updates) {
          if (updates.hasOwnProperty(key)) {
            if (key === "tag" || key === "instructions") {
              course[key] = JSON.parse(updates[key])
            } else {
              course[key] = updates[key]
            }
          }
        }
    
        await course.save()
    
        const updatedCourse = await Course.findOne({
          _id: courseId,
        })
          .populate({
            path: "instructor",
            populate: {
              path: "additionalDetails",
            },
          })
          .populate("category")
          .populate("ratingANDreviews")
          .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          })
          .exec()
          console.log("...",updatedCourse)
    
        res.json({
          success: true,
          message: "Course updated successfully",
          data: updatedCourse,
        })
      } catch (error) {
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        })
      }
}

// exports.getUserAllCourses = async(req,res) => {
//     try{
//         const userId = req.user.id
//          const userDetail = await User.findById(userId).populate({
//                                                         path:"courses",
//                                                         populate:{
//                                                             path:"courseContent" ,
//                                                             populate:{
//                                                                 path:"subSection"
//                                                             }
//                                                         }
//                                                     })
        
//         const userAllCourses = userDetail.courses;
//         console.log("user all courses ", userAllCourses)

//         return res.status(200).json({
//             success:true,
//             message:"All course are fetched Successfully ",
//             userAllCourses
//         })

//     } catch(error){
//         console.log(error)
//         return res.status(400).json({
//             success:false,
//             message:error.message
//         })
//     }
// }

exports.deleteCourse = async(req,res) => {
    try{
        const {courseId} = req.body
        console.log("courseId",courseId)
        const courseDetail = await Course.findById(courseId)
        if(!courseDetail){
            return res.status(400).json({
                success:false,
                message:"Course Not Found"
            })
        }

        await Course.findByIdAndDelete(courseId);
        return res.status(200).json({
            success:true,
            message:"course deleted successfully"
        })
        
    } catch (error) {
        console.log(erro)
        return res.status(400).json({
            success:true,
            message:error.message
        })
    }
}


exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      const userId = req.user.id
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingANDreviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      let courseProgressCount = await CourseProgress.findOne({
        courseId: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      // let totalDurationInSeconds = 0
      let totalLecture=0
      courseDetails.courseContent.forEach((content) => {
        totalLecture += content.subSection.length
      })
  
      // const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success:true,
        data: {
          courseDetails,
          // totalDuration,
          totalLecture,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  
  // Get a list of Course for a given Instructor
  exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).populate("category").exec()
      
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }