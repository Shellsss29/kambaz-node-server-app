import { v4 as uuidv4 } from "uuid";
import AssignmentModel from "./model.js";

export default function AssignmentsDao() {
  const findAssignmentsForCourse = (courseId) =>
    AssignmentModel.find({ course: courseId });

  const createAssignment = (assignment) => {
    const newAssignment = {
      _id: uuidv4(),
      title: assignment.title,
      course: assignment.course,
    };
    return AssignmentModel.create(newAssignment);
  };

  const updateAssignment = (assignmentId, updates) =>
    AssignmentModel.updateOne({ _id: assignmentId }, { $set: updates });

  const deleteAssignment = (assignmentId) =>
    AssignmentModel.deleteOne({ _id: assignmentId });

  return {
    findAssignmentsForCourse,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}
