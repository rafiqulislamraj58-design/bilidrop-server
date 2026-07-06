import catchAsync from "../../utils/catchAsync.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
  borrowBook,
  myBorrowedBooks,
  returnBook,
} from "./borrow.service.js";

export const borrowBookController = catchAsync(async (req, res) => {
  const borrow = await borrowBook(
    req.user.id,
    req.body.bookId
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      borrow,
      "Book Borrowed Successfully"
    )
  );
});

export const myBorrowedBooksController = catchAsync(async (req, res) => {
  const books = await myBorrowedBooks(req.user.id);

  return res.json(
    new ApiResponse(
      200,
      books,
      "Borrowed Books Fetched Successfully"
    )
  );
});

export const returnBookController = catchAsync(async (req, res) => {
  const book = await returnBook(req.params.id);

  return res.json(
    new ApiResponse(
      200,
      book,
      "Book Returned Successfully"
    )
  );
});