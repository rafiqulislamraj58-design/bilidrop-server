import catchAsync from "../../utils/catchAsync.js";
import ApiResponse from "../../utils/ApiResponse.js";
import generateToken from "../../utils/generateToken.js";

import {
  registerUser,
  loginUser,
} from "./auth.service.js";

export const register = catchAsync(async (req, res) => {
  const user = await registerUser(req.body);

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        user,
        token,
      },
      "Registration Successful"
    )
  );
});

export const login = catchAsync(async (req, res) => {
  const user = await loginUser(
    req.body.email,
    req.body.password
  );

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return res.json(
    new ApiResponse(
      200,
      {
        user,
        token,
      },
      "Login Successful"
    )
  );
});

export const profile = catchAsync(async (req, res) => {
  return res.json(
    new ApiResponse(
      200,
      req.user,
      "Profile Loaded"
    )
  );
});

export const logout = catchAsync(async (req, res) => {
  return res.json(
    new ApiResponse(
      200,
      null,
      "Logout Successful"
    )
  );
});