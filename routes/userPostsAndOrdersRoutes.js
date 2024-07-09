import express from "express";
import { get_user_ads, get_user_feed, get_user_items, get_user_order } from "../controllers/userPostsAndOrders.js";

const router = express.Router();

router.get("/get_orders",get_user_order);

router.get("/get_buy_sell",get_user_ads);
router.get("/get_lost_found",get_user_items);
router.get("/get_user_feeds",get_user_feed)

export default router;