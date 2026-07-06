import catchAsync from "../../utils/catchAsync.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
  addWishlist,
  getWishlist,
  removeWishlist,
} from "./wishlist.service.js";

export const addWishlistController = catchAsync(async (req, res) => {
  const wishlist = await addWishlist(
    req.user.id,
    req.body.bookId
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      wishlist,
      "Book added to wishlist"
    )
  );
});

export const getWishlistController = catchAsync(async (req, res) => {
  const wishlist = await getWishlist(req.user.id);

  return res.json(
    new ApiResponse(
      200,
      wishlist,
      "Wishlist fetched successfully"
    )
  );
});

export const removeWishlistController = catchAsync(async (req, res) => {
  await removeWishlist(
    req.params.id,
    req.user.id
  );

  return res.json(
    new ApiResponse(
      200,
      null,
      "Wishlist item removed"
    )
  );
});