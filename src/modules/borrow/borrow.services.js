import { getDB } from "../../config/database.js";
import { ObjectId } from "mongodb";

export const borrowBookService = async (userId, bookId) => {
  const db = getDB();
  return await db.collection("borrowings").insertOne({
    userId,
    bookId,
    status: "borrowed",
    borrowedAt: new Date(),
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), 
  });
};

export const getBorrowingsService = async (userId) => {
  const db = getDB();
  return await db.collection("borrowings").find({ userId }).toArray();
};

export const returnBookService = async (id) => {
  const db = getDB();
  return await db.collection("borrowings").updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: "returned", returnedAt: new Date() } }
  );
};

export const renewBookService = async (id, newDueDate) => {
  const db = getDB();
  return await db.collection("borrowings").updateOne(
    { _id: new ObjectId(id) },
    { $set: { dueDate: new Date(newDueDate) } }
  );
};
