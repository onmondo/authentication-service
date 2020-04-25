const isEmpty = require('lodash/isEmpty');
const morgan = require('morgan');
const catchAsyncError = require('@utils/catchAsyncError');
const {postRequest} = require('../methods');
const {request} = require('http');
const sendSMS = catchAsyncError(async (req, res, _next) => {

  const {mobile, expire, otp} = req.body;

  const baseMessage = process.env.OTP_MESSAGE;
  const message = baseMessage.replace('XXXXXX', otp);

  const payload = JSON.stringify({
    mobile, message
  });

  const sendSMSRequestOptions = {
    hostname: 'route-server',
    port: 80,
    path: '/api/v1/sms/send',
    method: 'POST',
    headers: {
      'Content-Type':  'application/json'
    }
  }

  const sendSMSResponse = await postRequest(request, sendSMSRequestOptions, payload);

  const responseData = {
    user: {
      mobile,
      expire,
      otp
    },
    send_sms_response: isEmpty(sendSMSResponse) ? {} : JSON.parse(sendSMSResponse),
  }
  morgan.token('process', () => `Send SMS API success for mobile ${mobile}`);

  return res.status(200).json({
    success: true,
    status: 'success',
    error: 0,
    data: responseData,
    self: req.originalUrl
  });
});

module.exports = sendSMS