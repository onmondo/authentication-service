const catchAsyncError = require('@utils/catchAsyncError');
const mongoose = require('mongoose');

const getUsers = catchAsyncError(async (req, _res, _next) => {

  return res.status(200).json({
    success: true,
    status: 'success',
    error: 0,
    data: {},
    self: req.originalUrl
  });
});

module.exports = getUsers;