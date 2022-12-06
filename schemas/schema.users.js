const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(5);
const rol = Joi.string().min(3);
const isBlock = Joi.boolean();

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  rol: rol.required(),
});

const updateUserSchema = Joi.object({
  email: email,
  password: password,
  rol: rol,
  isBlock: isBlock,
});

const readUserByIdSchema = Joi.object({
  id: id.required(),
});

const readUserByEmailSchema = Joi.object({
  email: email.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  readUserByIdSchema,
  readUserByEmailSchema,
};
