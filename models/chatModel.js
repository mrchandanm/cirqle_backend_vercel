import mongoose from "mongoose";

const chatModel=new mongoose.Schema({
    users:[{
        type:mongoose.Types.ObjectId,
        ref:"Users",
    }],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
    }


}, {timestamps:true});

export default mongoose.model("Chat", chatModel);