// process.env.UV_THREADPOOL_SIZE = 4;
require('module-alias/register');
const cluster = require('cluster');

console.log('isMaster:', cluster.isMaster);

// Is the file being executed in master mode?
if (cluster.isMaster) {
  // if so, create a 4 cloned version of this server and listen request
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  // if its not, the file behave as a normal express server
  const express = require('express');
  const morgan = require('morgan');
  const fs = require('fs');
  const path = require('path');
  const uuid = require('uuid');
  
  // const errorHandler = require('../../common/errorHandler');
  const errorHandler = require('@common/errorHandler');
  const ServiceError = require('@utils/ServiceError');
  const logDirectory = process.env.LOGS_DIR;
  
  const app = express();
  app.use(express.json());
  
  const accessLogStream = fs.createWriteStream(
    path.join(`${logDirectory}`, `app-917-auth-service.log.${Date.now()}`),
    {flags: 'a'}
  );
  
  app.use(morgan(process.env.LOGS_FORMAT, {stream: accessLogStream}));
  
  app.use(morgan(process.env.LOGS_FORMAT))
  
  const routes = require('./router');
  app.use('/api/v1/auth', routes);
  
  // operational error handler for non-existing route
  app.all('*', (req, _res, next) => {
    req.id = uuid.v4();
    morgan.token('id', () => req.id);
  
    const errorMessage = `Cannot find ${req.originalUrl} on this server!`;
    morgan.token('process', () => errorMessage);
  
    const err = new ServiceError(
      errorMessage,
      `${process.env.PREFIX_ERROR_CODE_ERROR}-APP404`,
      404,
    );
    next(err);
  });
  
  app.use(errorHandler);
  
  const port = process.env.AUTH_PORT
  
  app.listen(port, () => {
    console.log(`Auth Service running at port ${port}`);
  });
}
