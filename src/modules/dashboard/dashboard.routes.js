import { Router } from "express";

import auth from "../../middleware/auth.js";
import role from "../../middleware/role.js";

import {
  dashboardController,
  mostBorrowedBooksController,
} from "./dashboard.controller.js";

const router = Router();

router.get(
  "/",
  auth,
  role("admin"),
  dashboardController
);

router.get(
  "/most-borrowed",
  auth,
  role("admin"),
  mostBorrowedBooksController
);

export default router;