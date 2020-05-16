const Router = require('express').Router();

const getUsers = require('./routes/GetUserRequest');
const validateRequest = require('./routes/ValidateRequest');
// const insertUser = require('');

Router.get('/', getUsers);

Router.post('/', validateRequest);

module.exports = Router;