const course = require("../models/course");
const courseprogress = require("../models/courseprogress");
const Profile = require("../models/profile");
const User = require("../models/user")
const {uploadtoCloudinary}= require("../utils/cloudinaryUploader")
require("dotenv").config()

exports.updateProfile = async(req,res) =>{
    try{
        const {dateOfBirth,gender,about,contactNumber,firstName,lastName} = req.body;
        const userId = req.user.id
        console.log("req",userId)

        const userdetail = await User.findById(userId)
        const profileId = userdetail.additionalDetails
        const profileDetails = await Profile.findById(profileId)

        if(gender){
            profileDetails.gender = gender
        }
        if(about){
            profileDetails.about = about
        }
        if(dateOfBirth){
            profileDetails.dateOfBirth = dateOfBirth
        }
        if(contactNumber){
            profileDetails.contactNumber = contactNumber
        }
        if(firstName){
          userdetail.firstName=firstName
        }
        if(lastName){
          userdetail.firstName=lastName
        }

        await profileDetails.save()
        await userdetail.save()
        const updatedUserDetails = await User.findById(userId).populate("additionalDetails")

        return res.status(200).json({
            success:true,
            message:"profile updated successfully",
            profileDetails,
            updatedUserDetails
        })

    } catch(error) {
        return res.status(400).json({
            success:false,
            message:"Failed to update the file try after  some time ",
            error:error.message
        })
    }
}

exports.deleteAccount = async(req,res) =>{
    try{
        const id = req.user.id
        const userdetail = await User.findById(id)

        await Profile.findByIdAndDelete(userdetail.additionalDetails)

        // pta kro ki agar account delete krne p y id course enroled se automatic delete 
        // hogi ya khud krni pdegi -->search

        await User.findByIdAndDelete(id)

        return res.status(200).json({
            success:true,
            message:"Account Deleted Successfully"
        })
    } catch(error){
        return res.status(400).json({
            success:false,
            message:"Failed to delete the account try after some  time ",
            error:error.message
        })
    }
}



// all detail of all user

exports.getAllUserDetails = async(req,res) =>{
    try{
        const userId = req.user.id
        const userDetail = await User.findById(userId).populate("additionalDetails").exec()
        return res.status(200).json({
            success:true,
            message :"Detail found Successfully",
            userDetail
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Failed to Fetch the delete",
            error:error.message
        })
    }
}


exports.updateDisplayPicture = async (req, res) => {
  
    try {
      console.log("picture dhond rhe h ")
      console.log("picture",req.files.displayPicture)
      const profileImage = req.files.displayPicture
      console.log("picture mil gi ab id dej=khte")

      
      const userId = req.user.id
      console.log("id bhi mil gi")
      
  
      const image = await uploadtoCloudinary(
        profileImage,
        process.env.FOLDER_NAME,1000,1000
      )
      
      // console.log(image)
      const updatedUserDetails = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      console.log("image.secure_url",image.secure_url)
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data:updatedUserDetails,
      })
    } catch (error) {
      console.log("error : ",error)
      return res.status(500).json({
        success: false,
        message:"failed to connect with cloudinary",
        error:error.message

      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
    
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
          path:"courses",
          populate:{
            path:"courseContent",
            populate:{
              path:"subSection"
            }
          }
        })
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }

      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};


exports.instructorDashboard =  async(req,res)=>{
  try{
    const courseDetail = await course.find({instructor:req.user.id})
    const courseData = courseDetail.map((course)=>{
      const totalStudentEnrolled = course.studentEnrolled.length
      const totalAmountGenerated = totalStudentEnrolled*course.price
      //create a new object which is going to be represent data for this course

      const courseDataWithStats = {
        _id:course._id,
        courseName:course.courseName,
        courseDescription:course.courseDescription,
        totalAmountGenerated,
        totalStudentEnrolled
      }

      return courseDataWithStats
    })

    res.status(200).json({
      success:true,
      message:"Instructor Detail Fetched successfully",
      data:courseData
    })
  } catch(error){
    console.error(error.message)
    return res.status(500).json({
      success:false,
      message:"Failed to fetch the details  for Instructor Dashboard",
      error:error.message
    })
  }
}



