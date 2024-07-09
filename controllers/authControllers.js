import generateToken from "../config/generateToken.js";
import { comparePassword, hashpasssword } from "../helpers/authHelpers.js";
import userModels from "../models/userModels.js";

export const registerController=async (req,res)=>{
    try {
        const {name, userName, phone, email,password,gender,collegeName,hostelName,degree,department,passoutYear,profilePic,fcmToken}=req.body;

        const isUniqueEmail=await userModels.find({email})
        if(isUniqueEmail.length>0){
            return res.status(401).send({
                success:false,
                message:"email already registerd",
            isUniqueEmail});      
        }

         //register user
    const hashedpasssword= await hashpasssword(password);
    const user =await new userModels({name, userName, phone, email,password:hashedpasssword,gender,collegeName,hostelName,degree,department,passoutYear,profilePic,fcmToken}).save();
    const token= await generateToken(user._id);
    res.status(200).send({
        success:true,
        message:"user registered succesfully",
        user,
        token
    })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"FAILED TO REGISTER",
            error,
    
        })
    }
}

export const updateFCMToken=async (req,res)=>{
    try {
        const userId=req.query.userId
    const fcmToken=req.query.fcmToken

    const updateFcm= await userModels.findByIdAndUpdate(userId,{fcmToken},{new:true})
    res.status(200).send("succesfull");
    } catch (error) {
        res.status(400).send({failed});
    }

}




export const loginController=async (req,res)=>{
    try {
        const {phone,password}=req.body

        const isuser=await userModels.find({phone})
        if(isuser.length==0){
            console.log(isuser)
            return res.status(401).send({
                success:false,
                message:"phone Number is not registered"
            })
        }
        const match=await comparePassword(password,isuser[0].password);
        console.log(match)
        if(match==false){
            return res.status(400).send({
                success:false,
                message:"Invalid password"
            })
        }

          //token
     const token=await generateToken(isuser._id);
     const user=isuser[0]
     res.status(200).send({
        success:true,
        message:"login successfull",
        user,
        token,

     })

    } catch (error) {
        console.log(error);
    res.status(400).send({
        success:false,
        message:"FAILED TO LOGIN",
        error
    })
    }
}



