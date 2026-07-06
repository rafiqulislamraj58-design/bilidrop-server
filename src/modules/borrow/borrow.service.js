import { ObjectId } from "mongodb";
import { getDB } from "../../config/database.js";

export const borrowBook = async (userId, bookId) => {
  const db = getDB();

  const book = await db.collection("books").findOne({
    _id: new ObjectId(bookId),
  });

  if (!book) {
    throw new Error("Book not found");
  }

  if (book.stock <= 0) {
    throw new Error("Book Out of Stock");
  }

  await db.collection("books").updateOne(
    {
      _id: new ObjectId(bookId),
    },
    {
      $inc: {
        stock: -1,
      },
    }
  );

  const borrowDate = new Date();

  const dueDate = new Date(
    borrowDate.getTime() + 7 * 24 * 60 * 60 * 1000
  );

  const borrow = {
    userId: new ObjectId(userId),
    bookId: new ObjectId(bookId),

    borrowDate,
    dueDate,

    returnDate: null,
    fine: 0,

    status: "borrowed",
  };

  const result = await db
    .collection("borrows")
    .insertOne(borrow);

  return {
    _id: result.insertedId,
    ...borrow,
  };
};

export const myBorrowedBooks = async (userId) => {
  const db = getDB();

  return await db
    .collection("borrows")
    .find({
      userId: new ObjectId(userId),
    })
    .toArray();
};

export const returnBook = async (borrowId) => {
  const db = getDB();

  const borrow = await db.collection("borrows").findOne({
    _id: new ObjectId(borrowId),
  });

  if (!borrow) {
    throw new Error("Borrow record not found");
  }

  if (borrow.status === "returned") {
    throw new Error("Book already returned");
  }

  const today = new Date();

  let fine = 0;

  if (today > borrow.dueDate) {
    const lateDays = Math.ceil(
      (today.getTime() - new Date(borrow.dueDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    fine = lateDays * 10;
  }

  await db.collection("borrows").updateOne(
    {
      _id: new ObjectId(borrowId),
    },
    {
      $set: {
        status: "returned",
        returnDate: today,
        fine,
      },
    }
  );


  await db.collection("books").updateOne(
    {
      _id: borrow.bookId,
    },
    {
      $inc: {
        stock: 1,
      },
    }
  );

  return await db.collection("borrows").findOne({
    _id: new ObjectId(borrowId),
  });
};