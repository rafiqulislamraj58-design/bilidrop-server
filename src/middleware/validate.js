const validate = (schema) => {
  return (req, res, next) => {
    next();
  };
};

export default validate;