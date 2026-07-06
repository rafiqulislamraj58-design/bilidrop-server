import { Router } from "express";

import auth from "../../middleware/auth.js";

import {
  paymentIntentController,
  savePaymentController,
  myPaymentsController,
  allPaymentsController,
} from "./payment.controller.js";

const router = Router();

router.post(
  "/create-payment-intent",
  auth,
  paymentIntentController
);

router.post(
  "/save",
  auth,
  savePaymentController
);

router.get(
  "/my-payments",
  auth,
  myPaymentsController
);

router.get(
  "/",
  auth,
  allPaymentsController
);

export default router;