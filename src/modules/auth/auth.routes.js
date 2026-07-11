import { Router } from "express";

import {
  register,
  login,
  profile,
  logout,
  syncUserController,
  generateBackendToken,
} from "./auth.controller.js";

import auth from "../../middleware/auth.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Auth Route Working",
  });
});

router.post("/register", register);
router.post("/login", login);

router.post("/sync-user", syncUserController);
router.post("/generate-token", generateBackendToken);

router.get("/profile", auth, profile);
router.post("/logout", auth, logout);

export default router;