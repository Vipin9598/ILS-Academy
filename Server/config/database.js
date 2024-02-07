// const mongoose =require("mongoose")
// require("dotenv").config()

// exports.dbconnect = () => {
//     mongoose.connect(process.env.MONGODB_URL,{
//         useNewUrlParser:true,
//         useUnifiedTopology:true
//     })
//     .then(()=>{
//         console.log("database connected successfully ")
//     })
//     .catch((error)=>{
//         console.log("DB connection failed")
//         console.error(error)
//         process.exit(1)
//     })
// }

const mongoose = require("mongoose")
require("dotenv").config();

exports.dbconnect = async() => {
    try{
       await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }).then(()=>{
           console.log("db connected and i  am in then operation")
        })

    } catch(error){
        console.log("Db connection failed")
        console.log(error)
        process.exit(1)
    }
}