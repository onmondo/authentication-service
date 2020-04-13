const postRequest = (request, payload) => {
  console.log('payload', payload);
  return new Promise((resolve, reject) => {
    
    request.post(payload, (err, _res, body) => {
      if(err) reject(err);
      
      console.log('sms response body:', body);

      resolve(body);
    });
  })
}

module.exports = {
  postRequest
}