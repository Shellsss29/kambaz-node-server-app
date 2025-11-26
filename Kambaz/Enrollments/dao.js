import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import usersModel from "../Users/model.js";
import coursesModel from "../Courses/model.js";

export default function EnrollmentsDao() {
  const enrollUserInCourse = async (userId, courseId) => {
    const exists = await model.findOne({ user: userId, course: courseId });
    if (exists) return { status: "already enrolled" };

    const enrollment = await model.create({
      _id: uuidv4(),
      user: userId,
      course: courseId,
    });

    return enrollment;
  };

  const unenrollUserFromCourse = async (userId, courseId) => {
    const result = await model.deleteOne({ user: userId, course: courseId });

    return result.deletedCount === 0
      ? { status: "not found" }
      : { status: "unenrolled" };
  };

  const findEnrollmentsForUser = async (userId) => {
    const enrollments = await model.find({ user: userId });
    const courseIds = enrollments.map((e) => e.course);
    return await coursesModel.find({ _id: { $in: courseIds } });
  };

  const findUsersForCourse = async (courseId) => {
    const enrollments = await model.find({ course: courseId });
    const userIds = enrollments.map((e) => e.user);

    return await usersModel.find({ _id: { $in: userIds } });
  };

  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
    findEnrollmentsForUser,
    findUsersForCourse,
  };
}
