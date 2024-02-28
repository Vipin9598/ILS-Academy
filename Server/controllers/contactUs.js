// const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")

exports.contactUsController = async (req, res) => {
  console.log(req.body)
  const { email, firstName, lastName, message, phoneNumber, countryCode } = req.body
  console.log(req.body)
  try {
    const emailRes = await mailSender(
      process.env.MAIL_USER,
      "SomeOne wants to connect through MEDITECH",
      `My Name Is ${firstName} ${lastName} /n
      contactDetails : email:${email} or Phone Number : ${countryCode} ${phoneNumber} \n
      message: ${message}
      `
    )
    console.log("Email Res ", emailRes)
    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.status(402).json({
      success: false,
      message: "Something went wrong...",
    })
  }
}


