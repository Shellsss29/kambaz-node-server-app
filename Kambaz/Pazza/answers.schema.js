import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema(
  {
    _id: String,
    post: { type: String, required: true },
    author: { type: String, required: true },
    role: { type: String, enum: ["STUDENT", "INSTRUCTOR"], required: true },

    body: { type: String, required: true },
  },
  { collection: "pazza_answers", timestamps: true }
);

export default AnswerSchema;
