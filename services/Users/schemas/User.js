const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {socialSchema} = require('./Social');

const userSchema = new Schema({
    firstname: {
      type: String,
      minlength: 3,
      maxlength: 32,
      required: true
    },
    lastname: {
      type: String,
      minlength: 3,
      maxlength: 32,
      required: true
    },
    email: {
      type: String,
      maxlength: 100,
      required: true
    },
    phone: {
      type: String,
      minlength: 10,
      maxlength: 12,
      required: true,
      unique: true
    },
    password: {
      type: String,
      minlength: 4,
      maxlength: 15,
      required: true
    },
    confirm: {
      type: String,
      minlength: 4,
      maxlength: 15,
      required: true
    },
    social: [socialSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = {
  userSchema,
  User
}
