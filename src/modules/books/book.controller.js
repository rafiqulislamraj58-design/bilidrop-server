
import { getDB } from "../../config/database.js";
import catchAsync from "../../utils/catchAsync.js";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import { ObjectId } from "mongodb";

export const createBook = catchAsync(async (req, res) => {
  const db = getDB();
  const { title, author, category } = req.body;

  if (!title || !author) throw new ApiError(400, "Title and author required");

  const result = await db.collection("books").insertOne({ title, author, category, createdAt: new Date() });
  return res.json(new ApiResponse(201, result, "Book created"));
});
export const getBooks = catchAsync(async (req, res) => {
  const db = getDB();
  const books = await db.collection("books").find().toArray();
  return res.json(new ApiResponse(200, books, "Books fetched"));
});
export const getBookById = catchAsync(async (req, res) => {
  const db = getDB();
  const { id } = req.params;
  const book = await db.collection("books").findOne({ _id: new ObjectId(id) });
  if (!book) throw new ApiError(404, "Book not found");
  return res.json(new ApiResponse(200, book, "Book fetched"));
});
export const updateBook = catchAsync(async (req, res) => {
  const db = getDB();
  const { id } = req.params;
  const update = req.body;

  const result = await db.collection("books").updateOne({ _id: new ObjectId(id) }, { $set: update });
  if (!result.matchedCount) throw new ApiError(404, "Book not found");
  return res.json(new ApiResponse(200, result, "Book updated"));
});
export const deleteBook = catchAsync(async (req, res) => {
  const db = getDB();
  const { id } = req.params;

  const result = await db.collection("books").deleteOne({ _id: new ObjectId(id) });
  if (!result.deletedCount) throw new ApiError(404, "Book not found");
  return res.json(new ApiResponse(200, result, "Book deleted"));
});
