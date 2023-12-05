import mongoose from "mongoose";

const { Schema } = mongoose;

const ConversationSchema = new Schema(
  {
    recipients: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    lastMessageAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const ConversationModel = mongoose.model("conversation", ConversationSchema);

export default ConversationModel;
