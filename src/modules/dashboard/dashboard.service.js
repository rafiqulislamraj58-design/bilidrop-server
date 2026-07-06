import { getDB } from "../../config/database.js";

export const getDashboardStats = async () => {
  const db = getDB();

  const totalUsers = await db.collection("users").countDocuments();

  const totalBooks = await db.collection("books").countDocuments();

  const totalBorrows = await db.collection("borrows").countDocuments();

  const totalReturned = await db.collection("borrows").countDocuments({
    status: "returned",
  });

  const activeBorrows = await db.collection("borrows").countDocuments({
    status: "borrowed",
  });

  const totalWishlist = await db.collection("wishlist").countDocuments();

  const totalReviews = await db.collection("reviews").countDocuments();

  return {
    totalUsers,
    totalBooks,
    totalBorrows,
    totalReturned,
    activeBorrows,
    totalWishlist,
    totalReviews,
  };
};

export const getMostBorrowedBooks = async () => {
  const db = getDB();

  return await db.collection("borrows").aggregate([
    {
      $group: {
        _id: "$bookId",
        totalBorrowed: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        totalBorrowed: -1,
      },
    },
    {
      $limit: 5,
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "book",
      },
    },
    {
      $unwind: "$book",
    },
    {
      $project: {
        _id: 0,
        totalBorrowed: 1,
        title: "$book.title",
        author: "$book.author",
        category: "$book.category",
      },
    },
  ]).toArray();
};