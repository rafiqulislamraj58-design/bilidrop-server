import { Router } from "express";

import auth from "../../middleware/auth.js";
import role from "../../middleware/role.js";

import {
  getUsers,
  getUser,
  updateUserController,
  deleteUserController,
} from "./user.controller.js";

const router = Router();
router.get("/", auth, role("admin"), getUsers);
router.get("/:id", auth, role("admin"), getUser);
router.patch("/:id", auth, role("admin"), updateUserController);
router.delete("/:id", auth, role("admin"), deleteUserController);

export default router;