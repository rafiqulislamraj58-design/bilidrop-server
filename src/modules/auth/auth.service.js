import { getDB } from "../../config/database.js";

export const findUserByEmailService = async (email) => {
  const db = getDB();
  return await db.collection("users").findOne({ email });
};

export const registerUserService = async (data) => {
  const db = getDB();
  return await db.collection("users").insertOne({ ...data, createdAt: new Date() });
};