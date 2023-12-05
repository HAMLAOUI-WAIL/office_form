import express from "express";
import { Router } from "express";
// import * as postControllers from "../controllers/postControllers.js";
import {getPosts,createPost,getPost,updatePost,deletePost,likePost,unlikePost,getUserLikes,getUserLikedPosts} from "../controllers/postControllers.js"
import { verifyToken, optionallyVerifyToken } from "../middleware/auth.js";

const router = Router();

router.get("/", optionallyVerifyToken, getPosts);
router.post("/", verifyToken, createPost);

router.get("/:id", optionallyVerifyToken, getPost);
router.patch("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

router.post("/like/:id", verifyToken, likePost);
router.delete("/like/:id", verifyToken, unlikePost);
router.get(
  "/liked/:id",
  optionallyVerifyToken,
  getUserLikedPosts
);
router.get("/like/:postId/users", getUserLikes);

export default router;
