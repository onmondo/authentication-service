const isEmpty = require('lodash/isEmpty');
const randomize = require('randomatic');
const morgan = require('morgan');
const dbClient = require('@utils/dbConnection');
const catchAsyncError = require('@utils/catchAsyncError');
const {setKeyAndExpire, getKey, getTTL} = require('../methods');
// const {postRequest} = require('../../../utils/sendRequest');
const otpExpire = process.env.OTP_EXPIRE;
const ServiceError = require('@utils/ServiceError');

const generateOTP = catchAsyncError(async (req, _res, next) => {

  const {appname, mobile} = req.body;

  const otp = randomize('0', parseInt(process.env.OTP_DIGIT));

  morgan.token('process', () => `Generated OTP: ${otp}`);

  // check if mobile exist
  const isMobileExist = await getKey(dbClient, {key: mobile});

  if (!isEmpty(isMobileExist)) {
    const errorMessage = `This mobile ${mobile} has OTP set. Please request another OTP.`;
    morgan.token('process', () => errorMessage);
    return next(
      new ServiceError(
        errorMessage,
        `${process.env.PREFIX_ERROR_CODE_FAIL}-OTPG02`,
        400)
      );
  }

  // save OTP to redis - key(mobile #) : value(generated OTP) expires
  // {key, expire, value}
  const saveOTPResponse = await setKeyAndExpire(dbClient, {
    key: mobile,
    expire: parseInt(otpExpire),
    value: `${otp}`
  });

  const timeRemaining = await getTTL(dbClient, {key: mobile });
  
  if (saveOTPResponse !== 'OK') {
    const errorMessage = `Something went wrong. Mobile ${mobile} with OTP ${otp} has not persisted. Please try again.`;
    morgan.token('process', () => errorMessage);
    return next(
      new ServiceError(
        errorMessage, 
        `${process.env.PREFIX_ERROR_CODE_ERROR}-OTPG01`,
        500)
      );
  }

  // modify request body to the next api
  req.body = {...req.body, expire: timeRemaining, otp: `${otp}`, statusCode: 201};

  return next();
});

module.exports = generateOTP;