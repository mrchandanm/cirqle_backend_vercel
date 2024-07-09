import mongoose from "mongoose";

const askYourDoubt= new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"Users",
    },
    question:{
        type:String
    },
    category:{
        type:String
    },
    isAnonymos:{
        type:String
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
    }],
    likes:[
       { type:mongoose.Types.ObjectId,
        ref:"likes"
       }
    ]

},{timestamps:true});

// const UserModel= mongoose.model("users",userSchema);

export default mongoose.model("askYourDoubts",askYourDoubt);