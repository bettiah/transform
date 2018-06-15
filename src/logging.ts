const winston = require('winston');
const expressWinston = require('express-winston');

const colorize = true;

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: false,
      colorize: colorize
    })
  ],
  colorize: true,
  expressFormat: true,
  requestWhitelist: ['body'],
  responseWhitelist: ['body'],
  meta: true
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: colorize
    })
  ]
});
