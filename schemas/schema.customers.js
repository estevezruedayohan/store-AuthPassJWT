const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(5).max(50);
const lastName = Joi.string().min(5).max(50);
const phone = Joi.string().max(15);
const userId = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(5);

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
  }),
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  userId: userId,
});

const readCustomerByIdSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  readCustomerByIdSchema,
};
