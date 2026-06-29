import { getDB } from "../../config/database.js";
import { ObjectId } from "mongodb";

export const addWishlistService = async (userId, bookId) => {
  const db = getDB();
  return await db.collection("wishlists").insertOne({ userId, bookId, createdAt: new Date() });
};

export const getWishlistService = async (userId) => {
  const db = getDB();
  return await db.collection("wishlists").find({ userId }).toArray();
};

export const removeWishlistService = async (id) => {
  const db = getDB();
  return await db.collection("wishlists").deleteOne({ _id: new ObjectId(id) });
};
