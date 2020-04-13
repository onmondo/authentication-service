const catchAsyncError = require('../../../utils/catchAsyncError');
const {sendSMSValidation} = require('../validationSchema');
const ServiceError = require('../../../utils/ServiceError');
const {postRequest} = require('../methods');
// const {postRequest} = require('../../../utils/sendRequest');
const isEmpty = require('lodash/isEmpty');
const request = require('requestretry');

const sendSMS = catchAsyncError(async (req, res, next) => {
  const validationResponse = sendSMSValidation.validate(req.body);

  if (!isEmpty(validationResponse.error)) {
    return next(new ServiceError(validationResponse.error, 400));
  }
  const {mobile, message} = req.body;

  const requestCode = process.env.CODE;
  const suffix = process.env.SUFFIX;
  const prefixCode = process.env.PREFIX_CODE
  
  const code = `${prefixCode}${requestCode}${(isEmpty(suffix))?'':suffix}`;
  const url = `${process.env.BASE_URL}/smsmessaging/v1/outbound/${code}/requests`;

  console.log('request...', url);

  const sendSMSPayload = {
    url,
    qs: {
      app_id: process.env.APP_ID,
      app_secret: process.env.APP_SECRET
    },
    form: {
      message,
      address: mobile,
      passphrase: process.env.PASSPHRASE,
    },
    timeout: process.env.TIMEOUT,
    maxAttempts: process.env.MAX_ATTEMPTS
  };

  const sendSMSResponse = (process.env.ENV === 'Development')
    ? {}
    : await postRequest(request, sendSMSPayload);

  return res.status(200).json({
    success: true,
    status: 'success',
    error: 0,
    data: isEmpty(sendSMSResponse) ? {} : JSON.parse(sendSMSResponse),
    owner_link: req.originalUrl
  });
});

module.exports = sendSMS