import {  admincongif } from "../config/fcm.js";
import chatModel from "../models/chatModel.js";
import messageModel from "../models/messageModel.js";
import userModels from "../models/userModels.js";
import { io } from "../server.js";




export const sendMessageController=async(req,res)=>{
    const {content, chatId,userId}=req.body;

    if(!chatId || !content){
        console.log("Invalid data passed into the request");
        res.status(400);
        return ;
    }

    var newMessage={
        sender:userId,
        content:content,
        chat:chatId
    }

    try {
        var message=await messageModel.create(newMessage);

        message=await message.populate("sender");
        message=await message.populate("chat");

         message=await userModels.populate(message,{
             path:"chat.users"
         })

        await chatModel.findByIdAndUpdate(chatId,{
            latestMessage:message
        })
        var fcmToken
        if(userId==message.chat.users[0]._id){
            fcmToken=message.chat.users[1].fcmToken
        }
        else{
            fcmToken=message.chat.users[0].fcmToken
        }
        
        const notificationMessage = {
            notification: {
                title: message.sender.name,
                body: message.content
            },
            token: fcmToken
        };

         const size = io.sockets.adapter.rooms.get(chatId)?.size || 0
         if(size<2){
        admincongif.messaging().send(notificationMessage)
         .then((response) => {
             res.status(200).send(message);
             console.log('Successfully sent message:', response);
         })
         .catch((error) => {
           
             console.error('Error sending message:', error);
         });
     }
     else{
        res.status(200).send(message);
     }

      
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}

export const allMessages=async (req, res)=>{
    const {chatId}=req.params.chatId;

    try {
        var messages= await messageModel.find({chat:req.params.chatId}).populate("sender").populate("chat");
        messages=await userModels.populate(messages,{
            path:"chat.users"
        })

        res.status(200).send(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }

}