const catchAsyncError = require('../utils/catchAsyncError');

const computeResponse = catchAsyncError(async (req, res) => {
  const code = req.body.statusCode;
  delete req.body.statusCode;

  return res.status(code).json({
    success: true,
    status: 'success',
    error: 0,
    data: req.body,
    self: req.originalUrl
  });
});

module.exports = computeResponse;