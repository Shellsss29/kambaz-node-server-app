import mongoose from "mongoose";
import PostSchema from "./posts.schema.js";
export default mongoose.model("PazzaPost", PostSchema);
