// can be converted as lambda function
// const fs = require('fs');

module.exports = async () => {
  const mongoclient = require('mongodb').MongoClient;
  const {connect, close} = require('@utils/mongodb');
  const {insertMany} = require('@services/Users/repository');
  const dbclient = await connect(mongoclient);
  const generateUsers = require('./seeder');
  // const accounts = JSON.stringify(generateUsers);

  // const baseDockerfile = `
  // FROM mongo
  // RUN use app
  // RUN db.users.insertMany(<fake-user-accounts>)
  // `
  // fs.writeFileSync(
  //   'mongodb.local.Dockerfile', 
  //   baseDockerfile.replace('<fake-user-accounts>', accounts)
  // );
  const generatedUsers = generateUsers();
  
  const db = dbclient.db('app-stats');

  await insertMany(db, generatedUsers);
  close(dbclient);

  

}
