import { ObjectId } from "mongodb";
import { getDB } from "../../config/database.js";
import ApiError from "../../utils/ApiError.js";

export const addWishlist = async (userId, bookId) => {
  const db = getDB();

  const book = await db.collection("books").findOne({
    _id: new ObjectId(bookId),
  });

  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  const exists = await db.collection("wishlist").findOne({
    userId,
    bookId,
  });

  if (exists) {
    throw new ApiError(400, "Book already in wishlist");
  }

  const wishlist = {
    userId,
    bookId,
    createdAt: new Date(),
  };

  const result = await db.collection("wishlist").insertOne(wishlist);

  return {
    _id: result.insertedId,
    ...wishlist,
  };
};

export const getWishlist = async (userId) => {
  const db = getDB();

  return await db
    .collection("wishlist")
    .aggregate([
      {
        $match: {
          userId,
        },
      },
      {
        $addFields: {
          bookObjectId: {
            $toObjectId: "$bookId",
          },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "bookObjectId",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $project: {
          _id: 1,
          createdAt: 1,
          book: 1,
        },
      },
    ])
    .toArray();
};

export const removeWishlist = async (id, userId) => {
  const db = getDB();

  return await db.collection("wishlist").deleteOne({
    _id: new ObjectId(id),
    userId,
  });
};