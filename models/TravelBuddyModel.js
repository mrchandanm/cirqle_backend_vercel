import mongoose from "mongoose";

const TravelBuddy= new mongoose.Schema({
    to:{
        type:String
    },
    from:{
        type:String
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"Users",
        required:true
    },
    description:{
        type: String,
    },
    collegeName:{
        type:String,
        required:true,
    },
    DepartureDate:{
        type:String
    },
    returnDate:{
        type:String,
        default:"Not Sure"
    },
    costSharing:{
        type:Number,
        default:0
    },
    seatsAvailable:{
        type:Number,
        default:0
    }
},{timestamps:true});

// const UserModel= mongoose.model("users",userSchema);

export default mongoose.model("TravelBuddy",TravelBuddy);