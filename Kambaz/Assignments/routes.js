import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app) {
  const dao = AssignmentsDao();

  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const assignments = await dao.findAssignmentsForCourse(req.params.courseId);
    res.json(assignments);
  });

  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    const assignmentData = {
      title: req.body.title,
      course: req.params.courseId,
    };
    const newAssignment = await dao.createAssignment(assignmentData);
    res.json(newAssignment);
  });

  app.put("/api/assignments/:assignmentId", async (req, res) => {
    const updated = await dao.updateAssignment(req.params.assignmentId, req.body);
    res.json(updated);
  });

  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    const result = await dao.deleteAssignment(req.params.assignmentId);
    res.json(result);
  });
}
