const verifyJWT = (req, res, next) => {
  console.log(" JWT Verified");
  next();
};

export default verifyJWT;