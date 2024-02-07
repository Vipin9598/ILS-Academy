const express = require("express")
const app = express();

const userRoute = require("./routes/User")
const paymentRoute = require("./routes/Payments")
const profileRoute = require("./routes/Profile")
const courseRoute = require("./routes/Course")
const contactUsRoute = require("./routes/ContactUs")

const database = require("./config/database")
const {cloudinaryConnect} = require("./config/cloudinary")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv")

const PORT = process.env.PORT || 4000
dotenv.config();
//db  connect

database.dbconnect();
cloudinaryConnect();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"*",
    // methods: "GET,POST,PUT,DELETE", 
    credentials:true
}))

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

app.use("/api/v1/auth",userRoute)
app.use("/api/v1/profile",profileRoute)
app.use("/api/v1/payment",paymentRoute)
app.use("/api/v1/course",courseRoute)
app.use("/api/v1/reach", contactUsRoute);

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"your server is up and running....."
    })
})


app.listen(PORT,()=>{
    console.log(`app is running at port : ${PORT}`)
})




