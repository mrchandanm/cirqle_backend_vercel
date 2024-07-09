import express from "express";
import { check_user, get_user, register_user } from "../controllers/dateSparkControllers.js";

const router = express.Router();

router.post("/register_user",register_user);

router.get("/get_user",get_user);
router.get("/check_user",check_user);

export default router;