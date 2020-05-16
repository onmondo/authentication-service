const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = require('./schema');

class UserModel {
  constructor() {
    this.schema = userSchema;
  }

  getSchema() {
    return this.schema;
  }

  getModel() {
    const theSchema = new Schema(this.schema)
    return mongoose.model('User', theSchema);
  }
}

module.exports = UserModel;
