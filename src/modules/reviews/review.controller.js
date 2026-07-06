import catchAsync from "../../utils/catchAsync.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
  createReview,
  getBookReviews,
} from "./review.service.js";

export const createReviewController = catchAsync(async (req, res) => {
  const review = await createReview(req.user, req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      review,
      "Review Added Successfully"
    )
  );
});

export const getBookReviewsController = catchAsync(async (req, res) => {
  const reviews = await getBookReviews(req.params.bookId);

  return res.json(
    new ApiResponse(
      200,
      reviews,
      "Reviews fetched successfully"
    )
  );
});