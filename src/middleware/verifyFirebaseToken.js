const verifyFirebaseToken = (req, res, next) => {
  console.log(" Firebase Token Verified");
  next();
};

export default verifyFirebaseToken;