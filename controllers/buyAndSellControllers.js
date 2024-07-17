import buyAndSellPostModel from "../models/buyAndSellPostModel.js"
import userModels from "../models/userModels.js"

export const post_ads=async (req,res)=>{
    try {
        const{price,title,description,category,negotiable,owner,collegeName,images}=req.body

        const ipost=await new buyAndSellPostModel({price,title,description,category,negotiable,owner,collegeName,images}).save()
        const post=await ipost.populate("owner")
        
        res.status(200).send({
            succes:true,
            message:"Upload Successful",
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


export const get_ads=async(req,res)=>{
    try {
        const collegeName=req.query.collegeName
        // const category=req.query.category
        // if(category)

        const page = parseInt(req.query.page) || 1;
        const limit = 4;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        var post=await buyAndSellPostModel.find({collegeName}).populate("owner").sort({createdAt:-1});

    //     if(collegeName!=""){
    //     post = await buyAndSellPostModel.find().populate({
    //         path: 'owner',
    //         match: { collegeName: collegeName }
    //     });
    // }
    // else{
        // post=await buyAndSellPostModel.find()
    // }

       
     post = post.slice(startIndex, endIndex);
        if(!post){
            res.status(400).send({
                succes:true,
                message:"no data",
            })
        }
        res.send({
            succes:true,
            message:"fetch Successful",
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