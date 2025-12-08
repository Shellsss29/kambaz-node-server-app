import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema(
  {
    _id: String,
    author: String,
    body: String,
    createdAt: Date,
    updatedAt: Date,
  },
  { _id: false }
);

const DiscussionSchema = new mongoose.Schema(
  {
    _id: String,
    post: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true },

    resolved: { type: Boolean, default: false },

    replies: [ReplySchema],
  },
  { collection: "pazza_discussions", timestamps: true }
);

export default DiscussionSchema;
