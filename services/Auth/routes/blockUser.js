const isEmpty = require('lodash/isEmpty');
const morgan = require('morgan');
const catchAsyncError = require('@utils/catchAsyncError');
const ServiceError = require('@utils/ServiceError')
const dbClient = require('@utils/redis');
const {getKey, deleteKeys, getTTL} = require('../methods');

const blockUser = (reset) => {
  return catchAsyncError(async (req, _res, next) => {

    const {mobile} = req.body;

    // check if mobile is blocked
    const blockedMobileResponse = await getKey(dbClient, {key: `blocked:${mobile}`});
    
    if(!isEmpty(blockedMobileResponse)) {
      const timeRemaining = await getTTL(dbClient, {key: `blocked:${mobile}` });

      const errorMessage = `Your mobile ${mobile} has been blocked. Please wait for 5 min. and try again.`;
      morgan.token('process', () => errorMessage);
      
      return next(
        new ServiceError(
          errorMessage,
          `${process.env.PREFIX_ERROR_CODE_FAIL}-BLOCKED401`,
          401,
          {mobile, blocked: timeRemaining})
      );    
    }
    
    if(reset){
      // delete keyset
      const resetOTPEntryCount = await deleteKeys(dbClient, {keys: [`otp:${mobile}`]});
      if(resetOTPEntryCount > 0) {
        morgan.token('process', () => `Reset OTP entry count for mobile ${mobile}`);
      }
    }  

    return next();
  })
};

module.exports = blockUser