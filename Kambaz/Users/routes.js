import UsersDao from "./dao.js";

export default function UserRoutes(app) {
  const dao = UsersDao();

  const sanitizeUser = (user) => {
    if (!user) return null;
    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      loginId: user.loginId,
      section: user.section,
      lastActivity: user.lastActivity,
      totalActivity: user.totalActivity,
    };
  };

  const createUser = async (req, res) => {
    const newUser = await dao.createUser(req.body);
    res.json(sanitizeUser(newUser));
  };

  const deleteUser = async (req, res) => {
    await dao.deleteUser(req.params.userId);
    res.sendStatus(200);
  };

  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;

    if (name) {
      const users = await dao.findUsersByPartialName(name);
      return res.json(users.map(sanitizeUser));
    }

    if (role) {
      const users = await dao.findUsersByRole(role);
      return res.json(users.map(sanitizeUser));
    }

    const users = await dao.findAllUsers();
    res.json(users.map(sanitizeUser));
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(sanitizeUser(user));
  };

  const signup = async (req, res) => {
    const existing = await dao.findUserByUsername(req.body.username);
    if (existing) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const newUser = await dao.createUser(req.body);
    const sanitizedUser = sanitizeUser(newUser);
    req.session.currentUser = sanitizedUser;
    res.json(sanitizedUser);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const user = await dao.findUserByCredentials(username, password);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unable to login. Try again later." });
    }

    const sanitizedUser = sanitizeUser(user);
    req.session.currentUser = sanitizedUser;
    res.json(sanitizedUser);
  };

  const profile = async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      return res.sendStatus(401);
    }
    res.json(currentUser);
  };

  const signout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const updateUser = async (req, res) => {
    const userId = req.params.userId;
    await dao.updateUser(userId, req.body);

    const updatedUser = await dao.findUserById(userId);
    const sanitizedUser = sanitizeUser(updatedUser);

    if (req.session.currentUser && req.session.currentUser._id === userId) {
      req.session.currentUser = sanitizedUser;
    }

    res.json(sanitizedUser);
  };
  app.post("/api/users/admin/create", async (req, res) => {
    const newUser = await dao.createUser(req.body);
    res.json(newUser);
  });
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);

  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}
