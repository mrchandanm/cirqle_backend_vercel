import mongoose from "mongoose";

const complaints= new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"Users",
    },
    complaint:{
        type:String,
    }

},{timestamps:true});

// const UserModel= mongoose.model("users",userSchema);

export default mongoose.model("complaints",complaints);