// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
  LogIn,
  SignUp,
  SendOTP,
  changePassword,
} = require("../controllers/auth")
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/resetpassword")

const { auth } = require("../middlewares/auth")

const {getUserAllCourses} = require("../controllers/course") 
const { contactUsController } = require("../controllers/contactUs")

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", LogIn)
router.get("/",(req,res)=>
{
  res.send("Hello jee");
})
// Route for user signup
router.post("/signup", SignUp)

// Route for sending OTP to the user's email
router.post("/sendotp", SendOTP)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)

//fetch  all courses 

// router.get("/getUserAllCourses",auth,getUserAllCourses)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

//contactUs
router.post("/reach/contact",contactUsController)

// Export the router for use in the main application
module.exports = router