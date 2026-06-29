import Joi from "joi";

export const createBookSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  author: Joi.string().min(2).max(50).required(),
  category: Joi.string().min(2).max(30).required(),
});

export const updateBookSchema = Joi.object({
  title: Joi.string().min(2).max(100),
  author: Joi.string().min(2).max(50),
  category: Joi.string().min(2).max(30),
});