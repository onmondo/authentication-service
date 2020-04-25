const isEmpty = require('lodash/isEmpty');

module.exports = (err, req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const errorCode = (isEmpty(err.errorCode))
    ? `${(err.statusCode === 500) 
        ? process.env.PREFIX_ERROR_CODE_ERROR 
        : process.env.PREFIX_ERROR_CODE_FAIL}-APP02` 
    : err.errorCode;

  res.status(statusCode).json({
    success: false,
    status: 'fail',
    error: {...err, errorCode},
    message: err.message,
    stack: err.stack,
    self: req.originalUrl
  });
};