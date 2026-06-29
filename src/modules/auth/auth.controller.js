import catchAsync from "../../utils/catchAsync.js";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
export const loginController = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }
  return res.json(new ApiResponse(200, { email }, "Login successful"));
});

export const googleLoginController = catchAsync(async (req, res) => {
  const { firebaseUser } = req;
  if (!firebaseUser) throw new ApiError(400, "No Firebase user found");

  return res.json(new ApiResponse(200, firebaseUser, "Google login successful"));
});