// Importing required modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user");
// Configuring dotenv to load environment variables from .env file
dotenv.config();

// This function is used as middleware to authenticate user requests
exports.auth = async (req, res, next) => {
	try {
		// Extracting JWT from request cookies, body or header
		const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");

		// If JWT is missing, return 401 Unauthorized response
		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}

		try {
			// Verifying the JWT using the secret key stored in environment variables
			const decode = await jwt.verify(token, process.env.JWT_SECRET);
			console.log(decode);
			// Storing the decoded JWT payload in the request object for further use
			req.user = decode;
		} catch (error) {
			// If JWT verification fails, return 401 Unauthorized response
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}

		// If JWT is valid, move on to the next middleware or request handler
		next();
	} catch (error) {
		// If there is an error during the authentication process, return 401 Unauthorized response
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
	}
};
exports.isStudent = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Student") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Students",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};
exports.isAdmin = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};
exports.isInstructor = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });
		console.log(userDetails);

		console.log(userDetails.accountType);

		if (userDetails.accountType !== "Instructor") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Instructor",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};

// const JWT = require("jsonwebtoken")
// require("dotenv").config();
// const User= require("../models/user")


// exports.auth = async(req,res,next) => {
//     try{
//         const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","") 

//         if(!token){
//             return res.status(401).json({
//                 success:false,
//                 message:"Token Is Missing"
//             })
//         }

//         // verify the token

//         try{
//             const decode =  JWT.verify(token,process.env.JWT_SECRET)
//             console.log("decode",decode)
//             req.user=decode
//         }
//         catch(error){
//             return res.status(402).json({
//                 success:false,
//                 message:"Token Is invalid"
//             })

//         }
        
//         next();
//     }
//     catch(error){
//         return res.status(401).json({
//             success:false,
//             message:'something went wrong during authentication of token'
//         })
//     }
// }

// // Is isStudent
// exports.isStudent = async(req,res,next) =>{
//     try{
//         if(req.user.accountType !== "Student"){
//             return  res.status(401).json({
//                 success:false,
//                 message:"This is protected route for student "
//             })
//         }
//         next();
//     }
//     catch(error){

//         return res.status(500).json({
//             success:false,
//             message:"User role cannot be verified "
//         })
//     }
// }


// // Is instructor 

// exports.isInstructor = async(req,res,next) =>{
//     try{
//         if(req.user.accountType !== "Instructor"){
//             return  res.status(401).json({
//                 success:false,
//                 message:"This is protected route for Instructor "
//             })
//         }
//         next();
//     }
//     catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"User role cannot be verified "
//         })
//     }
// }

// // is Admin

// exports.isAdmin = async(req,res,next) =>{
//     try{
//         if(req.user.accountType !== "Admin"){
//             return  res.status(401).json({
//                 success:false,
//                 message:"This is protected route for Admin "
//             })
//         }
//         next();
//     }
//     catch(error){
//         console.log("error ",error)
//         return res.status(500).json({
//             success:false,
//             message:"User role cannot be verified "
//         })
//     }
// }

