const logger = require('./logger');
const morgan = require('morgan');

const token = morgan.token('body', (request) => JSON.stringify(request.body));

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.info(error.message);

  next(error);
};

module.exports = {
  token,
  unknownEndpoint,
  errorHandler,
};
