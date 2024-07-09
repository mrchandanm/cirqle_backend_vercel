import mongoose from "mongoose";

const dateSparkUser=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"Users",
    },
    relationshipType:{
        type:String,
    },
    gender:{
        type:String,
        required:true,
    },
    collegeName:{
        type:String,
        required:true,
    },
    images:[{
        type:String
    }],
},{timestamps:true});

export default mongoose.model("DateSparkUsers",dateSparkUser);
