const Router = require('express').Router();
const validateRequest = require('./routes/validateRequest');
const assignID = require('./routes/assignID');
const blockUser = require('./routes/blockUser');
const generateOTP = require('./routes/generateOTP');
const resendOTP = require('./routes/resendOTP');
const verifyOTP = require('./routes/verifyOTP');
const sendSMS = require('./routes/sendSMS');

const {generateOTPValidation, verifyOTPValidation} = require('./validationSchema');

const {
  signToken, 
  verifyAccessToken, 
  verifyRefreshToken
} = require('./routes/authentication'); // this is to verify the token entered
// const restrictUser = require('./routes/restrict');

Router.post('/generate', 
  validateRequest(generateOTPValidation), assignID, blockUser(true), generateOTP, 
  // sendSMS --> property of Globe Telecom
);
Router.post('/resend', 
  validateRequest(generateOTPValidation), assignID, blockUser(true), resendOTP, generateOTP, 
  // sendSMS --> property of Globe Telecom
);
Router.post('/verify', validateRequest(verifyOTPValidation), assignID, blockUser(false), verifyOTP, signToken);
Router.post('/protect', assignID, verifyAccessToken);
Router.post('/refresh', assignID, verifyRefreshToken, signToken);

module.exports = Router;