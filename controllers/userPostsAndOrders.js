import askDoubtsModels from "../models/askDoubtsModels.js";
import buyAndSellPostModel from "../models/buyAndSellPostModel.js";
import orderModel from "../models/cirqleStore/orderModel.js";
import lostAndFoundModel from "../models/lostAndFoundModel.js";

export const get_user_feed=async(req,res)=>{
    try {
        const user=req.query.user
        const category=req.query.category

        const post=await askDoubtsModels.find({user,category}).populate("user").sort({createdAt:-1});
        
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

export const get_user_ads=async(req,res)=>{
    try {
        const owner=req.query.owner
        var post=await buyAndSellPostModel.find({owner}).populate("owner").sort({createdAt:-1});

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

export const get_user_items=async(req,res)=>{
    try {
        const user=req.query.user
        const category=req.query.category

        var post=await lostAndFoundModel.find({user,category}).populate("user").sort({createdAt:-1});    
        if(!post){
            res.status(400).send({
                succes:true,
                message:"no data",
            })
        }
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

export const get_user_order=async(req,res)=>{
    try {
        const user=req.query.user
        
        const orders = await orderModel.find({ user })
        .populate({
            path: 'carts',
            populate: { path: 'product', select: '-user' }
        })
        .populate('user');

    res.status(200).send(orders);
    } catch (error) {
      console.log(error)
      res.status(400).send({
        message:"failed",
      })
    }

}
