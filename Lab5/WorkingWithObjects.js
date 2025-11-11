const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

const moduleObj = {
  id: "M101",
  name: "Web Development",
  description: "Learn the basics of React and Node.js",
  course: "CS5610",
};

export default function WorkingWithObjects(app) {
  app.get("/lab5/assignment", (req, res) => res.json(assignment));

  app.get("/lab5/assignment/title", (req, res) => res.json(assignment.title));

  app.get("/lab5/assignment/title/:newTitle", (req, res) => {
    assignment.title = req.params.newTitle;
    res.json(assignment);
  });

  app.get("/lab5/assignment/score/:newScore", (req, res) => {
    assignment.score = parseInt(req.params.newScore);
    res.json(assignment);
  });

  app.get("/lab5/assignment/completed/:newCompleted", (req, res) => {
    assignment.completed = req.params.newCompleted === "true";
    res.json(assignment);
  });

  app.get("/lab5/module", (req, res) => res.json(moduleObj));

  app.get("/lab5/module/name", (req, res) => res.json(moduleObj.name));

  app.get("/lab5/module/name/:newName", (req, res) => {
    moduleObj.name = req.params.newName;
    res.json(moduleObj);
  });

  app.get("/lab5/module/description/:newDescription", (req, res) => {
    moduleObj.description = req.params.newDescription;
    res.json(moduleObj);
  });
}
