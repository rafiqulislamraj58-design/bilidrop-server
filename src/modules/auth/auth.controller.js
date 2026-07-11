import catchAsync from "../../utils/catchAsync.js";
import ApiResponse from "../../utils/ApiResponse.js";
import generateToken from "../../utils/generateToken.js";

import {
  registerUser,
  loginUser,
  syncUser,
} from "./auth.service.js";

export const register = catchAsync(async (req, res) => {
  console.log("========== REGISTER ==========");
  console.log(req.body);

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, Email and Password are required",
    });
  }

  const user = await registerUser(req.body);

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
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
  console.log("========== LOGIN ==========");
  console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and Password are required",
    });
  }

  const user = await loginUser(email, password);

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
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


export const syncUserController = catchAsync(async (req, res) => {
  const { name, email, photoURL, role } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  const user = await syncUser({
    name,
    email,
    photoURL,
    role,
  });

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.json(
    new ApiResponse(
      200,
      {
        user,
        token,
      },
      "User Synced Successfully"
    )
  );
});

export const generateBackendToken = catchAsync(async (req, res) => {
  const { id, email, role } = req.body;

  if (!id || !email) {
    return res.status(400).json({
      success: false,
      message: "ID and Email are required",
    });
  }

  const token = generateToken({
    id,
    email,
    role: role || "user",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.json(
    new ApiResponse(
      200,
      {
        token,
        user: {
          id,
          email,
          role: role || "user",
        },
      },
      "Backend JWT Generated Successfully"
    )
  );
});

export const profile = catchAsync(async (req, res) => {
  return res.json(
    new ApiResponse(
      200,
      req.user,
      "Profile Loaded Successfully"
    )
  );
});

export const logout = catchAsync(async (req, res) => {
  res.clearCookie("token");

  return res.json(
    new ApiResponse(
      200,
      null,
      "Logout Successful"
    )
  );
});