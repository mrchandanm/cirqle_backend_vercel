import funFeedsModel from "../models/funFeedsModel.js";

export const post_feed=async (req,res)=>{
    try {
        const{user,captain,collegeName,images,isAnonymos}=req.body
        var options=JSON.parse(JSON.stringify(req.body.options));

        const ipost=await new funFeedsModel({user,captain,collegeName,images,options,isAnonymos}).save()
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


export const get_feed=async(req,res)=>{
    try {
        const collegeName=req.query.collegeName
        const filter=req.query.filter
        var post
        if(filter==""){
            post=await funFeedsModel.find({collegeName}).populate("user").sort({createdAt:-1});
        }
        else if(filter=="Today"){
            let today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to midnight
            let endOfDay = new Date(today);
            endOfDay.setHours(23, 59, 59, 999); // Set time to end of day
            post=await funFeedsModel.find({collegeName, createdAt: { $gte: today,$lt: endOfDay}}).populate("user").sort({createdAt:-1});
       
        }
        else if(filter=="Week"){
            let startOfWeek = new Date();
            startOfWeek.setHours(0, 0, 0, 0); // Set time to midnight
            startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Move to Sunday (start of week)
            
            let endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(endOfWeek.getDate() + 6); // Move to Saturday (end of week)
            endOfWeek.setHours(23, 59, 59, 999); // Set time to end of day
            post=await funFeedsModel.find({collegeName, createdAt: { $gte: startOfWeek,$lt: endOfWeek}}).populate("user").sort({createdAt:-1});
            
        }
        else if(filter=="Month"){
            let startOfMonth = new Date();
            startOfMonth.setHours(0, 0, 0, 0); // Set time to midnight
            startOfMonth.setDate(1); // Set day of month to 1
            let endOfMonth = new Date(startOfMonth);
            endOfMonth.setMonth(endOfMonth.getMonth() + 1); // Move to next month
            endOfMonth.setDate(0); // Move to last day of current month
            endOfMonth.setHours(23, 59, 59, 999); // Set time to end of day
            post=await funFeedsModel.find({collegeName, createdAt: { $gte: startOfMonth,$lt: endOfMonth}}).populate("user").sort({createdAt:-1});
        }

          
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

export const vote=async(req,res)=>{

   try {
    const postId=req.query.postId
    const userId=req.query.userId
    const position=req.query.position
    const prevPosition=req.query.prevPosition
    
   
   if(prevPosition==position){
    await funFeedsModel.findOneAndUpdate(
        { _id: postId, "options._id": prevPosition, "options.votes": userId },
        { 
            $pull: { "options.$.votes": userId }
        }
    );
   }
   else{
    if(prevPosition!="abc"){
        await funFeedsModel.findOneAndUpdate(
            { _id: postId, "options._id": prevPosition, "options.votes": userId }, 
            { 
                $pull: { "options.$.votes": userId } 
            }
        );
        }
    
    await funFeedsModel.findOneAndUpdate(
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



