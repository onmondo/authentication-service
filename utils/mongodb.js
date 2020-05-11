const host = process.env.MONGO_DATABASE_HOST;
const port = process.env.MONGO_DATABASE_PORT;

const connect = (dbClient, isODM) => {
  const url = `mongodb://${host}:${port}`;

  if (isODM) {
    return dbClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
  
  return new Promise((resovle, reject) => {
    dbClient.connect(url, (err, client) => {
      if (err) {
        reject(err);
      }
      resovle(client);
    });
  });

}

const close = (dbClient, isODM) => {
  if (isODM) {
    dbClient.connection.close();
  }
  
  dbClient.close();
}

module.exports = {
  connect, close
}
