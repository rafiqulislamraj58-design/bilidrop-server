import { ObjectId } from "mongodb";
import { getDB } from "../../config/database.js";

export const createReview = async (user, data) => {
  const db = getDB();

  const book = await db.collection("books").findOne({
    _id: new ObjectId(data.bookId),
  });

  if (!book) {
    throw new Error("Book not found");
  }

  const review = {
    userId: user.id,
    bookId: data.bookId,
    rating: data.rating,
    comment: data.comment,
    createdAt: new Date(),
  };

  const result = await db.collection("reviews").insertOne(review);

  return {
    _id: result.insertedId,
    ...review,
  };
};

export const getBookReviews = async (bookId) => {
  const db = getDB();

  return await db.collection("reviews")
    .find({
      bookId,
    })
    .sort({
      createdAt: -1,
    })
    .toArray();
};