const jwt = require('jsonwebtoken');
const fs = require('fs');
const {promisify} = require('util');
const morgan = require('morgan');
const SignTokenOption = require('../../../utils/SignTokenOption');
const ServiceError = require('../../../utils/ServiceError');
const catchAsyncError = require('../../../utils/catchAsyncError');

const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;
const PUBLIC_KEY = process.env.JWT_PUBLIC_KEY;

const signToken = catchAsyncError(async(req, res, _next) => {

  const {mobile} = req.body;
  const payload = {mobile};

  const SignAccessOption = new SignTokenOption({
    issuer: process.env.JWT_ACCESS_ISSUER,
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });

  const SignRefreshOption = new SignTokenOption({
    issuer: process.env.JWT_REFRESH_ISSUER,
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });

  const privateKey = fs.readFileSync(`${PRIVATE_KEY}`, 'utf8');

  const accessToken = jwt.sign(
    payload,
    privateKey,
    SignAccessOption.getSignOption()
  );

  const refreshToken = jwt.sign(
    payload,
    privateKey,
    SignRefreshOption.getSignOption()
  );

  return res.status(200).json({
    success: true,
    status: 'success',
    error: 0,
    data: {
      access_token: accessToken,
      refresh_token: refreshToken
    },
    owner_link: req.originalUrl
  });
});

// verify access token
const verifyAccessToken = catchAsyncError(async (req, res, next) => {
  // 1) Validate Token
  const token =
    req.headers.authorization && req.headers.authorization.startsWith('Bearer')
      ? req.headers.authorization.split(' ')[1]
      : '';

  if (!token) {
    const errorMessage = 'You are not logged in! Please log in to get access.';
    morgan.token('process', () => errorMessage);    
    return next(
      new ServiceError(
        errorMessage,
        `${process.env.PREFIX_ERROR_CODE_FAIL}-JWT401`,
        401)
    );
  }

  // 2) Token verification
  const SignAccessOption = new SignTokenOption({
    issuer: process.env.JWT_ACCESS_ISSUER,
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });

  // const SignRefreshOption = new SignTokenOption({
  //   issuer: process.env.JWT_REFRESH_ISSUER,
  //   expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  // });

  const publicKey = fs.readFileSync(`${PUBLIC_KEY}`, 'utf8');

  const decodedAccess = 
    await promisify(jwt.verify)(token, publicKey, SignAccessOption.getVerifyOption());
  // const decodedRefresh = 
  //   await promisify(jwt.verify)(token, publicKey, SignRefreshOption.getVerifyOption());

  console.log('decodedAccess', decodedAccess);
  // console.log('decodedRefresh', decodedRefresh);

  // 3) Check user still exists
  // dbClient here must be a mongoDB/MySQL connection instance
  // for now, checking if user exist is disabled
  // const freshUser = await getKey(dbClient, {key: decodedRefresh.mobile});

  // if (!freshUser) {
  //   return next(
  //     new AppError('The user belonging to this token no longer exist!', 401)
  //   );
  // }

  // 4) If everythings ok, invoke next function supposedly but right now its respose
  // req.user = freshUser;
  // return next();

  morgan.token('process', () => 'Access token verified');    

  return res.status(200).json({
    success: true,
    status: 'success',
    error: 0,
    data: {decodedAccess},
    owner_link: req.originalUrl
  });  
});

const verifyRefreshToken = catchAsyncError(async (req, _res, next) => {
  // 1) Validate Token
  const token =
    req.headers.authorization && req.headers.authorization.startsWith('Bearer')
      ? req.headers.authorization.split(' ')[1]
      : '';

  if (!token) {
    const errorMessage = 'You are not logged in! Please log in to get access.';
    morgan.token('process', () => errorMessage);
    return next(
      new ServiceError(
        errorMessage,
        `${process.env.PREFIX_ERROR_CODE_FAIL}-JWT401`,
        401)
    );
  }

  // 2) Token verification
  const SignRefreshOption = new SignTokenOption({
    issuer: process.env.JWT_REFRESH_ISSUER,
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });

  const publicKey = fs.readFileSync(`${PUBLIC_KEY}`, 'utf8');

  const decodedRefresh = 
    await promisify(jwt.verify)(token, publicKey, SignRefreshOption.getVerifyOption());

  console.log('decodedRefresh', decodedRefresh);

  // 3) Check user still exists
  // dbClient here must be a mongoDB/MySQL connection instance
  // for now, checking if user exist is disabled
  // const freshUser = await getKey(dbClient, {key: decodedRefresh.mobile});

  // if (!freshUser) {
  //   return next(
  //     new AppError('The user belonging to this token no longer exist!', 401)
  //   );
  // }

  // 4) If everythings ok, invoke next function to generate new access token
  morgan.token('process', () => 'Refresh token verified');
  req.body = {...req.body, mobile: decodedRefresh.mobile};
  return next();
});

module.exports = {
  signToken,
  verifyAccessToken,
  verifyRefreshToken
}