import mongoose from "mongoose";

const feedbacks= new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"Users",
    },
    feedback:{
        type:String
    },
    rating:{
        type: Number,
    },
    images:[{
        type:String
    }]
},{timestamps:true});

// const UserModel= mongoose.model("users",userSchema);

export default mongoose.model("feedbacks",feedbacks);