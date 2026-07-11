import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

const auth = (req, res, next) => {
  let token = null;

  if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;

    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) {
    return next(new ApiError(401, "Unauthorized"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);

    return next(new ApiError(401, "Invalid Token"));
  }
};

export default auth;