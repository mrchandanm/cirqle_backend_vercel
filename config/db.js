import mongoose from "mongoose"
import dotenv from 'dotenv';
dotenv.config();

const connectdb=async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,

        });
        console.log(`mongodb connection successful on port ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
    }
}
export default connectdb;