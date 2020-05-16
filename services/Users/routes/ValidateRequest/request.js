const Joi = require('@hapi/joi');
const Request = require('@common/Request');
const isEmpty = require('lodash/isEmpty');

const userValidation = require('./validation');

class UserRequest extends Request {
  constructor(request) {
    super();
    this.body = request.body;
  }

  validate() {
    const validationResponse = userValidation.validate(this.body);

    if (!isEmpty(validationResponse.error)) {
      return next(
        new ServiceError(validationResponse.error, `${process.env.PREFIX_ERROR_CODE_FAIL}-APP400`, 400)
      );
    }    
  }
}

module.exports = UserRequest;
