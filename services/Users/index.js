require('module-alias/register');
const express = require('express');

const errorHandler = require('@common/errorHandler');
const ServiceError = require('@utils/ServiceError');

if (process.env.STAGE === 'local') {
  const seeder = require('./seed');
  seeder();
}

const app = express();
app.use(express.json());

// const routes = require('./router');
// app.use('/api/v1/users', routes); // must use a load balancer to handle versioning (kubernetes)

// operational error handler for non-existing route
app.all('*', (req, _res, next) => {
  const err = new ServiceError(
    `Cannot find ${req.originalUrl} on this server!`,
    404,
    1
  );
  next(err);
});

app.use(errorHandler);

const port = process.env.USERS_PORT

app.listen(port, () => {
  console.log(`Users Service running at port ${port}`);
});