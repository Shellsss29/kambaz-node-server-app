import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  const dao = CoursesDao();
  const enrollmentsDao = EnrollmentsDao();

  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
  });

  app.get("/api/users/:userId/courses", async (req, res) => {
    let { userId } = req.params;

    if (userId === "current") {
      const currentUser = req.session.currentUser;
      if (!currentUser) return res.sendStatus(401);
      userId = currentUser._id;
    }

    const courses = await dao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  });

  app.post("/api/users/current/courses", async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) return res.sendStatus(401);

    const newCourse = await dao.createCourse(req.body);

    // Auto-enroll creator
    await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);

    res.json(newCourse);
  });

  app.delete("/api/courses/:courseId", async (req, res) => {
    const status = await dao.deleteCourse(req.params.courseId);
    res.json(status);
  });

  app.put("/api/courses/:courseId", async (req, res) => {
    const status = await dao.updateCourse(
      req.params.courseId,
      req.body
    );
    res.json(status);
  });
}
