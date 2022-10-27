const Joi = require('joi');

const id = Joi.string().alphanum();
const name = Joi.string().min(5).max(50);
const password = Joi.string().min(5);
const email = Joi.string().email();
const rol = Joi.string().min(3);
const isBlock = Joi.boolean();

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  rol: rol.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  email: email,
  password: password,
  rol: rol,
  isBlock: isBlock,
});

const deleteUserSchema = Joi.object({
  email: email.required(),
});

const readUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  deleteUserSchema,
  readUserSchema,
};
