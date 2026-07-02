import { MongoClient, ServerApiVersion } from "mongodb";

let client;
let db;

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MONGODB_URI not found.");
    }

    console.log(" Connecting to MongoDB Atlas...");

    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();

    await client.db("admin").command({ ping: 1 });

    db = client.db("bibliodrop");

    console.log(" MongoDB Connected Successfully");
  } catch (error) {
    console.error(" MongoDB Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error("Database is not connected.");
  }

  return db;
};

export const closeDB = async () => {
  if (client) {
    await client.close();
    console.log("🔒 MongoDB Connection Closed");
  }
};