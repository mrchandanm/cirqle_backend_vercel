import { allMessages, sendMessageController } from "../controllers/messageControllers.js";
import express from "express"

const router = express.Router();

router.post("/send", sendMessageController);

 router.get("/get-messages/:chatId", allMessages);


export default router;