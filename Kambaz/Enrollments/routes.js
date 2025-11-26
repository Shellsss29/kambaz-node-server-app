import EnrollmentsDao from "./dao.js";
const dao = EnrollmentsDao();

export default function EnrollmentsRoutes(app) {
  app.get("/api/enrollments/current", async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) return res.sendStatus(401);

    const courses = await dao.findEnrollmentsForUser(currentUser._id);
    res.json(courses);
  });

  app.post("/api/enrollments/:courseId", async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) return res.sendStatus(401);

    const { courseId } = req.params;
    const enrollment = await dao.enrollUserInCourse(currentUser._id, courseId);
    res.json(enrollment);
  });

  app.delete("/api/enrollments/:courseId", async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) return res.sendStatus(401);

    const { courseId } = req.params;
    const result = await dao.unenrollUserFromCourse(currentUser._id, courseId);
    res.json(result);
  });

  app.get("/api/courses/:courseId/users", async (req, res) => {
    const { courseId } = req.params;
    const users = await dao.findUsersForCourse(courseId);
    res.json(users);
  });

  app.post("/api/enrollments/:courseId/:userId", async (req, res) => {
    const { courseId, userId } = req.params;
    const result = dao.enrollUserInCourse(userId, courseId);
    res.json(result);
  });

  app.delete("/api/enrollments/:courseId/:userId", async (req, res) => {
    const { courseId, userId } = req.params;
    const result = await dao.unenrollUserFromCourse(userId, courseId);
    res.json(result);
  });
}
