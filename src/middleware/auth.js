import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

const auth = (req, res, next) => {
  console.log("Headers:", req.headers);

  const authHeader = req.headers.authorization;

  console.log("Authorization:", authHeader);

  if (!authHeader) {
    return next(new ApiError(401, "Authorization header missing"));
  }

  if (!authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "Bearer token missing"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded User:", decoded);

    req.user = decoded;

    next();
  }catch (err) {
  console.log("JWT ERROR:");
  console.log(err.name);
  console.log(err.message);

  return next(new ApiError(401, "Invalid Token"));
}
};

export default auth;