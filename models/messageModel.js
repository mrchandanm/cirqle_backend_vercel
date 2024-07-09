import mongoose from "mongoose";

const messageModel=new mongoose.Schema({
    sender:{
        type:mongoose.Types.ObjectId,
        ref:"Users",
    },
    content:{
        type:String,
        trim:true,
    },
    chat:{
        type:mongoose.Types.ObjectId,
        ref:"Chat",
    }
},{timestamps:true});

export default mongoose.model("Message",messageModel);
