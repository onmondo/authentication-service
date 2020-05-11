const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const socialSchema = new Schema({  
    
  provider: String,
  accountid: String  
      
});

const Social = mongoose.model('Social', socialSchema);

module.exports = {
  socialSchema,
  Social
}
