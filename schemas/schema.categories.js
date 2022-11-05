const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().max(12);

const createCategorySchema = Joi.object({
  name: name.required(),
});

const updateCategorySchema = Joi.object({
  name: name,
});

const readCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  readCategorySchema,
};
