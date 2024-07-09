import complaintsModel from "../../models/cirqleStore/complaintsModel.js";
import orderCartsModel from "../../models/cirqleStore/orderCartsModel.js";
import orderModel from "../../models/cirqleStore/orderModel.js";
import productModel from "../../models/cirqleStore/productModel.js";
import userCartModel from "../../models/cirqleStore/userCartModel.js";

export const add_Product=async (req,res)=>{
    try {
        const{title,productDetails,price,mrp,minQuantity,category,images,brand,expiry,collegeName,noOfstock}=req.body

        const product=await new productModel({title,productDetails,price,mrp,minQuantity,category,images,brand,expiry,collegeName,noOfstock}).save()
    
        
        res.status(200).send(
            product
        )
        
    } catch (error) {
        console.log(error)
        res.status(400).send({
            succes:false,
            message:"FAILED TO UPLOAD",
            error,
        })
    }
}


export const get_products=async(req,res)=>{
    try {
        const category=req.query.category
        const collegeName=req.query.collegeName
        var products
        if(category!=""){
             products=await productModel.find({category, collegeName});
        }
        else{
            products=await productModel.find({collegeName})
        }

        res.status(200).send({
            message:"succesful",
            products
        })
    } catch (error) {
      console.log(error)
      res.status(400).send({
        message:"failed",
      })
    }

}

export const update_products=async(req,res)=>{
    try {
        const productId=req.query.productId
        const{title,productDetails,price,mrp,minQuantity,category,images,brand,expiry,collegeName,noOfstock}=req.body
        
        const product=await productModel.findOneAndReplace({ _id: productId },{title,productDetails,price,mrp,minQuantity,category,images,brand,expiry,collegeName,noOfstock} , { new: true })

        res.status(200).send(product)
    } catch (error) {
      console.log(error)
      res.status(400).send({
        message:"failed",
      })
    }

}


export const delete_products=async(req,res)=>{
    try {
        const productId=req.query.productId
        
        const products=await productModel.findByIdAndDelete(productId)

        res.status(200).send(products)
    } catch (error) {
      console.log(error)
      res.status(400).send({
        message:"failed",
      })
    }

}

export const add_to_cart=async(req,res)=>{
    try {
        const product=req.query.product
        const user=req.query.user
        const quantity=req.query.quantity
        
        const cart=await new userCartModel({product,user,quantity}).save()

        res.status(200).send(cart)
    } catch (error) {
      console.log(error)
      res.status(400).send({
        message:"failed",
      })
    }

}

export const get_user_cart=async(req,res)=>{
    try {
        const user=req.query.user
        const product=req.query.product
        const isdeleted=0
        const status="Pending"
        var cart
        if(product==""){
            cart=await userCartModel.find({user,isdeleted}).populate("product").populate("user")
        }
        else{
            cart=await userCartModel.find({user,product}).populate("product").populate("user")
        }
    
      
        res.status(200).send(
            cart
        )
    } catch (error) {
      console.log(error)
      res.status(400).send({
        message:"failed",
      })
    }
}


export const update_cart_quantity=async(req,res)=>{
    try {
        const cartId=req.query.cartId
       const quantity=req.query.quantity
       console.log(quantity)
     var Ucart
       if(quantity==0){
        var Ucartt=await userCartModel.findById(cartId)
   
          await userCartModel.findByIdAndDelete(cartId)
          res.status(200).send(Ucartt)
          return
       }
       if(quantity==-1){
        Ucart=await userCartModel.findByIdAndUpdate({_id:cartId}, {status:"orderPlaced"})
       }
       else{
         Ucart=await userCartModel.findOneAndUpdate({ _id: cartId },{quantity} , { new: true })
       }
        res.status(200).send(Ucart)
    } catch (error) {
      console.log(error)
      res.status(400).send({
        message:"failed",
      })
    }
}




export const make_order=async(req,res)=>{
    try {
        const {user,hostel,totalAmount,totalMrp,collegeName,carts} = req.body
        const newcarts=[]
        for (const cart of carts) {
          const carti=await userCartModel.findById(cart)
          const product=carti.product
          const user=carti.user
          const quantity=carti.quantity
          const newcart=await new orderCartsModel({product,user,quantity}).save()
          newcarts.push(newcart._id)
          await userCartModel.findByIdAndDelete(cart)
            // await userCartModel.findByIdAndUpdate(cart, { status: "orderPlaced" });
      }
        
        const iorder=await new orderModel({user,hostel,totalAmount,totalMrp,collegeName,carts:newcarts}).save()
        const forder=await (await iorder.populate("carts")).populate("user")
        const order=await productModel.populate(forder,{path:"carts.product", select:"product quantity"})
        res.status(200).send(order)
    } catch (error) {
      console.log(error)
      res.status(400).send({
        message:"failed",
      })
    }

}

export const get_order=async(req,res)=>{
    try {
        const collegeName=req.query.collegeName
        const status=req.query.status
        const userId=req.query.userId
        var orders
        if(userId==""){
          orders = await orderModel.find({ collegeName, status })
          .populate({
              path: 'carts',
              populate: { path: 'product', select: '-user' }
          })
          .populate('user').sort({updatedAt:-1})

        }
        else{
          
          orders = await orderModel.find({user:userId})
          .populate({
              path: 'carts',
              populate: { path: 'product', select: '-user' }
          })
          .populate('user').sort({createdAt:-1})
        }
       

    res.status(200).send(orders);
    } catch (error) {
      console.log(error)
      res.status(400).send({
        message:"failed",
      })
    }

}

export const update_order_status=async(req,res)=>{
    try {
        const orderId=req.query.orderId
        const status=req.query.status

        const order= await orderModel.findByIdAndUpdate({ _id: orderId },{status} , { new: true })

        res.status(200).send("Succesfull")
    } catch (error) {
      console.log(error)
      res.status(400).send({
        message:"failed",
      })
    }
}



export const register_complaint=async(req,res)=>{
  try {
      const complaint=req.query.complaint
      const userId=req.query.userId
      
      const comp=await new complaintsModel({complaint,user:userId}).save()

      res.status(200).send("Successfull")
  } catch (error) {
    console.log(error)
    res.status(400).send({
      message:"failed",
    })
  }

}









