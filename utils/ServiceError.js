// throws an Error that will eventually handled by a middleware
class ServiceError extends Error {
  constructor(message, errorCode, statusCode, data) {
    super(message);

    this.errorCode = errorCode
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ServiceError;
