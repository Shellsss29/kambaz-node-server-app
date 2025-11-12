import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  app.get("/api/enrollments/current", (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.sendStatus(401);
    }
    const courses = dao.findEnrollmentsForUser(currentUser._id);
    res.json(courses);
  });

  app.post("/api/enrollments/:courseId", (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.sendStatus(401);
    }
    const { courseId } = req.params;
    const enrollment = dao.enrollUserInCourse(currentUser._id, courseId);
    res.json(enrollment);
  });

  app.delete("/api/enrollments/:courseId", (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.sendStatus(401);
    }
    const { courseId } = req.params;
    const result = dao.unenrollUserFromCourse(currentUser._id, courseId);
    res.json(result);
  });

  app.get("/api/courses/:courseId/users", (req, res) => {
    const { courseId } = req.params;
    const users = dao.findUsersForCourse(courseId);
    res.json(users);
  });
}
