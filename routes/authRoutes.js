import express from "express";
import { loginController, registerController, updateFCMToken } from "../controllers/authControllers.js";
import { sendWhatsappOtp, verifyotp } from "../controllers/whatsappVerification.js";

//router object
const router = express.Router();

router.post("/register",registerController);

router.post("/login",loginController);
router.put("/updatefcmtoken",updateFCMToken)
router.get("/sendotp",sendWhatsappOtp)
router.post("/verifyotp",verifyotp)

export default router;