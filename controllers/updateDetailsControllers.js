import userModels from "../models/userModels.js";

export const updateProfilePic=async (req,res)=>{
    try {
    const userId=req.query.userId
    const profilePic=req.query.profilePic

    const updateProfile= await userModels.findByIdAndUpdate(userId,{profilePic},{new:true})
    res.status(200).send({
        message:"Succesfull"
    });
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message:"Failed"
        });
    }

}

export const updateDetails=async (req,res)=>{

}

