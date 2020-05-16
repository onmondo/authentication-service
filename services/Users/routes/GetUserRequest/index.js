const catchAsyncError = require('@utils/catchAsyncError');
const UserModel = require('../../models/User');

const getUsers = catchAsyncError(async (req, res, _next) => {

  const userModel = new UserModel();
  const model = userModel.getModel();
  const records = await model.find();

  return res.status(200).json({
    success: true,
    status: 'success',
    error: 0,
    data: records,
    self: req.originalUrl
  });
});

module.exports = getUsers;