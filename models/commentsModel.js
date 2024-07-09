import mongoose from "mongoose";

const comment= new mongoose.Schema({
    postId:{
        type:mongoose.Types.ObjectId,
        ref:"askYourDoubts",
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"Users",
    },
    comment:{
        type: String,
        required:true
    }

},{timestamps:true});

// const UserModel= mongoose.model("users",userSchema);

export default mongoose.model("comments",comment);