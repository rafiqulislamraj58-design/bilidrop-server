import { getDB } from "../../config/database.js";
import { ObjectId } from "mongodb";

export const createUserService = async (data) => {
  const db = getDB();
  return await db.collection("users").insertOne({ ...data, createdAt: new Date() });
};
export const getUsersService = async () => {
  const db = getDB();
  return await db.collection("users").find().toArray();
};

export const getUserByIdService = async (id) => {
  const db = getDB();
  return await db.collection("users").findOne({ _id: new ObjectId(id) });
};

export const updateUserService = async (id, update) => {
  const db = getDB();
  return await db.collection("users").updateOne({ _id: new ObjectId(id) }, { $set: update });
};

export const deleteUserService = async (id) => {
  const db = getDB();
  return await db.collection("users").deleteOne({ _id: new ObjectId(id) });
};

export const updateUserRoleService = async (id, role) => {
  const db = getDB();
  return await db.collection("users").updateOne({ _id: new ObjectId(id) }, { $set: { role } });
};
