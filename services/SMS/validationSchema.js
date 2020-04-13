const Joi = require('@hapi/joi');
const MOBILE_DIGITS = process.env.MOBILE_DIGITS;
const MESSAGE_LIMIT = process.env.MESSAGE_LIMIT;

const mobileDigits = parseInt(MOBILE_DIGITS);
const messageLimit = parseInt(MESSAGE_LIMIT);

const sendSMSValidation = Joi.object({
  mobile: Joi.string().min(mobileDigits).max(mobileDigits).required(),
  message: Joi.string().max(messageLimit).required(),
});

module.exports = {
  sendSMSValidation
};
