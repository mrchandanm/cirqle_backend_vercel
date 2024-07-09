import mongoose from "mongoose";

const funFeeds= new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"Users",
    },
    isAnonymos:{
        type:String
    },
    captain:{
        type: String,
    },
    collegeName:{
        type:String,
        required:true,
    },
    images:[{
        type:String
    }],
    options:[{
            text:String,
            votes:[
                {
                    type:mongoose.Types.ObjectId,
                    ref:"Users"
                }
            ]
        }],
    comments:[{
        type:mongoose.Types.ObjectId,
        ref:"comments"
    }]

},{timestamps:true});

// const UserModel= mongoose.model("users",userSchema);

export default mongoose.model("funFeeds",funFeeds);