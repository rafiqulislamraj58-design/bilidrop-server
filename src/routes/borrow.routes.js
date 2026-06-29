import express from "express";
import {
  borrowBook,
  getBorrowings,
  returnBook,
  renewBook,
} from "../modules/borrow/borrow.controller.js";

const router = express.Router();

router.post("/", borrowBook);
router.get("/:userId", getBorrowings);
router.patch("/return/:id", returnBook);
router.patch("/renew/:id", renewBook);

export default router;
