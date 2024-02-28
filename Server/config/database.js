

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