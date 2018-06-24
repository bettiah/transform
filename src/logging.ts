const winston = require('winston');
const expressWinston = require('express-winston');

const colorize = true;

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: false,
      colorize
    })
  ],
  colorize: true,
  msg:
    'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
  meta: false,
  expressFormat: true
  // requestWhitelist: ['body'],
  // responseWhitelist: ['body']
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: false,
      colorize
    })
  ]
});
