const User = require("../models/user")
const Course = require("../models/course")
const RatingAndReview = require("../models/raatingANDreviews")
const { default: mongoose } = require("mongoose")

exports.createRating = async(req,res) => {
    try{
        const userId = req.user.id
        const {rating,review,courseId} = req.body

        // const courseDetail = await Course.findOne({_id:courseId,
        //                                             studentEnrolled:{$elemMatch:{$eq:userId}}
        //                                         })
        const courseDetail = await Course.findById(courseId)
        console.log("courseDetail....................",courseDetail)
        const index = await courseDetail.studentEnrolled.findIndex((id)=>id == userId)
        if(!index){
            return res.status(203).json({
                success:false,
                message:"User not enrolled in the course"
            })
        }

        //check if user already reviewed this course
        const alreadyReviewed = await RatingAndReview.findOne({
                                                    user:userId,
                                                    course:courseId
        })

        if(alreadyReviewed){
            return res.status(203).json({
                success:false,
                message:"Already Reviewed"
            })
        }

        const ratingReview = await RatingAndReview.create({
            rating,review,user:userId,course:courseId 
        })

        const updatedCourseDetail =  await Course.findByIdAndUpdate(courseId,
                                        {
                                            $push:{
                                                ratingANDreviews:ratingReview._id
                                            }
                                        },{new:true})

        console.log(updatedCourseDetail)
        
        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully",
            ratingReview
        })

    } catch (error) {
        console.log("Error occur during create rating : ",error)
        return res.status(400).json({
            success:false,
            message : error.message
        })
    }
}


// get average rating 


exports.getAverageRating = async(req,res) => {
    try{
            const courseId = req.body.courseId

            const result = await RatingAndReview.aggregate([
                {
                    $match:{
                        course:new mongoose.Types.ObjectId(courseId)
                    }
                },
                {
                    $group:{
                        _id:null,
                        averageRating : { $avg:"$rating"}
                    }
                }
            ])


        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            })
        }

        return res.status(200).json({
            success:true,
            message:"Average rating is zero, there is no rating till now",
            averageRating:0
        })
    } catch (error) {
        console.log("Error ocured during fetch the average rating : ",error)
         return res.status(400).json({
            success:false,
            message:error.message
         })
    }
}



// get all rating and review of  specific course 



// get all rating and review of  all courses 

exports.getAllRating = async(req,res) => {
    try{

        const AllRating = await RatingAndReview.find({})
                                .sort({ rating : "desc" })
                                .populate({path:"user",
                                    select:"firstName lastName email image"})
                                .populate({path:"course",
                                    select : "courseName"}).exec();

        return res.status(200).json({
            success:true,
            message:"all rating fetched",
            AllRating
        })

    } catch (error) {
        console.log("Error ocured during fetch the average rating : ",error)
         return res.status(500).json({
            success:false,
            message:error.message
         })
    }
}