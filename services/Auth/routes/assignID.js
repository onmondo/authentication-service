const uuid = require('uuid');
const morgan = require('morgan');
const catchAsyncError = require('../../../utils/catchAsyncError');

const assignID = catchAsyncError(async (req, _res, next) => {
  req.id = uuid.v4();

  morgan.token('id', () => req.id);

  return next();
});

module.exports = assignID;