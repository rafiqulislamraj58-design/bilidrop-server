// src/routes/user.routes.js

import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserRole,
} from "../modules/users/user.controller.js";

const router = express.Router();

// POST /api/users
router.post("/", createUser);

// GET /api/users
router.get("/", getUsers);

// GET /api/users/:id
router.get("/:id", getUserById);

// PATCH /api/users/:id
router.patch("/:id", updateUser);

// DELETE /api/users/:id
router.delete("/:id", deleteUser);

// PATCH /api/users/role/:id
router.patch("/role/:id", updateUserRole);

export default router;
