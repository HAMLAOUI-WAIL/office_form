import mongoose from "mongoose";

const { Schema } = mongoose;

const FollowSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    followingId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const FollowModel = mongoose.model("follow", FollowSchema);

export default FollowModel;
