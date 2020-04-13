const isEmpty = require('lodash/isEmpty');
const morgan = require('morgan');
const dbClient = require('../../../utils/dbConnection');
const catchAsyncError = require('../../../utils/catchAsyncError');
const {
  zcountMembers,
  zaddMember,
  setKeyAndExpire,
  getKey, 
  deleteKeys,
  getTTL
} = require('../methods');
const ServiceError = require('../../../utils/ServiceError');
const otpRetry = process.env.OTP_RETRY;
const otpMax = parseInt(process.env.OTP_MAX);

const verifyOTP = catchAsyncError(async (req, res, next) => {

  const {mobile, otp} = req.body;

  // zcount here...
  // key [mobile]:[otp]
  // if count >= 3 return error and setex blocked:[mobile] = [otp]
  const otpEntryCount = await zcountMembers(dbClient, {keySet: `otp:${mobile}`});

  if(otpEntryCount >= otpMax) {
    const blockMobileResponse = await setKeyAndExpire(dbClient, {
        key: `blocked:${mobile}`,
        expire: parseInt(otpRetry),
        value: `${otp}`
      } 
    );
    
    const timeRemaining = await getTTL(dbClient, {key: `blocked:${mobile}` });

    if (blockMobileResponse !== 'OK') {
      return next(
        new ServiceError(
          `Something went wrong. Mobile ${mobile} with OTP ${otp} has not persisted. Please try again.`, 
          `${process.env.PREFIX_ERROR_CODE_ERROR}-OTPV01`,
          500)
        );
    }

    const errorMessage = `Your mobile ${mobile} has been blocked. Please wait for another 5min and try again.`;
    morgan.token('process', () => errorMessage);

    return next(
      new ServiceError(
        errorMessage, 
        `${process.env.PREFIX_ERROR_CODE_FAIL}-BLOCKED401`,
        401,
        {mobile, blocked: timeRemaining, otp})
      );
  }

  // check if otp match
  const existingOTP = await getKey(dbClient, {key: mobile});

  if (isEmpty(existingOTP)) {
    const errorMessage = `OTP entered already expired for mobile ${mobile}. Please request another OTP.`;
    morgan.token('process', () => errorMessage);    
    return next(
      new ServiceError(
        errorMessage,
        `${process.env.PREFIX_ERROR_CODE_FAIL}-OTPV02`,
        400)
      );
  }

  if (otp !== existingOTP) {
    // zadd here
    const timestamp = Date.now();
    const countOTPEntry = await zaddMember(dbClient, {
      keySet: `otp:${mobile}`,
      timestamp,
      value: `${otpEntryCount}|${otp}|${timestamp}`});

    const errorMessage = `OTP entered does not match for mobile ${mobile}. Please try again.`;
    morgan.token('process', () => errorMessage);    

    return next(
      new ServiceError(
        errorMessage, 
        `${process.env.PREFIX_ERROR_CODE_FAIL}-OTPV03`,
        400)
      );    
  }

  const deleteExistingOTPResponse = await deleteKeys(dbClient, {keys: [mobile]});
  console.log('deleteExistingOTPResponse', deleteExistingOTPResponse);

  req.body = {mobile};

  morgan.token('process', () => `OTP verified for mobile ${mobile}`);

  return next();
});

module.exports = verifyOTP;