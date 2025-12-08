import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    _id: String,
    course: { type: String, required: true },
    author: { type: String, required: true },
    type: { type: String, enum: ["QUESTION", "NOTE"], default: "QUESTION" },

    summary: { type: String, required: true, maxlength: 100 },
    details: { type: String, required: true },

    folders: { type: [String], default: [] },

    visibleToAll: { type: Boolean, default: true },
    visibleTo: { type: [String], default: [] },

    viewsCount: { type: Number, default: 0 },
  },
  { collection: "pazza_posts", timestamps: true }
);

export default PostSchema;
