import express from "express"
import { get_items,post_items } from "../controllers/lostAndFounControllers.js";

const router = express.Router();

router.post("/post" ,post_items);
router.get("/get", get_items);

export default router;