import express from "express";
import {sendChatMessage} from "../controllers/chatControllers.js"

const router = express.Router();

router.post("/sendMessage", sendChatMessage);

export default router;
