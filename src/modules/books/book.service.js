import { ObjectId } from "mongodb";
import { getDB } from "../../config/database.js";


export const createBook = async (bookData) => {
  const db = getDB();

  const book = {
    title: bookData.title,
    author: bookData.author,
    category: bookData.category,

    description: bookData.description || "",

    isbn: bookData.isbn || "",

    language: bookData.language || "",

    price: bookData.price,

    stock: bookData.stock,

    totalCopies: bookData.totalCopies || bookData.stock,

    availableCopies:
      bookData.availableCopies || bookData.stock,

    coverImage: bookData.coverImage || "",

    pdfUrl: bookData.pdfUrl || "",

    publishedYear: bookData.publishedYear || null,

    publisher: bookData.publisher || "",

    status: bookData.status || "available",

    createdAt: new Date(),

    updatedAt: new Date(),
  };

  const result = await db.collection("books").insertOne(book);

  return {
    _id: result.insertedId,
    ...book,
  };
};
export const getAllBooks = async (query = {}) => {
  const db = getDB();

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};

  if (query.search) {
    filter.title = {
      $regex: query.search,
      $options: "i",
    };
  }

  if (query.category) {
    filter.category = query.category;
  }

  let sort = {
    createdAt: -1,
  };

  if (query.sort) {
    if (query.sort.startsWith("-")) {
      sort = {
        [query.sort.substring(1)]: -1,
      };
    } else {
      sort = {
        [query.sort]: 1,
      };
    }
  }

  const books = await db
    .collection("books")
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .toArray();

  const total = await db
    .collection("books")
    .countDocuments(filter);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    books,
  };
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