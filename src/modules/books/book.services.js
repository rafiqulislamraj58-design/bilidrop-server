import { getDB } from "../../config/database.js";
import { ObjectId } from "mongodb";

export const createBookService = async (data) => {
  const db = getDB();
  return await db.collection("books").insertOne({ ...data, createdAt: new Date() });
};

export const getBooksService = async () => {
  const db = getDB();
  return await db.collection("books").find().toArray();
};

export const getBookByIdService = async (id) => {
  const db = getDB();
  return await db.collection("books").findOne({ _id: new ObjectId(id) });
};

export const updateBookService = async (id, update) => {
  const db = getDB();
  return await db.collection("books").updateOne({ _id: new ObjectId(id) }, { $set: update });
};

export const deleteBookService = async (id) => {
  const db = getDB();
  return await db.collection("books").deleteOne({ _id: new ObjectId(id) });
};