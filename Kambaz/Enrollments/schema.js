import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    user: { type: String, ref: "users", required: true },
    course: { type: String, ref: "courses", required: true }
  },
  { collection: "enrollments" }
);

export default enrollmentSchema;
