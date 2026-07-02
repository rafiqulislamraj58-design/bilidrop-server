import dotenv from "dotenv";
dotenv.config();

import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

let client = null;
let db = null;

export const connectDB = async () => {
  try {
    if (!uri) {
      console.warn(" MONGODB_URI not found.");
      console.warn(" Running without database.");
      return;
    }

    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    console.log(" Connecting to MongoDB...");

    await client.connect();

    db = client.db("bibliodrop");

    await db.command({ ping: 1 });

    console.log(" MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed");
    console.error(error.message);

    client = null;
    db = null;
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error("Database is not connected.");
  }

  return db;
};

export const closeDB = async () => {
  if (!client) return;

  await client.close();

  console.log(" MongoDB Connection Closed");
};