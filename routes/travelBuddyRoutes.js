import express from "express"
import { add_trip, get_trip } from "../controllers/travelBuddyControllers.js";

const router = express.Router();

router.post("/" ,add_trip);
router.get("/", get_trip);

export default router;