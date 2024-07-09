import mongoose from "mongoose";

const orders= new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"Users",
    },
    hostel:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    },
    totalAmount:{
        type: Number,
    },
    totalMrp:{
        type: Number,
    },
    collegeName:{
        type:String,
        required:true,
    },
    carts:[{
        type:mongoose.Types.ObjectId,
        ref:"orderCart"
    }]

},{timestamps:true});

// const UserModel= mongoose.model("users",userSchema);

export default mongoose.model("orders",orders);