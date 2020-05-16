class Request {
  constructor() {
    if (new.target === 'Request') { 
      throw new TypeError('Cannot construct Request')
    }
  }
  validate() {
    
  }
}

module.exports = Request;
