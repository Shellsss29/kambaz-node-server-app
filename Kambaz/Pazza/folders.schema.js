import mongoose from "mongoose";

const FolderSchema = new mongoose.Schema(
  {
    _id: String,
    course: { type: String, required: true },
    name: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { collection: "pazza_folders" }
);

export default FolderSchema;
