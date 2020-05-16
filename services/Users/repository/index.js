const insertMany = (db, payload) => {
  const collection = db.collection('users');
  return new Promise((resolve, reject) => {
    collection.insertMany(payload, (err, result) => {
      if (err) {
        reject(err);
      }

      resolve(result);
    })
  })
}

module.exports = {
  insertMany
}