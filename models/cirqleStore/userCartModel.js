import mongoose from "mongoose";

const userCart= new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"Users",
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:"products"
    },
    quantity:{
        type:Number,
        default:0
    },
    status:{
        type:String,
        default:"pending"
    },
    isdeleted:{
        type:Number,
        default:0
    }

},{timestamps:true});

// const UserModel= mongoose.model("users",userSchema);

export default mongoose.model("userCart",userCart);