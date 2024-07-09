
import JWT from "jsonwebtoken";
import { env } from "process";
const generateToken=async (_id)=>{
return await JWT.sign({_id},process.env.JWT_SECRET,{expiresIn:"30d",});
}
// JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d",});
export default generateToken;