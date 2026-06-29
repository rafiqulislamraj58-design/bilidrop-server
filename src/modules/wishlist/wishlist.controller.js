import catchAsync from "../../utils/catchAsync.js";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import { addWishlistService, getWishlistService, removeWishlistService } from "./wishlist.services.js";
export const addWishlist = catchAsync(async (req, res) => {
  const { userId, bookId } = req.body;
  if (!userId || !bookId) throw new ApiError(400, "userId and bookId required");

  const result = await addWishlistService(userId, bookId);
  return res.json(new ApiResponse(201, result, "Book added to wishlist"));
});
export const getWishlist = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await getWishlistService(userId);
  return res.json(new ApiResponse(200, result, "Wishlist fetched"));
});
export const removeWishlist = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await removeWishlistService(id);
  if (!result.deletedCount) throw new ApiError(404, "Wishlist item not found");
  return res.json(new ApiResponse(200, result, "Wishlist item removed"));
});
