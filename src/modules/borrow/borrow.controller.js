import catchAsync from "../../utils/catchAsync.js";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import {
  borrowBookService,
  getBorrowingsService,
  returnBookService,
  renewBookService,
} from "./borrow.services.js";
export const borrowBook = catchAsync(async (req, res) => {
  const { userId, bookId } = req.body;
  if (!userId || !bookId) throw new ApiError(400, "userId and bookId required");

  const result = await borrowBookService(userId, bookId);
  return res.json(new ApiResponse(201, result, "Book borrowed successfully"));
});
export const getBorrowings = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await getBorrowingsService(userId);
  return res.json(new ApiResponse(200, result, "Borrowings fetched"));
});
export const returnBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await returnBookService(id);
  if (!result.matchedCount) throw new ApiError(404, "Borrow record not found");
  return res.json(new ApiResponse(200, result, "Book returned successfully"));
});
export const renewBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { newDueDate } = req.body;
  if (!newDueDate) throw new ApiError(400, "newDueDate required");

  const result = await renewBookService(id, newDueDate);
  if (!result.matchedCount) throw new ApiError(404, "Borrow record not found");
  return res.json(new ApiResponse(200, result, "Book renewed successfully"));
});
