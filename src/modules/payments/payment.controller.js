import catchAsync from "../../utils/catchAsync.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
  createPaymentIntent,
  savePayment,
  myPayments,
  allPayments,
} from "./payment.service.js";

export const paymentIntentController = catchAsync(async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    throw new Error("Amount is required");
  }

  const payment = await createPaymentIntent(amount);

  return res.json(
    new ApiResponse(
      200,
      payment,
      "Payment Intent Created Successfully"
    )
  );
});

export const savePaymentController = catchAsync(async (req, res) => {
  console.log("========== SAVE PAYMENT ==========");
  console.log("User =>", req.user);
  console.log("Body =>", req.body);

  const payment = await savePayment(req.user.id, req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      payment,
      "Payment Saved Successfully"
    )
  );
});

export const myPaymentsController = catchAsync(async (req, res) => {
  const payments = await myPayments(req.user.id);

  return res.json(
    new ApiResponse(
      200,
      payments,
      "My Payments Fetched Successfully"
    )
  );
});

export const allPaymentsController = catchAsync(async (req, res) => {
  const payments = await allPayments();

  return res.json(
    new ApiResponse(
      200,
      payments,
      "All Payments Fetched Successfully"
    )
  );
});