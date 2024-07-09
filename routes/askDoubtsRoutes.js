import express from "express"
import { add_comment, delete_post, get_comments, get_question, like_post, post_question, vote } from "../controllers/askDoubtsControllers.js";

const router = express.Router();

router.post("/" ,post_question);
router.get("/", get_question);
router.put("/vote",vote)
router.get("/comment",get_comments)
router.post("/comment",add_comment)
router.put("/like",like_post)
router.delete("/delete",delete_post)

export default router;