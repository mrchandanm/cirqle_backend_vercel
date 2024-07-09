import mongoose from "mongoose";

const orderCart= new mongoose.Schema({
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
        default:1
    }

},{timestamps:true});
export default mongoose.model("orderCart",orderCart);