import catchAsync from "../../utils/catchAsync.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
} from "./book.service.js";
export const createBookController = catchAsync(async (req, res) => {
  const book = await createBook(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      book,
      "Book Created Successfully"
    )
  );
});
export const getBooksController = catchAsync(async (req, res) => {
  const books = await getAllBooks();

  return res.json(
    new ApiResponse(
      200,
      books,
      "Books fetched successfully"
    )
  );
});

export const getBookController = catchAsync(async (req, res) => {
  const book = await getSingleBook(req.params.id);

  return res.json(
    new ApiResponse(
      200,
      book,
      "Book fetched successfully"
    )
  );
});

export const updateBookController = catchAsync(async (req, res) => {
  const book = await updateBook(req.params.id, req.body);

  return res.json(
    new ApiResponse(
      200,
      book,
      "Book Updated Successfully"
    )
  );
});

export const deleteBookController = catchAsync(async (req, res) => {
  await deleteBook(req.params.id);

  return res.json(
    new ApiResponse(
      200,
      null,
      "Book Deleted Successfully"
    )
  );
});