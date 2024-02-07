const SubSection = require("../models/subsection")
const Section = require("../models/section")
const {uploadtoCloudinary} = require("../utils/cloudinaryUploader")
const { default: mongoose } = require("mongoose")

exports.createSubSection = async(req,res) => {
    try{
        // console.log("video file ", req.files.videoFile )
        const {sectionId,title,description} =  req.body
        const videoFile = req.files.videoFile

        if(!sectionId || !title || !description ||!videoFile ){
            
            return res.status(400).json({
                success:false,
                message:"all fields are mandetory"
            })
        }

        const uploadDetails = await uploadtoCloudinary(videoFile,process.env.FOLDER_NAME)

        const  newSubsection = await SubSection.create({
            title,
            description,
            timeDuration:`${uploadDetails.duration}`,
            videoURl:uploadDetails.secure_url
        })

        const updatedSection = await Section.findByIdAndUpdate(sectionId,{$push:{subSection:newSubsection._id}},{new:true}).populate("subSection").exec()
        // log updated section here after populate 

        return res.status(200).json({
            success:true,
            message:"Subsection created successfully",
            data:updatedSection
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Failed during create a new sub Section"
        })
    }
}
// update Sub section 

exports.updateSubSection = async(req,res) => {
    try{
        const {subSectionId,title,description,sectionId} =  req.body
        const videoFile = req.files.videoFile
        console.log("body",req.body)
        console.log("videoFile",videoFile)


        const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.videoFile !== undefined) {
        const videoFile = req.files.videoFile
        const uploadDetails = await uploadtoCloudinary(
          videoFile,
          process.env.FOLDER_NAME
        )
        subSection.videoURl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      const updatedSection = await Section.findById(sectionId).populate("subSection")

        return res.json({
            success:true,
            message:"section  updated successfully",
            data:updatedSection  
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

// delete subsection
exports.deleteSubSection = async(req,res) =>{
    try{
        const{subSectionId,sectionId} = req.body

        await SubSection.findByIdAndDelete(subSectionId)
        // mere ko yha p doubt h  ki kya section m jake bhi object id delete krni  pdegi 
        const updatedSection = await Section.findByIdAndUpdate(sectionId,
            {
                $pull:{
                    subSection:subSectionId
                }
            },{new:true} ).populate("subSection").exec()
            
        return res.json({
            success:true,
            data:updatedSection,
            message:"SubSection deleted successfully "
        })

    }  catch(error){
        return res.json({
            success:false,
            message:"Failed  to delete the subSection"
        })
    }
}


 