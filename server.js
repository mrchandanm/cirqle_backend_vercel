import express from "express"
import cors from "cors"
import morgan from "morgan";
import connectdb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bodyParser from "body-parser";
import buyAndSellRoutes from "./routes/buyAndSellRoutes.js"
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import DateSparkRoutes from "./routes/DateSparkRoutes.js"
import lostAndFoundRoutes from "./routes/lostAndFoundRoutes.js"
import askDoubtsRoutes from "./routes/askDoubtsRoutes.js"
import funFeedRoutes from "./routes/funFeedRoutes.js"
import travelBuddyRoutes from "./routes/travelBuddyRoutes.js"
import userDetailsUpdateRoutes from "./routes/userDetailsUpdateRoutes.js"
import productRoutes from "./routes/cirqleStore/productRoutes.js"
import userPostAndOrders from "./routes/userPostsAndOrdersRoutes.js"



import { Server } from "socket.io";
import http from "http"


const app=express();
const server=http.createServer(app);
connectdb();
app.use(bodyParser.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use("/api/v1/cirqle",authRoutes);
app.use("/api/v1/buyandsell",buyAndSellRoutes);
app.use("/api/v1/chat",chatRoutes)
app.use("/api/v1/message",messageRoutes)
app.use("/api/v1/datespark",DateSparkRoutes)
app.use("/api/v1/lostandfound",lostAndFoundRoutes)
app.use("/api/v1/askdoubts",askDoubtsRoutes)
app.use("/api/v1/funfeeds",funFeedRoutes)
app.use("/api/v1/travelbuddy",travelBuddyRoutes)
app.use("/api/v1/update",userDetailsUpdateRoutes)

app.use("/api/v1/user",userPostAndOrders)


app.use("/api/v1/cirqlestore",productRoutes)

 const PORT=process.env.PORT|| 8080;
export var io=new Server(server);
app.get("/", async(req,res)=>{
    res.send("Every thing is good");
})

io.on("connection",(socket)=>{
    console.log(`connected to socket.io id: ${socket.id}`);

    socket.on("join-chat",(room)=>{
        socket.join(room);  //to create room using join with a room id

        console.log("user joind room : " + room)
        socket.on("newMessage", (data)=>{
            console.log(data);
            socket.in(room).emit("message received", data)
        })

        socket.on('leave-room', (roomId) => {
            socket.leave(roomId);
            console.log(`Socket ${socket.id} left room ${roomId}`);
          });
    });



})
 export default server;   //<---versel
 if (import.meta.url === `file://${process.argv[1]}`) {  //<----versel
  server.listen(PORT,()=>{
      console.log(`app is running on port ${PORT}`);
  })
 }//<----versel
//module.exports.handler = Serverless(app)

// server.listen(PORT,()=>{
//     console.log(`app is running on port ${PORT}`);
// })