import dateSparkUserModel from "../models/dateSparkUserModel.js"


export const register_user=async (req,res)=>{
    try {
        const{user,relationshipType,collegeName, gender,images}=req.body

        const ipost=await new dateSparkUserModel({user,relationshipType,collegeName, gender,images}).save()
        const post=await ipost.populate("user")
        
        res.status(200).send({
            succes:true,
            message:"Register Successful",
            post
        })
        
    } catch (error) {
        console.log(error.message)
        res.status(400).send({
            succes:false,
            message:"FAILED TO UPLOAD",
            error,
        })
    }
}


export const get_user=async(req,res)=>{
    try {
        const collegeName=req.query.collegeName
        const ugender=req.query.gender
        var gender
        if(ugender=="Male"){
            gender="Female"
        }
        else{
            gender="Male"
        }
        
        var post=await dateSparkUserModel.find({collegeName,gender}).populate("user").sort({createdAt:-1});

       
        if(!post){
            res.status(400).send({
                succes:true,
                message:"no data",
            })
        }
        res.send({
            succes:true,
            message:"fetch succesfully",
            post
        })




        
    } catch (error) {
        console.log(error)
        res.status(400).send({
            succes:false,
            message:"FAILED TO UPLOAD",
            error,
        })
    }
}

export const check_user=async (req,res)=>{
    try {
        const user=req.query.user
        
        const post=await dateSparkUserModel.find({user})
    
        var isuser
        if(post.length==0){
            isuser=false
        }
        else{
            isuser=true
        }
        
            res.status(200).send({
                succes:true,
                message:"check Successful",
                isuser
            })
       
        
    } catch (error) {
        console.log(error.message)
        res.status(400).send({
            succes:false,
            message:"FAILED TO UPLOAD",
            error,
        })
    }
}