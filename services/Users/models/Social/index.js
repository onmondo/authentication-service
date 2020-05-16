const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const socialSchema = require('./schema');

class SocialModel {
  constructor() {
    this.schema = socialSchema;
  }

  getSchema() {
    return this.schema;
  }

  getModel() {
    const theSchema = new Schema(this.schema)    
    return mongoose.model('Social', theSchema);
  }
}

module.exports = SocialModel;
