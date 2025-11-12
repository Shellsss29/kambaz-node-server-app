import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app, db) {
  const dao = AssignmentsDao(db);

  const findAssignmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const assignments = dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };

  const createAssignmentForCourse = (req, res) => {
    const { courseId } = req.params;
    const newAssignment = {
      ...req.body,
      course: courseId,
    };
    const createdAssignment = dao.createAssignment(newAssignment);
    res.json(createdAssignment);
  };

  const updateAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const updates = req.body;
    const updatedAssignment = dao.updateAssignment(assignmentId, updates);
    if (!updatedAssignment) {
      return res.status(404).send({ error: "Assignment not found" });
    }
    res.json(updatedAssignment);
  };

  const deleteAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const result = dao.deleteAssignment(assignmentId);
    res.json(result);
  };

  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}
