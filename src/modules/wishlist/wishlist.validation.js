import Joi from "joi";

export const wishlistSchema = Joi.object({
  bookId: Joi.string().required(),
});