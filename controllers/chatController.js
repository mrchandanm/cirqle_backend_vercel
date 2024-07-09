import chatModel from "../models/chatModel.js";
import userModels from "../models/userModels.js";


export const accessChat=async (req,res)=>{
    const {userId,postUserId}=req.body;  //sending from body or we can also send as params
    if(!userId || !postUserId){
     console.log("userId params not send with request");
     return res.status(400);
    }
 
 
    var isChat = await chatModel.find({
     $and:[
         {users:{$elemMatch:{$eq:postUserId}}},
         {users:{$elemMatch:{$eq:userId}}}
     ]
    }).populate("users","-password").populate("latestMessage");
 
    isChat = await userModels.populate(isChat,{
     path:'latestMessage.sender',
     select:"name profilePic phone"
    });
 
    if(isChat.length>0){
     res.status(200).send(isChat[0]);
    }
    else{
     //we gonna create new chat is chat does.nt exist
     var chatData={
         users:[postUserId,userId]
     };
 
     try {
         const createdChat= await chatModel.create(chatData);
         const fullChat=await chatModel.find({_id:createdChat._id}).populate("users","-password");
 
         res.status(200).send(fullChat);
     } catch (error) {
         console.log(error);
         res.status(401).send({
             succes:false,
             messsage:error.message,
         })
     }
    }
 
 }

 export const fetchChat=async (req,res)=>{
    try {
      const userId=req.query.userId
      if(!userId){
        res.status(400).send({
            succes:false,
            messsage:"empty id"
        })
      }
        //different way of sending data by then
        chatModel.find({users:{$elemMatch: {$eq: userId}}}).populate("users","-password").populate("latestMessage").sort({updatedAt:-1}).then(async (result)=>{
            result=await userModels.populate(result,{
                path:'latestMessage.sender',
                select:"name profilePic phone"
               });

               res.status(200).send(
               {
                success:true,
                messsage:"fetch succesfully",
                result
               }
               );
        })  

        //to populate inside a field
    

          

    } catch (error) {
        console.log(error);
        res.status(400).send({
            succes:false,
            messsage:"failed to fetch chats"
        })
    }
}