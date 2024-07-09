import express from "express";
import { updateDetails, updateProfilePic } from "../controllers/updateDetailsControllers.js";

//router object
const router = express.Router();

router.put("/userdetils",updateDetails);

router.put("/profilepic",updateProfilePic);

export default router;