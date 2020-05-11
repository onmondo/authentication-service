const host = process.env.MONGO_DATABASE_HOST;
const port = process.env.MONGO_DATABASE_PORT;

const connect = (dbClient) => {
  const url = `mongodb://${host}:${port}`;
  return new Promise((resovle, reject) => {
    dbClient.connect(url, (err, client) => {
      if (err) {
        reject(err);
      }
      resovle(client);
    });
  })

}

const close = (dbClient) => {
  dbClient.close();
}

module.exports = {
  connect, close
}
