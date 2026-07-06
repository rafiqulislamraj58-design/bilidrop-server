import catchAsync from "../../utils/catchAsync.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
  getDashboardStats,
  getMostBorrowedBooks,
} from "./dashboard.service.js";

export const dashboardController = catchAsync(async (req, res) => {
  const stats = await getDashboardStats();

  return res.json(
    new ApiResponse(
      200,
      stats,
      "Dashboard fetched successfully"
    )
  );
});

export const mostBorrowedBooksController = catchAsync(async (req, res) => {
  const books = await getMostBorrowedBooks();

  return res.json(
    new ApiResponse(
      200,
      books,
      "Most Borrowed Books"
    )
  );
});