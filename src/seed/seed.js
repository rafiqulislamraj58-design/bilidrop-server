import { connectDB, getDB } from "../config/database.js";

const seedData = async () => {
  try {
    const db = getDB();

    // Dummy Users
    const users = [
      { name: "Rafiqul Islam", email: "rafiqul@example.com", role: "admin" },
      { name: "John Doe", email: "john@example.com", role: "user" },
      { name: "Jane Smith", email: "jane@example.com", role: "librarian" },
    ];

    const books = [
      { title: "Clean Code", author: "Robert C. Martin", category: "Programming" },
      { title: "JavaScript: The Good Parts", author: "Douglas Crockford", category: "Programming" },
      { title: "The Pragmatic Programmer", author: "Andrew Hunt", category: "Software Engineering" },
    ];

    await db.collection("users").insertMany(users);
    await db.collection("books").insertMany(books);

    console.log(" Seed data inserted successfully");
    process.exit(0);
  } catch (error) {
    console.error(" Error inserting seed data:", error);
    process.exit(1);
  }
};

connectDB().then(seedData);