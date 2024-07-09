import express from "express"
import { get_feed, post_feed, vote } from "../controllers/funFeedsControllers.js";

const router = express.Router();

router.post("/" ,post_feed);
router.get("/", get_feed);
router.put("/vote",vote)

export default router;