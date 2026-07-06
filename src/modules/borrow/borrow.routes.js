import { Router } from "express";

import auth from "../../middleware/auth.js";

import {
  borrowBookController,
  myBorrowedBooksController,
  returnBookController,
} from "./borrow.controller.js";

const router = Router();

router.post("/", auth, borrowBookController);

router.get("/my-books", auth, myBorrowedBooksController);

router.patch("/:id/return", auth, returnBookController);

export default router;