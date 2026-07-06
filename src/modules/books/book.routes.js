import { Router } from "express";

import auth from "../../middleware/auth.js";
import role from "../../middleware/role.js";
import validateRequest from "../../middleware/validateRequest.js";
import { createBookSchema } from "./book.validation.js";

import {
  createBookController,
  getBooksController,
  getBookController,
  updateBookController,
  deleteBookController,
} from "./book.controller.js";

const router = Router();

router.get("/", getBooksController);


router.get("/:id", getBookController);


router.post(
  "/",
  auth,
  role("admin"),
  validateRequest(createBookSchema),
  createBookController
);
router.patch(
  "/:id",
  auth,
  role("admin"),
  updateBookController
);

router.delete(
  "/:id",
  auth,
  role("admin"),
  deleteBookController
);

export default router;