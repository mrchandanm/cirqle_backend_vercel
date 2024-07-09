import express from "express";
import { get_ads, post_ads } from "../controllers/buyAndSellControllers.js";

//router object
const router = express.Router();

router.post("/post_ads",post_ads);

router.get("/get_ads",get_ads);

export default router;