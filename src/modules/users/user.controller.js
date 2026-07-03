import catchAsync from "../../utils/catchAsync.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} from "./user.service.js";

export const getUsers = catchAsync(async (req, res) => {
  const users = await getAllUsers();

  return res.json(
    new ApiResponse(
      200,
      users,
      "Users fetched successfully"
    )
  );
});

export const getUser = catchAsync(async (req, res) => {
  const user = await getSingleUser(req.params.id);

  return res.json(
    new ApiResponse(
      200,
      user,
      "User fetched successfully"
    )
  );
});

export const updateUserController = catchAsync(async (req, res) => {
  const user = await updateUser(
    req.params.id,
    req.body
  );

  return res.json(
    new ApiResponse(
      200,
      user,
      "User updated successfully"
    )
  );
});

export const deleteUserController = catchAsync(async (req, res) => {
  await deleteUser(req.params.id);

  return res.json(
    new ApiResponse(
      200,
      null,
      "User deleted successfully"
    )
  );
});