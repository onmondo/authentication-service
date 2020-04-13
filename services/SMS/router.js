const Router = require('express').Router();

const sendSMS = require('./routes/sendSMS');
const validateRequest = require('./routes/validateRequest');

const {sendSMSValidation} = require('./validationSchema');

Router.post('/send', validateRequest(sendSMSValidation), sendSMS);

module.exports = Router;