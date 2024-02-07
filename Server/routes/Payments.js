// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifySignature,sendPaymentSuccesfulMail } = require("../controllers/Payments")
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")
router.post("/capturePayment", auth, isStudent,capturePayment)
router.post("/verifySignature",auth ,isStudent,verifySignature)
router.post("/sendPaymentSuccessfulemail",auth ,isStudent,sendPaymentSuccesfulMail)

module.exports = router