const mongoose=require('mongoose');
const dotenv=require("dotenv");

dotenv.config({path:'./config.env'})
const mongoURI=process.env.MONGOURL;

const connectToMongo=()=>{
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI,()=>{
        console.log("Database Connected Successfully");
    })
}

module.exports=connectToMongo;
