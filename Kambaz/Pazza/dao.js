import { v4 as uuidv4 } from "uuid";
import PazzaPost from "./posts.model.js";
import PazzaAnswer from "./answers.model.js";
import PazzaDiscussion from "./discussions.model.js";
import PazzaFolder from "./folders.model.js";

export default function PazzaDao() {
  const getPosts = (course, { folder, search }) => {
    const filter = { course };

    if (folder) filter.folders = folder;

    if (search) {
      filter.$or = [
        { summary: { $regex: search, $options: "i" } },
        { details: { $regex: search, $options: "i" } },
      ];
    }
    return PazzaPost.find(filter).sort({ createdAt: -1 });
  };

  const getPostById = (id) => PazzaPost.findById(id);

  const createPost = (data) =>
    PazzaPost.create({
      _id: uuidv4(),
      ...data,
      viewsCount: 0,
    });

  const updatePost = (id, updates) =>
    PazzaPost.updateOne({ _id: id }, { $set: updates });

  const deletePost = (id) => PazzaPost.deleteOne({ _id: id });

  const getAnswers = (postId) =>
    PazzaAnswer.find({ post: postId }).sort({ createdAt: 1 });

  const createAnswer = (data) =>
    PazzaAnswer.create({
      _id: uuidv4(),
      ...data,
    });

  const updateAnswer = (id, updates) =>
    PazzaAnswer.updateOne({ _id: id }, { $set: updates });

  const deleteAnswer = (id) => PazzaAnswer.deleteOne({ _id: id });

  const getDiscussions = (post) =>
    PazzaDiscussion.find({ post }).sort({ createdAt: 1 });

  const createDiscussion = (data) =>
    PazzaDiscussion.create({
      _id: uuidv4(),
      ...data,
      replies: [],
    });

  const updateDiscussion = (id, updates) =>
    PazzaDiscussion.updateOne({ _id: id }, { $set: updates });

  const deleteDiscussion = (id) => PazzaDiscussion.deleteOne({ _id: id });

  const addReply = (discussionId, reply) =>
    PazzaDiscussion.updateOne(
      { _id: discussionId },
      {
        $push: {
          replies: {
            _id: uuidv4(),
            ...reply,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      }
    );

  const updateReply = (discussionId, replyId, body) =>
    PazzaDiscussion.updateOne(
      { _id: discussionId, "replies._id": replyId },
      {
        $set: {
          "replies.$.body": body,
          "replies.$.updatedAt": new Date(),
        },
      }
    );

  const deleteReply = (discussionId, replyId) =>
    PazzaDiscussion.updateOne(
      { _id: discussionId },
      { $pull: { replies: { _id: replyId } } }
    );

  const getFolders = (course) =>
    PazzaFolder.find({ course }).sort({ order: 1 });

  const createFolder = (data) => PazzaFolder.create({ _id: uuidv4(), ...data });

  const updateFolder = (id, updates) =>
    PazzaFolder.updateOne({ _id: id }, { $set: updates });

  const deleteFolder = (id) => PazzaFolder.deleteOne({ _id: id });

  return {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,

    getAnswers,
    createAnswer,
    updateAnswer,
    deleteAnswer,

    getDiscussions,
    createDiscussion,
    updateDiscussion,
    deleteDiscussion,
    addReply,
    updateReply,
    deleteReply,

    getFolders,
    createFolder,
    updateFolder,
    deleteFolder,
  };
}
