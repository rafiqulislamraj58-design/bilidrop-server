
import { getDB } from "../../config/database.js";
import catchAsync from "../../utils/catchAsync.js";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
export const createUser = catchAsync(async (req, res) => {
  const db = getDB();
  const { name, email } = req.body;

  if (!name || !email) throw new ApiError(400, "Name and email required");

  const result = await db.collection("users").insertOne({ name, email, createdAt: new Date() });
  return res.json(new ApiResponse(201, result, "User created"));
});
export const getUsers = catchAsync(async (req, res) => {
  const db = getDB();
  const users = await db.collection("users").find().toArray();
  return res.json(new ApiResponse(200, users, "Users fetched"));
});
export const getUserById = catchAsync(async (req, res) => {
  const db = getDB();
  const { id } = req.params;
  const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
  if (!user) throw new ApiError(404, "User not found");
  return res.json(new ApiResponse(200, user, "User fetched"));
});
export const updateUser = catchAsync(async (req, res) => {
  const db = getDB();
  const { id } = req.params;
  const update = req.body;

  const result = await db.collection("users").updateOne({ _id: new ObjectId(id) }, { $set: update });
  if (!result.matchedCount) throw new ApiError(404, "User not found");
  return res.json(new ApiResponse(200, result, "User updated"));
});
export const deleteUser = catchAsync(async (req, res) => {
  const db = getDB();
  const { id } = req.params;

  const result = await db.collection("users").deleteOne({ _id: new ObjectId(id) });
  if (!result.deletedCount) throw new ApiError(404, "User not found");
  return res.json(new ApiResponse(200, result, "User deleted"));
});
export const updateUserRole = catchAsync(async (req, res) => {
  const db = getDB();
  const { id } = req.params;
  const { role } = req.body;

  if (!role) throw new ApiError(400, "Role required");

  const result = await db.collection("users").updateOne({ _id: new ObjectId(id) }, { $set: { role } });
  if (!result.matchedCount) throw new ApiError(404, "User not found");
  return res.json(new ApiResponse(200, result, "User role updated"));
});
