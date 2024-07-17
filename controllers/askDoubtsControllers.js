import askDoubtsModels from "../models/askDoubtsModels.js"
import commentsModel from "../models/commentsModel.js";

export const post_question=async (req,res)=>{
    try {
        const{user,question,category,isAnonymos,collegeName,images}=req.body
        var options=JSON.parse(JSON.stringify(req.body.options));

        const ipost=await new askDoubtsModels({user,question,category,isAnonymos,collegeName,images,options}).save()
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


export const get_question=async(req,res)=>{
    try {
        const collegeName=req.query.collegeName
        const filter=req.query.filter
        const category=req.query.category
    
        const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

        var post
        if(filter==""){
            post=await askDoubtsModels.find({collegeName,category}).populate("user").sort({createdAt:-1});
        }
        else if(filter=="Today"){
            let today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to midnight
            let endOfDay = new Date(today);
            endOfDay.setHours(23, 59, 59, 999); // Set time to end of day
            post=await askDoubtsModels.find({collegeName,category, createdAt: { $gte: today,$lt: endOfDay}}).populate("user").sort({createdAt:-1});
       
        }
        else if(filter=="Week"){
            let startOfWeek = new Date();
            startOfWeek.setHours(0, 0, 0, 0); // Set time to midnight
            startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Move to Sunday (start of week)
            
            let endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(endOfWeek.getDate() + 6); // Move to Saturday (end of week)
            endOfWeek.setHours(23, 59, 59, 999); // Set time to end of day
            post=await askDoubtsModels.find({collegeName,category, createdAt: { $gte: startOfWeek,$lt: endOfWeek}}).populate("user").sort({createdAt:-1});
            
        }
        else if(filter=="Month"){
            let startOfMonth = new Date();
            startOfMonth.setHours(0, 0, 0, 0); // Set time to midnight
            startOfMonth.setDate(1); // Set day of month to 1
            let endOfMonth = new Date(startOfMonth);
            endOfMonth.setMonth(endOfMonth.getMonth() + 1); // Move to next month
            endOfMonth.setDate(0); // Move to last day of current month
            endOfMonth.setHours(23, 59, 59, 999); // Set time to end of day
            post=await askDoubtsModels.find({collegeName,category, createdAt: { $gte: startOfMonth,$lt: endOfMonth}}).populate("user").sort({createdAt:-1});
        }

        const result = post.slice(startIndex, endIndex);
        if(!result){
            res.status(400).send({
                succes:true,
                message:"no data",
            })
        }

        res.send({
            succes:true,
            message:"fetch Successful",
            result
          
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

export const delete_post=async(req,res)=>{
    try {
        const postId=req.query.postId
        const post=await askDoubtsModels.findByIdAndDelete(postId)
        res.status(200).send({
            message:"Delete successfully"
        })
    } catch (error) {
        console.log(error)
    res.status(400).send({
        message:"failed"
     }) 
    }
}

export const vote=async(req,res)=>{

   try {
    const postId=req.query.postId
    const userId=req.query.userId
    const position=req.query.position
    const prevPosition=req.query.prevPosition
    
   
   if(prevPosition==position){
    await askDoubtsModels.findOneAndUpdate(
        { _id: postId, "options._id": prevPosition, "options.votes": userId },
        { 
            $pull: { "options.$.votes": userId }
        }
    );
   }
   else{
    if(prevPosition!="abc"){
        await askDoubtsModels.findOneAndUpdate(
            { _id: postId, "options._id": prevPosition, "options.votes": userId }, 
            { 
                $pull: { "options.$.votes": userId } 
            }
        );
        }
    
    await askDoubtsModels.findOneAndUpdate(
        { _id: postId, "options._id": position }, 
        { 
            $push: { "options.$.votes": userId }
        }
    );
   
   }

   res.status(200).send({
    message:"successfull"
   })
   } catch (error) {
    console.log(error)
    res.status(400).send({
        message:"failed"
     })
   }
}


export const add_comment=async (req,res)=>{
    try {
        const {postId, user, comment}=req.body

        const icmnt=await new commentsModel({postId,user,comment}).save()
        const cmnt=await icmnt.populate("user")
        res.status(200).send(
            cmnt
        )
        
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message:"failed"
        })
    }
}

export const get_comments=async(req,res)=>{
    try {
        
        const postId=req.query.postId
        const comment=await commentsModel.find({postId}).populate("user");

        res.status(200).send({
            message:"succesful",
            comment
        })
    } catch (error) {
      console.log(error)
      res.status(400).send({
        message:"failed",
      })
    }

}

export const like_post=async (req,res)=>{
    try {
        const postId=req.query.postId
        const userId=req.query.userId
        const likeOrDislike=req.query.likeOrDislike
        var ipost
        if(likeOrDislike=="like"){
            ipost=await askDoubtsModels.findByIdAndUpdate({_id:postId},{ $push: { "likes": userId }}, { new: true })
        }
        else{
            ipost=await askDoubtsModels.findByIdAndUpdate({_id:postId},{ $pull: { "likes": userId }}, { new: true })
        }
        const post = await ipost.populate("user")


         
        res.status(200).send(
            {post}
        )
        
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message:"failed"
        })
    }
}

