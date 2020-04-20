require('module-alias/register');
const express = require('express');

const errorHandler = require('@common/errorHandler');
const ServiceError = require('@utils/ServiceError');

const app = express();
app.use(express.json());

const routes = require('./router');
app.use('/api/v1/sms', routes);

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

const port = process.env.PORT

app.listen(port, () => {
  console.log(`SMS Service running at port ${port}`);
});