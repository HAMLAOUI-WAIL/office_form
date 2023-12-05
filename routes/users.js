import express from "express";
import { Router } from "express";
import { check } from "express-validator";
import { verifyToken } from "../middleware/auth.js";
// import * as userControllers from "../controllers/userControllers.js";
import {register,login,getRandomUsers,getUser,updateUser,follow,unfollow,getFollowers,getFollowing} from "../controllers/userControllers.js"

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/random", getRandomUsers);

router.get("/:username", getUser);
router.patch("/:id", verifyToken, updateUser);

router.post("/follow/:id", verifyToken, follow);
router.delete("/unfollow/:id", verifyToken, unfollow);

router.get("/followers/:id", getFollowers);
router.get("/following/:id", getFollowing);

export default router;