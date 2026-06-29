import ApiError from "../utils/ApiError.js";

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    throw new ApiError(400, error.details.map((d) => d.message).join(", "));
  }

  next();
};
ok