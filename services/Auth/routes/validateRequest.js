const isEmpty = require('lodash/isEmpty');
const catchAsyncError = require('@utils/catchAsyncError');
const ServiceError = require('@utils/ServiceError')

const validateRequest = (validationSchema) => {
  return catchAsyncError(async (req, _res, next) => {

    const validationResponse = validationSchema.validate(req.body);

    if (!isEmpty(validationResponse.error)) {
      return next(
        new ServiceError(validationResponse.error, `${process.env.PREFIX_ERROR_CODE_FAIL}-APP400`, 400)
      );
    }

    return next();
  })
};

module.exports = validateRequest