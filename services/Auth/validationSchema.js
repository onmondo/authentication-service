const Joi = require('@hapi/joi');

const MOBILE_DIGITS = process.env.MOBILE_DIGITS;
const OTP_DIGIT = process.env.OTP_DIGIT;

const mobileDigits = parseInt(MOBILE_DIGITS);
const otpDigit = parseInt(OTP_DIGIT);

const generateOTPValidation = Joi.object({
  appname: Joi.string().required(),
  mobile: Joi.string().min(mobileDigits).max(mobileDigits).required(),
});

const verifyOTPValidation = Joi.object({
  mobile: Joi.string().min(mobileDigits).max(mobileDigits).required(),
  otp: Joi.string().min(otpDigit).max(otpDigit).required(),
});

module.exports = {
  generateOTPValidation,
  verifyOTPValidation
};
