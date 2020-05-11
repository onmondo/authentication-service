const Router = require('express').Router();

const getUsers = require('./routes/getUsers');

// const {sendSMSValidation} = require('./validationSchema');

Router.get('/users', getUsers);

module.exports = Router;