import mongoose from "mongoose";
import DiscussionSchema from "./discussions.schema.js";
export default mongoose.model("PazzaDiscussion", DiscussionSchema);
