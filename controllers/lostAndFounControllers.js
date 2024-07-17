import lostAndFoundModel from "../models/lostAndFoundModel.js"

export const post_items=async (req,res)=>{
    try {
        const{category,user,title,description,collegeName,location,date,images}=req.body

        const ipost=await new lostAndFoundModel({category,user,title,description,collegeName,location,date,images}).save()
        const post=await ipost.populate("user")
        
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


export const get_items=async(req,res)=>{
    try {
        const collegeName=req.query.collegeName
        const category=req.query.category

        const page = parseInt(req.query.page) || 1;
        const limit = 4;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
    
        var post=await lostAndFoundModel.find({collegeName,category}).populate("user").sort({createdAt:-1});    

        if(!post){
            res.status(400).send({
                succes:true,
                message:"no data",
            })
        }
        post = post.slice(startIndex, endIndex);
        res.send( post)




        
    } catch (error) {
        console.log(error)
        res.status(400).send({
            succes:false,
            message:"FAILED TO UPLOAD",
            error,
        })
    }
}


