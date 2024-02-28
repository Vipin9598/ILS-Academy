const { error } = require("console")
const User = require("../models/user")
const mailSender = require("../utils/mailSender")
const bcrypt = require("bcrypt")
const crypto = require("crypto")

exports.resetPasswordToken = async(req,res) => {
    try{
        // get email from req body
        const {email} = req.body;

        // check email  validation
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                success : false,
                message : "Email not registered"
            })
        } 

        const token =crypto.randomUUID();
        // const token = crypto.randomBytes(20).toString("hex")

        const updatedDetail = await User.findOneAndUpdate({email:email},{
            resetPasswordToken:token,
            resetTokenExpire:Date.now()+3*60*1000
        },{new:true})
        
        const url = `http://localhost:3000/update-password/${token}`
        await mailSender(email,
            "Password Reset Link From MEDITECH",
            `Link to reset the  Password : ${url}`)
        
        return res.status(200).json({
            success :true,
            message :"Email sent succesfully  "
        })

    } catch(error) {
        return res.status(401).json({
            success:false,
            message:error.message
        })
    }
}

// reset password

exports.resetPassword = async(req,res) => {
    try{
        const {password,confirmPassword,token}= req.body;
        if(password!== confirmPassword){
            return res.json({
                success:false,
                message:"Password and Confirn Pssword is not Matched"
            })
        }
        console.log(token)
        const userDetail = await User.findOne({resetPasswordToken:token})
        if(!userDetail){
           
            return res.json({
                success:false,
                message : "Invalid Token",
                error
            })
        }


        console.log(" token check")
        console.log("user detail : ",userDetail)
        if(userDetail.resetTokenExpire < Date.now()){
            return res.json({
                success:false,
                message:"Token expire, please generate new token"
            })
        }
        const hashedPassword= await bcrypt.hash(password,10);
        console.log("update",hashedPassword)

        await User.findOneAndUpdate({resetPasswordToken:token},
            {password:hashedPassword},{new:true})
         
            
        return res.status(200).json({
            success:true,
            message:"Password Reset Successfully"
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:"na bdal paya",
            error
          })
    }
}