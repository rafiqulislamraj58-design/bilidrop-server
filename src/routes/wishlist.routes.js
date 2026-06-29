import express from "express";
import { addWishlist, getWishlist, removeWishlist } from "../modules/wishlist/wishlist.controller.js";

const router = express.Router();

router.post("/", addWishlist);
router.get("/:userId", getWishlist);
router.delete("/:id", removeWishlist);

export default router;
