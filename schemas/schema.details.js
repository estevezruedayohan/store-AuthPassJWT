const Joi = require('joi');

const id = Joi.number().integer().positive();
const orderId = Joi.number().integer().positive();
const productId = Joi.number().integer().positive();
const amount = Joi.number().integer().positive();

const createItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

const updateItemSchema = Joi.object({
  id: id,
  amount: amount.required(),
});

const DeleteItemSchema = Joi.object({
  id: id,
});

module.exports = {
  createItemSchema,
  updateItemSchema,
  DeleteItemSchema,
};
