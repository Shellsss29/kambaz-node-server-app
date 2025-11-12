import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    const alreadyEnrolled = enrollments.some(
      (e) => e.user === userId && e.course === courseId
    );
    if (alreadyEnrolled) return { status: "already enrolled" };

    const newEnrollment = {
      _id: uuidv4(),
      user: userId,
      course: courseId,
    };
    db.enrollments.push(newEnrollment);
    return newEnrollment;
  }

  function unenrollUserFromCourse(userId, courseId) {
    const beforeCount = db.enrollments.length;
    db.enrollments = db.enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );
    const afterCount = db.enrollments.length;
    return { status: beforeCount === afterCount ? "not found" : "unenrolled" };
  }

  function findEnrollmentsForUser(userId) {
    const { enrollments, courses } = db;
    const enrolledCourseIds = enrollments
      .filter((e) => e.user === userId)
      .map((e) => e.course);
    return courses.filter((c) => enrolledCourseIds.includes(c._id));
  }

  function findUsersForCourse(courseId) {
    const { enrollments, users } = db;
    const enrolledUserIds = enrollments
      .filter((e) => e.course === courseId)
      .map((e) => e.user);
    return users.filter((u) => enrolledUserIds.includes(u._id));
  }

  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
    findEnrollmentsForUser,
    findUsersForCourse,
  };
}
