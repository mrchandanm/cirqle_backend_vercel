import express from "express"
import { accessChat, fetchChat } from "../controllers/chatController.js";

const router = express.Router();

router.post("/" ,accessChat);
router.get("/", fetchChat);

export default router;