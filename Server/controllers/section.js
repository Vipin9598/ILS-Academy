const Section = require("../models/section")
const Course = require("../models/course")

exports.createSection = async(req,res) => {
    try{
        const {sectionName,courseId} = req.body
        if( !sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"All fields are Mandatory"
            })
        }
      
        const newSection = await Section.create({
            sectionName:sectionName
        })

        const updatedCourseDetail = await Course.findByIdAndUpdate(courseId,
            {
                $push:
                {
                    courseContent:newSection._id
                }
            },{new:true}).populate({
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }).exec()
            // how to populate itself and its children

        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            data:updatedCourseDetail
            })
        
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to create new section try again or after some time "
        })
    }
}

// update section ispe vichar krna h     

exports.updateSection = async(req,res) =>{
    try{
        const {sectionName,sectionId,courseId} = req.body

        if( !sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"All fields are Mandatory"
            })
        }

        const updatedSection = await Section.findByIdAndUpdate(sectionId,
            {sectionName:sectionName},{new:true})
        
        const updatedCourseDetail = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();
        

        return res.json({
            success:true,
            message:"section  updated successfully",
            data:updatedCourseDetail  
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to update section try again or after some time "
        })
    }
}

//DELETE SECTION 

exports.deleteSection = async(req,res)=>{
    try{

        const {sectionId,courseId}= req.body.data

        await Section.findByIdAndDelete(sectionId)
        // mere ko yha p doubt h  ki kya course m jake bhi object id delete krni  pdegi 
        
        const updatedCourseDetail = await Course.findByIdAndUpdate(courseId,
            {
                $pull:
                {
                    courseContent:sectionId
                }
            },{new:true}).populate({
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }).exec()


        return res.json({   
            success:true,
            data:updatedCourseDetail,
            message:"Section deleted successfully and updated to course"
        })

    } catch(error){
        console.log(error)
        return res.json({
            success:false,
            message:"Failed  to delete the section",
            error
        })
    }
}

