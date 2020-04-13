const redis = require('redis');

const dbConfig = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  password: process.env.DATABASE_PASS,
  // retry_strategy: 1000 // retry 1s after connection fails
  // also we need security mechanism here...
}

const redisClient = redis.createClient(dbConfig);

redisClient.on('ready', () => {
  console.log('Redis is ready');
});

redisClient.on('error', () => {
  console.log('Error in redis');
});

module.exports = redisClient;