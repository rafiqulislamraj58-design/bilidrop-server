import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import bookRoutes from "../modules/books/book.routes.js";
import wishlistRoutes from "../modules/wishlist/wishlist.routes.js";
import borrowRoutes from "../modules/borrow/borrow.routes.js";
import reviewRoutes from "../modules/reviews/review.routes.js";
import paymentRoutes from "../modules/payments/payment.routes.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js";
import uploadRoutes from "../modules/upload/upload.routes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running 🚀",
    version: "v1",
  });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/borrow", borrowRoutes);
router.use("/reviews", reviewRoutes);
router.use("/payments", paymentRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/upload", uploadRoutes);

export default router;