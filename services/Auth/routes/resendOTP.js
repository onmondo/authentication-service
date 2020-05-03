const isEmpty = require('lodash/isEmpty');
const morgan = require('morgan');
const dbClient = require('@utils/dbConnection');
const catchAsyncError = require('@utils/catchAsyncError');
const {getKey, deleteKeys} = require('../methods');
const ServiceError = require('@utils/ServiceError');

const resendOTP = catchAsyncError(async (req, _res, next) => {

  const {mobile} = req.body;

  morgan.token('process', () => `Resend OTP for mobile ${mobile}`);

  const isMobileExist = await getKey(dbClient, {key: mobile});

  if (isEmpty(isMobileExist)) {
    const errorMessage = `This mobile ${mobile} does not exist. Please request new OTP.`;
    morgan.token('process', () => errorMessage);
    return next(
      new ServiceError(
        errorMessage, 
        `${process.env.PREFIX_ERROR_CODE_FAIL}-OTPR02`,
        400)
      );
  }

  const deleteExistingOTPResponse = await deleteKeys(dbClient, {keys: [mobile]});
  
  if (deleteExistingOTPResponse !== 1) {
    const errorMessage = `Something went wrong. Mobile ${mobile} requested resend OTP failed. Please try again.`;
    morgan.token('process', () => errorMessage);
    return next(
      new ServiceError(
        errorMessage,
        `${process.env.PREFIX_ERROR_CODE_ERROR}-OTPR01`,
        500)
      );
  }

  // modify request body to the next api
  req.body = {...req.body, mobile};

  return next();
});

module.exports = resendOTP;