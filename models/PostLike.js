import mongoose from "mongoose";

const { Schema } = mongoose;

const PostLikeSchema = new Schema(
  {
    postId: {
      type: mongoose.Types.ObjectId,
      ref: "post",
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const PostLikeModel = mongoose.model("postLike", PostLikeSchema);

export default PostLikeModel;
