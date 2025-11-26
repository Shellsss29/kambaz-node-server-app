import ModulesDao from "./dao.js";

export default function ModulesRoutes(app) {
  const dao = ModulesDao();

  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const modules = await dao.findModulesForCourse(req.params.courseId);
    res.json(modules);
  });

  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const module = {
      ...req.body,
      course: req.params.courseId,
    };
    const newModule = await dao.createModule(module);
    res.json(newModule);
  });

  app.delete("/api/modules/:moduleId", async (req, res) => {
    const result = await dao.deleteModule(req.params.moduleId);
    res.json(result);
  });

  app.put("/api/modules/:moduleId", async (req, res) => {
    const result = await dao.updateModule(
      req.params.moduleId,
      req.body
    );
    res.json(result);
  });
}
