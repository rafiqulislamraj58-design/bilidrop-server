import Joi from "joi";

export const createBookSchema = Joi.object({
  title: Joi.string().required(),

  author: Joi.string().required(),

  category: Joi.string().required(),

  price: Joi.number().positive().required(),

  stock: Joi.number().integer().min(0).required(),
});