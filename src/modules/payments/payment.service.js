import Stripe from "stripe";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { getDB } from "../../config/database.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (amount) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(amount) * 100,
    currency: "usd",
    payment_method_types: ["card"],
  });

  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  };
};

export const savePayment = async (userId, payload) => {
  const db = getDB();

  console.log("========== SERVICE ==========");
  console.log("Payload =>", payload);

  if (!payload.paymentIntentId) {
    throw new Error("paymentIntentId is required");
  }

  if (!payload.transactionId) {
    throw new Error("transactionId is required");
  }

  if (!payload.amount) {
    throw new Error("amount is required");
  }

  const payment = {
    userId: new ObjectId(userId),
    paymentIntentId: payload.paymentIntentId,
    transactionId: payload.transactionId,
    amount: Number(payload.amount),
    status: "paid",
    createdAt: new Date(),
  };

  console.log("Payment Object =>", payment);

  const result = await db
    .collection("payments")
    .insertOne(payment);

  return {
    _id: result.insertedId,
    ...payment,
  };
};

export const myPayments = async (userId) => {
  const db = getDB();

  return await db
    .collection("payments")
    .find({
      userId: new ObjectId(userId),
    })
    .sort({ createdAt: -1 })
    .toArray();
};

export const allPayments = async () => {
  const db = getDB();

  return await db
    .collection("payments")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
};