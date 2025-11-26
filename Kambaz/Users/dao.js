import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function UsersDao() {
  const createUser = async (user) => {
    const newUser = { ...user, _id: uuidv4() };
    return await model.create(newUser);
  };

  const findAllUsers = async () => model.find();

  const findUserById = async (userId) => model.findById(userId);

  const findUserByUsername = async (username) =>
    model.findOne({ username });

  const findUserByCredentials = async (username, password) =>
    model.findOne({ username, password });

  const findUsersByRole = async (role) =>
    model.find({ role });

  const updateUser = async (userId, user) =>
    model.updateOne({ _id: userId }, { $set: user });

  const deleteUser = async (userId) =>
    model.findByIdAndDelete(userId);

  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser,
    findUsersByRole,
  };
}
