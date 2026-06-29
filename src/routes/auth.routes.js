
import express from "express";
import { loginController, googleLoginController } from "../modules/auth/auth.controller.js";

const router = express.Router();
router.post("/login", loginController);

router.post("/google", googleLoginController);

export default router;
