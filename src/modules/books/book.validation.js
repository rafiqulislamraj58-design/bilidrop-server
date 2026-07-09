import Joi from "joi";

export const createBookSchema = Joi.object({
  title: Joi.string().required(),

  author: Joi.string().required(),

  category: Joi.string().required(),

  description: Joi.string().allow("").optional(),

  isbn: Joi.string().allow("").optional(),

  language: Joi.string().allow("").optional(),

  price: Joi.number().positive().required(),

  stock: Joi.number().integer().min(0).required(),

  totalCopies: Joi.number().integer().min(0).optional(),

  availableCopies: Joi.number().integer().min(0).optional(),

  coverImage: Joi.string().allow("").optional(),

  pdfUrl: Joi.string().allow("").optional(),

  publishedYear: Joi.number().integer().optional(),

  publisher: Joi.string().allow("").optional(),

  status: Joi.string()
    .valid("available", "unavailable")
    .optional(),
});