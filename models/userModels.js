import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    userName:{
        type: String,
        required:true
    },
    phone:{
        type:Number,
        required: true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
    },
   
    collegeName:{
        type:String,
        require:true,
    },
    hostelName:{
        type:String,
    },
    degree:{
        type:String,
    },
    department:{
        type:String,
    },
    passoutYear:{
        type:String,
    },
    profilePic:{
        type:String,
        default:"https://www.pngkit.com/png/full/126-1262807_instagram-default-profile-picture-png.png"
    },
    fcmToken:{
        type:String
    }
},{timestamps:true});

// const UserModel= mongoose.model("users",userSchema);

export default mongoose.model("Users",userSchema);