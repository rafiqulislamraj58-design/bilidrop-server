import { ObjectId } from "mongodb";
import { getDB } from "../../config/database.js";

export const createBook = async (bookData) => {
  const db = getDB();

  const book = {
    ...bookData,
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection("books").insertOne(book);

  return {
    _id: result.insertedId,
    ...book,
  };
};

export const getAllBooks = async () => {
  const db = getDB();

  return await db.collection("books").find({}).toArray();
};

export const getSingleBook = async (id) => {
  const db = getDB();

  return await db.collection("books").findOne({
    _id: new ObjectId(id),
  });
};
export const updateBook = async (id, data) => {
  const db = getDB();

  await db.collection("books").updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        ...data,
        updatedAt: new Date(),
      },
    }
  );

  return await getSingleBook(id);
};

export const deleteBook = async (id) => {
  const db = getDB();

  return await db.collection("books").deleteOne({
    _id: new ObjectId(id),
  });
};