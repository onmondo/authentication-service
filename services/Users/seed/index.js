module.exports = async () => {
  const mongoclient = require('mongodb').MongoClient;
  const {connect, close} = require('@utils/mongodb');
  const {insertMany} = require('@services/Users/repository');
  const dbclient = await connect(mongoclient);
  const generateUsers = require('./seeder');

  const generatedUsers = generateUsers();
  
  const db = dbclient.db('app-stats');

  await insertMany(db, generatedUsers);
  close(dbclient);

}
