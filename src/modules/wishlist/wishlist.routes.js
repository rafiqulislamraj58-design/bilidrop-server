import { Router } from "express";

import auth from "../../middleware/auth.js";
import validateRequest from "../../middleware/validateRequest.js";

import { wishlistSchema } from "./wishlist.validation.js";

import {
  addWishlistController,
  getWishlistController,
  removeWishlistController,
} from "./wishlist.controller.js";

const router = Router();

router.get(
  "/",
  auth,
  getWishlistController
);

router.post(
  "/",
  auth,
  validateRequest(wishlistSchema),
  addWishlistController
);

router.delete(
  "/:id",
  auth,
  removeWishlistController
);

export default router;