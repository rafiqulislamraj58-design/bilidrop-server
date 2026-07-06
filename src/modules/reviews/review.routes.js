import { Router } from "express";

import auth from "../../middleware/auth.js";
import validateRequest from "../../middleware/validateRequest.js";

import { createReviewSchema } from "./review.validation.js";

import {
  createReviewController,
  getBookReviewsController,
} from "./review.controller.js";

const router = Router();

router.post(
  "/",
  auth,
  validateRequest(createReviewSchema),
  createReviewController
);

router.get(
  "/:bookId",
  getBookReviewsController
);

export default router;