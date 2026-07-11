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
    photoURL: userData.photoURL || "",
    role: userData.role || "user",
    authProvider: "local",
    createdAt: new Date(),
  };

  const result = await db.collection("users").insertOne(user);

  return {
    id: result.insertedId.toString(),
    name: user.name,
    email: user.email,
    photoURL: user.photoURL,
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

  if (!user.password) {
    throw new Error(
      "This account was created with Better Auth. Please login using Better Auth."
    );
  }

  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    throw new Error("Invalid Email or Password");
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    photoURL: user.photoURL || "",
    role: user.role,
  };
};

export const syncUser = async (userData) => {
  const db = getDB();

  let user = await db.collection("users").findOne({
    email: userData.email,
  });

  if (!user) {
    const newUser = {
      name: userData.name || "",
      email: userData.email,
      photoURL: userData.photoURL || "",
      role: userData.role || "user",
      authProvider: "better-auth",
      createdAt: new Date(),
    };

    const result = await db.collection("users").insertOne(newUser);

    return {
      id: result.insertedId.toString(),
      ...newUser,
    };
  }

  await db.collection("users").updateOne(
    {
      _id: user._id,
    },
    {
      $set: {
        name: userData.name || user.name,
        photoURL: userData.photoURL || user.photoURL || "",
        role: userData.role || user.role,
      },
    }
  );

  return {
    id: user._id.toString(),
    name: userData.name || user.name,
    email: user.email,
    photoURL: userData.photoURL || user.photoURL || "",
    role: userData.role || user.role,
  };
};