const Joi = require('joi');

const id = Joi.number().integer().positive();
const customerId = Joi.number().integer().positive();
const state = Joi.string();

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

const updateOrderSchema = Joi.object({
  customerId: customerId,
  state: state,
});

const readOrderSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createOrderSchema,
  updateOrderSchema,
  readOrderSchema,
};
