import bcrypt from "bcryptjs";
import { getDB } from "../../config/database.js";

export const registerUser = async (userData) => {
  const db = getDB();

  const existingUser = await db.collection("users").findOne({
    email: userData.email,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = {
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    role: "user",
    createdAt: new Date(),
  };

  const result = await db.collection("users").insertOne(user);

  return {
    id: result.insertedId,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export const loginUser = async (email, password) => {
  const db = getDB();

  const user = await db.collection("users").findOne({
    email,
  });

  if (!user) {
    throw new Error("Invalid Email or Password");
  }

  const matched = await bcrypt.compare(
    password,
    user.password
  );

  if (!matched) {
    throw new Error("Invalid Email or Password");
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};