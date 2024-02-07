const User = require("../models/user");
const OTP = require("../models/otp");
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const Profile = require("../models/profile")
require("dotenv").config()
const OTPgenerator = require("otp-generator");
const user = require("../models/user");
const mailSender = require("../utils/mailSender");


//send OTP

exports.SendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
      return res.status(203).json({
        success: false,
        message: "User already Exist",
      });
    }

    var otp = OTPgenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });


    let result = await OTP.findOne({ otp:otp });

    while (result) {

      otp = OTPgenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      result = await OTP.findOne({ otp });
    }

    console.log("otp generated : ",otp)

    const otpPayload= {
        email,otp
    }
    const otpBody= await OTP.create(otpPayload)

    res.status(200).json({
        success:true,
        message:'Otp Sent Successfuly',
        otp
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
        success:false,
        message:"Try again After some time"
    })
  }
};

// midddleware of signup

exports.SignUp= async (req,res)=>{
    try{
        const {email,
            firstName,
            lastName,
            password,
            confirmPassword,
            otp,
            accountType,
            
        } = req.body;
    
        if(!email || !firstName || !lastName || !password || !confirmPassword || !otp || !accountType){
            return res.status(203).json({
                success:false,
                message:"All fields are Mandetory"
            })
        }
    
        if(password !== confirmPassword){
            return res.status(204).json({
                success:false,
                message:"Password  and confirmPassword not matched"
            })
        }
        
    
        const checkUserPresent=await User.findOne({email});
        console.log("check ",checkUserPresent)
        if(checkUserPresent){
            return res.status(205).json({
                success:false,
                message:"User already exist"
            })
        }
       
    
        const recentOTP = await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
        console.log("  aa gya dbotp",recentOTP.otp,"  : ",otp)
        
        if(recentOTP.length == 0){
            return res.status(206).json({
                success:false,
                message:"OTP not found"
            })
        } 
        else if(otp !== recentOTP.otp){
            return res.status(207).json({
                success:false,
                message:"OTP not matched"
            })
        }
        
        
    
        const hashPassword = await bcrypt.hash(password,10);
    
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        })
    
        const user = await User.create({
           firstName,
           lastName,
           password:hashPassword,
           email,
           accountType,
           additionalDetails:profileDetails._id,
           image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        return res.status(200).json({
            success:true,
            message:"User registered Successfully",
            user
        })
    } catch(error){
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"user cannot registered  please try again"
        })
    }



}

// login  controller

exports.LogIn= async(req,res)=>{
    try{
        const {
            email,
            password
        } = req.body;

        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are mandatory"
            })
        }
        // check register user
        const user = await User.findOne({email}).populate('additionalDetails').populate("courseProgress").exec();

        if(! user){
            return res.status(201).json({
                success:false,
                message:"User not registered ,SignUp first"
            })
        }
        //password checked

        if(await bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                accountType:user.accountType,
                id:user._id
            }
            console.log
            const token=  JWT.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"96h"
            })
            user.token=token
            user.password=undefined
            // user = user.populate('additionalDetails')

            // create cookie
            const options={
                expiresIn : new Date(Date.now()+ 4*24*60*60*1000),
                httpOnly : true
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in Successfully"
            })
         
        }
        else{
            return res.status(202).json({
                success:false,
                message : "Password Incorrect"
            })
        }

    }
    catch(error){
        console.log("error occur during login : ",error)
        return res.status(404).json({
            success:false,
            message:"Try Again"
        })
    }
}




//change password


exports.changePassword = async(req,res) => {
    try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}
        


		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);
        
		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
                "From Study-Notion",
                `your password has been updated successfully contact if you not change the password`
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
}