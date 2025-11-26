import { v4 as uuidv4 } from "uuid";
import ModuleModel from "./model.js";

export default function ModulesDao() {

  const findModulesForCourse = (courseId) => {
    return ModuleModel.find({ course: courseId });
  };

  const createModule = (module) => {
    const newModule = { ...module, _id: uuidv4() };
    return ModuleModel.create(newModule);
  };

  const deleteModule = (moduleId) => {
    return ModuleModel.deleteOne({ _id: moduleId });
  };

  const updateModule = (moduleId, updates) => {
    return ModuleModel.updateOne({ _id: moduleId }, { $set: updates });
  };

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
  };
}
