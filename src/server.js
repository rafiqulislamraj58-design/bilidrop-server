

import dotenv from "dotenv";
import http from "http";
import app from "./app.js";
import { connectDB } from "./config/database.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
    process.on("SIGINT", async () => {
      console.log(" Shutting down server...");
      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error(" Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
