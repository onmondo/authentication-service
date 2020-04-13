const authorize = (db, payload) => {
  const {password} = payload;
  return new Promise((resolve, reject) => {
    db.auth(password, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
}

const setKeyAndExpire = (db, payload) => {
  const {key, expire, value} = payload;
  return new Promise((resolve, reject) => {
    db.setex(key, expire, value, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
}

const getTTL = (db, payload) => {
  const {key} = payload;
  return new Promise((resolve, reject) => {
    db.ttl(key, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
}

const getKey = (db, payload) => {
  const {key} = payload;
  return new Promise((resolve, reject) => {
    db.get(key, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
}

const deleteKeys = (db, payload) => {
  const {keys} = payload;
  return new Promise((resolve, reject) => {
    db.del(keys, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
}

const zcountMembers = (db, payload) => {
  const {keySet} = payload;
  return new Promise((resolve, reject) => {
    db.zcount(keySet, '-inf', '+inf', (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
}

const zaddMember = (db, payload) => {
  const {keySet, timestamp, value} = payload;
  return new Promise((resolve, reject) => {
    db.zadd(keySet, timestamp, value, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
}

const cleanDisconnect = (db) => {
  return new Promise((resolve, reject) => {
    db.quit(keys, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
}

const postRequest = (request, options, payload) => {
  console.log('send sms payload', payload);
  return new Promise((resolve, reject) => {
    
    const postResponse = request(options, res => {
      res.on('data', data => {
        console.log('response data', data);
        resolve(data)
      });
    });

    postResponse.on('error', err => {
      console.log('response error', err);
      reject(err);
    });

    postResponse.write(payload);
    postResponse.end();
  });
}

module.exports = {
  authorize,
  setKeyAndExpire,
  getTTL,
  getKey,
  deleteKeys,
  zcountMembers,
  zaddMember,
  cleanDisconnect,
  postRequest
};