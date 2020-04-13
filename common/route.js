const catchAsyncError = require('../utils/catchAsyncError');

const computeResponse = catchAsyncError(async (req, res) => {
  return res.status(200).json({
    success: true,
    status: 'success',
    error: 0,
    owner_link: req.originalUrl
  });
});

module.exports = computeResponse;