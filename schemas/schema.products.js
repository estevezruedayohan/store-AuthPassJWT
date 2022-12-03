const Joi = require('joi');

const id = Joi.number().integer().positive();
const name = Joi.string().min(5).max(45);
const description = Joi.string().min(10).max(100);
const price = Joi.number().positive().integer().min(5);
const image = Joi.string().uri().min(10);
const isBlock = Joi.boolean();
const categoryId = Joi.number().integer().positive();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  description: description,
  price: price,
  image: image,
  isBlock: isBlock,
  categoryId: categoryId,
});

const readProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when('price_min', {
    is: Joi.number().integer().required(),
    then: Joi.required(),
  }),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  readProductSchema,
  queryProductSchema,
};
