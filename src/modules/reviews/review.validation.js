import Joi from "joi";

export const createReviewSchema = Joi.object({
  bookId: Joi.string().required(),

  rating: Joi.number().min(1).max(5).required(),

  comment: Joi.string().min(5).max(500).required(),
});