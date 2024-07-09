import mongoose from "mongoose";

const products= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    productDetails:{
        type:String,
    },
    price:{
        type: Number,
        required:true
    },
    mrp:{
        type: Number,
        required:true
    },
    minQuantity:{
        type: Number,
        default:"1"
    },
    category:{
        type: String,
        required:true
    },
    images:[{
        type:String
    }],
    brand:{
        type:String
    },
    expiry:{
        type:String
    },
    noOfstock:{
        type:Number
    },
    collegeName:{
        type:String,
        required:true,
    },
    feedbacks:[{
        type:mongoose.Types.ObjectId,
        ref:"feedbacks"
    }]

},{timestamps:true});

// const UserModel= mongoose.model("users",userSchema);

export default mongoose.model("products",products);