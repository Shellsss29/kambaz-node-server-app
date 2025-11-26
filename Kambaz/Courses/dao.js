import { v4 as uuidv4 } from "uuid";
import CourseModel from "./model.js";
import EnrollmentModel from "../Enrollments/model.js";

export default function CoursesDao() {
  const findAllCourses = () => CourseModel.find();

  const findCoursesForEnrolledUser = async (userId) => {
    const enrollments = await EnrollmentModel.find({ user: userId });
    const courseIds = enrollments.map((e) => e.course);
    return CourseModel.find({ _id: { $in: courseIds } });
  };

  const createCourse = async (course) => {
    const newCourse = { ...course, _id: uuidv4() };
    return CourseModel.create(newCourse);
  };

  const deleteCourse = async (courseId) => {
    await CourseModel.deleteOne({ _id: courseId });
    await EnrollmentModel.deleteMany({ course: courseId });
    return { status: "deleted", courseId };
  };

  const updateCourse = async (courseId, updates) => {
    return CourseModel.updateOne({ _id: courseId }, { $set: updates });
  };

  return {
    findAllCourses,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}
