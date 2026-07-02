import { Router } from "express";
import {
  register,
  login,
  profile,
  logout,
} from "./auth.controller.js";

import auth from "../../middleware/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", auth, profile);
router.post("/logout", auth, logout);

export default router;