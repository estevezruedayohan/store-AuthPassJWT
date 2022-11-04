const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().min(5).max(45);
const price = Joi.number().positive().integer().min(5);
const image = Joi.string().uri().min(10);
const isBlock = Joi.boolean();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  isBlock: isBlock,
});

const deleteProductSchema = Joi.object({
  id: id.required(),
});

const readProductSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
  readProductSchema,
};
