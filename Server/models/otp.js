const mongoose= require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPschema = new mongoose.Schema({
      email:{
        type:String,
        required:true,
      },
      otp:{
        type:String,
        required:true
      },
      createdAt:{
        type:Date,
        default:Date.now(),
        expires : 5*60*1000
      }
})

async function sendVerificationEmail(email,otp){
    try{
        const mailResponse =  mailSender(email,"verification email  from StudyNotion",otp)
        console.log("mail send successfully : ",mailResponse);
    }
    catch(error){
        console.log(" error occur during sending mail ", error);
        throw(error)
    }
}

 OTPschema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
 }
)


module.exports = mongoose.model("OTP",OTPschema)