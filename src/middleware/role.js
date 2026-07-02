const role = (...roles) => {
  return (req, res, next) => {
    console.log(" Role:", roles);
    next();
  };
};

export default role;