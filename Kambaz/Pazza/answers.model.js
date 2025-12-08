import mongoose from "mongoose";
import AnswerSchema from "./answers.schema.js";
export default mongoose.model("PazzaAnswer", AnswerSchema);
