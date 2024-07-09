import mongoose from "mongoose";

const buyAndSellPostSchema= new mongoose.Schema({
    price:{
        type: Number,
        required:true
    },
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    category:{
        type:String,
        required: true,
    },
    negotiable:{
        type:String,
        required:true,
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"Users",
    },
    collegeName:{
        type:String,
        required:true,
    },
    images:[{
        type:String
    }],
},{timestamps:true});

// const UserModel= mongoose.model("users",userSchema);

export default mongoose.model("buyAndSellPost",buyAndSellPostSchema);