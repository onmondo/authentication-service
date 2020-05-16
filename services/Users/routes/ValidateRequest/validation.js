const Joi = require('@hapi/joi');

module.exports.userValidation = Joi.object({
  firstname: Joi.string().min(3).max(32).required(),
  lastname: Joi.string().min(3).max(32).required(),
  email: Joi.string().email(),
  phone: Joi.string().min(10).max(12).required(),
  password: Joi.string().min(4).max(15).required(),
  confirm: Joi.string().min(4).max(15).required(),
});