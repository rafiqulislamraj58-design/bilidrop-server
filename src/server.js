import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app.js";
import { connectDB, closeDB } from "./config/database.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.clear();
    console.log(" Starting BiblioDrop Server...");

    await connectDB();

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(` Server Running`);
      console.log(` http://localhost:${PORT}`);
      console.log(` Environment : ${process.env.NODE_ENV}`);
    });

    const shutdown = async () => {
      console.log("\n Shutting down server...");

      await closeDB();

      server.close(() => {
        console.log(" Server Closed");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);

  } catch (error) {
    console.error(" Failed to Start Server");
    console.error(error);
    process.exit(1);
  }
};

startServer();