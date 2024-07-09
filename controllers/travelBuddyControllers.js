import TravelBuddyModel from "../models/TravelBuddyModel.js"

export const add_trip=async (req,res)=>{
    try {
        const {to,from,user,description,collegeName,DepartureDate,returnDate,costSharing,seatsAvailable}=req.body

        const ipost=await new TravelBuddyModel({to,from,user,description,collegeName,DepartureDate,returnDate,costSharing,seatsAvailable}).save()
        const post=await ipost.populate("user")

        res.status(200).send(post)
        
    } catch (error) {
        res.status(400).send({
            message:"failed"
        })
    }
}

export const get_trip=async(req,res)=>{
    try {
        const collegeName=req.query.collegeName
        const post=await TravelBuddyModel.find({collegeName}).populate("user").sort({DepartureDate:-1})

    res.status(200).send(post)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message:"failed"
        })
    }
}


