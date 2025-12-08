import PazzaDao from "./dao.js";

export default function PazzaRoutes(app) {
  const dao = PazzaDao();

  app.get("/api/courses/:cid/pazza/posts", async (req, res) => {
    const { cid } = req.params;
    const { folder, search } = req.query;
    res.json(await dao.getPosts(cid, { folder, search }));
  });

  app.post("/api/courses/:cid/pazza/posts", async (req, res) => {
    const { cid } = req.params;
    const data = req.body;
    data.course = cid;
    res.json(await dao.createPost(data));
  });

  app.get("/api/pazza/posts/:id", async (req, res) => {
    res.json(await dao.getPostById(req.params.id));
  });

  app.put("/api/pazza/posts/:id", async (req, res) => {
    await dao.updatePost(req.params.id, req.body);
    res.json({ status: "OK" });
  });

  app.delete("/api/pazza/posts/:id", async (req, res) => {
    await dao.deletePost(req.params.id);
    res.json({ status: "OK" });
  });

  app.get("/api/pazza/posts/:postId/answers", async (req, res) => {
    res.json(await dao.getAnswers(req.params.postId));
  });

  app.post("/api/pazza/posts/:postId/answers", async (req, res) => {
    res.json(await dao.createAnswer({ post: req.params.postId, ...req.body }));
  });

  app.put("/api/pazza/answers/:id", async (req, res) => {
    await dao.updateAnswer(req.params.id, req.body);
    res.json({ status: "OK" });
  });

  app.delete("/api/pazza/answers/:id", async (req, res) => {
    await dao.deleteAnswer(req.params.id);
    res.json({ status: "OK" });
  });

  app.get("/api/pazza/posts/:postId/discussions", async (req, res) => {
    res.json(await dao.getDiscussions(req.params.postId));
  });

  app.post("/api/pazza/posts/:postId/discussions", async (req, res) => {
    res.json(
      await dao.createDiscussion({ post: req.params.postId, ...req.body })
    );
  });

  app.put("/api/pazza/discussions/:id", async (req, res) => {
    await dao.updateDiscussion(req.params.id, req.body);
    res.json({ status: "OK" });
  });

  app.delete("/api/pazza/discussions/:id", async (req, res) => {
    await dao.deleteDiscussion(req.params.id);
    res.json({ status: "OK" });
  });

  app.post("/api/pazza/discussions/:id/replies", async (req, res) => {
    res.json(await dao.addReply(req.params.id, req.body));
  });

  app.put(
    "/api/pazza/discussions/:discussionId/replies/:replyId",
    async (req, res) => {
      await dao.updateReply(
        req.params.discussionId,
        req.params.replyId,
        req.body.body
      );
      res.json({ status: "OK" });
    }
  );

  app.delete(
    "/api/pazza/discussions/:discussionId/replies/:replyId",
    async (req, res) => {
      await dao.deleteReply(req.params.discussionId, req.params.replyId);
      res.json({ status: "OK" });
    }
  );

  app.get("/api/courses/:cid/pazza/folders", async (req, res) => {
    res.json(await dao.getFolders(req.params.cid));
  });

  app.post("/api/courses/:cid/pazza/folders", async (req, res) => {
    res.json(await dao.createFolder({ course: req.params.cid, ...req.body }));
  });

  app.put("/api/pazza/folders/:id", async (req, res) => {
    await dao.updateFolder(req.params.id, req.body);
    res.json({ status: "OK" });
  });

  app.delete("/api/pazza/folders/:id", async (req, res) => {
    await dao.deleteFolder(req.params.id);
    res.json({ status: "OK" });
  });
}
