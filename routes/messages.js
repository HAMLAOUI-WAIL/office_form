import express from "express";
// import messageController from "../controllers/messageController.js";
import {getConversations,sendMessage,getMessages} from "../controllers/messageController.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getConversations);
router.post("/:id", verifyToken, sendMessage);
router.get("/:id", verifyToken, getMessages);

export default router;
