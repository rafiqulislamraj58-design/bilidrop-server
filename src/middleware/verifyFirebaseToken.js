
import admin from "../config/firebaseAdmin.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";

const verifyFirebaseToken = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "No Firebase token provided");
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.firebaseUser = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || decodedToken.email,
      picture: decodedToken.picture || null,
    };

    next();
  } catch (error) {
    throw new ApiError(401, "Invalid Firebase token");
  }
});

export default verifyFirebaseToken;
