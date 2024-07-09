import mongoose from "mongoose";

const likes= new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"Users",
    }

},{timestamps:true});

// const UserModel= mongoose.model("users",userSchema);

export default mongoose.model("likes",likes);