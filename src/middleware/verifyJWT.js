import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";

dotenv.config();

const verifyJWT = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.cookies?.token;

  if (!authHeader) {
    throw new ApiError(401, "No JWT token provided");
  }
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired JWT token");
  }
});

export default verifyJWT;