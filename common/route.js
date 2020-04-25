const catchAsyncError = require('../utils/catchAsyncError');

const computeResponse = catchAsyncError(async (req, res) => {
  return res.status(req.body.statusCode).json({
    success: true,
    status: 'success',
    error: 0,
    data: req.body,
    self: req.originalUrl
  });
});

module.exports = computeResponse;