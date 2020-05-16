const catchAsyncError = require('@utils/catchAsyncError');
const GetUserRequest = require('./request');

const getUsers = catchAsyncError(async (req, _res, next) => {

  const userRequest = new GetUserRequest(req);

  userRequest.validate();

  return next();
});

module.exports = getUsers;