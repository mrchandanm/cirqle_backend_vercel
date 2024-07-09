import mongoose from "mongoose";

const lostAndFoundModel= new mongoose.Schema({
    category:{
        type:String
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"Users",
    },
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    collegeName:{
        type:String,
        required:true,
    },
    location:{
        type:String,
    },
    date:{
        type:String
    },
    images:[{
        type:String
    }],
},{timestamps:true});

// const UserModel= mongoose.model("users",userSchema);

export default mongoose.model("lostAndFoundPost",lostAndFoundModel);