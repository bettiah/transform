require('dotenv').config();

import express = require('express');
import bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');

import 'reflect-metadata';
import {
  useExpressServer,
  Action,
  UnauthorizedError,
  Middleware,
  ExpressErrorMiddlewareInterface
} from 'routing-controllers';

import routes from './client-server/routes';
import { initDb, User } from './model';
import { verifyToken } from './jwt';
import { initRedis, redisAsync } from './redis';

import { requestLogger, errorLogger } from './logging';
import { ErrorTypes } from './types';

const debug = require('debug')('server');

const app = express();
app.use(bodyParser.json({ type: 'text/plain' }));
app.use(bearerToken());
app.use(requestLogger);
// app.use(logging.errorLogger);

async function init() {
  await initDb();
  await initRedis();
  debug('initialized');
}

process.on('unhandledRejection', (reason, p) => {
  debug('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

init().catch(error => {
  debug('initialization', error);
  process.exit(-1);
});

//
@Middleware({ type: 'after' })
class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err: any) => any) {
    switch (error.httpCode) {
      case 501:
        response.status(501).json({ error: 'unimplemented' });
        break;
      default:
        debug(error);
        response
          .status(error.httpCode)
          .json({ error: error.message || 'broke' });
    }
  }
}

useExpressServer(app, {
  // routePrefix: '/api2',
  middlewares: [CustomErrorHandler],
  defaultErrorHandler: false,
  cors: true,
  validation: { whitelist: true, skipMissingProperties: true },
  authorizationChecker: async (action: Action, roles: string[]) => {
    const token = action.request.token;
    if (!token) {
      debug('missing token');
      return false;
    }
    try {
      await verifyToken(token);
    } catch (ex) {
      debug(ex.message);
      return false;
    }
    return true;
  },
  currentUserChecker: async (action: Action) => {
    const token = action.request.token;
    if (!token) {
      throw new UnauthorizedError('missing token');
    }
    const verified = await verifyToken(token);
    // debug('verified', verified);
    // get from redis
    const key = `${verified.home_server}:${verified.user_id}:${
      verified.device_id
    }`;
    const user = await redisAsync().getAsync(key);
    // debug('key:', key, 'user:', user);
    if (!user) {
      throw new UnauthorizedError('logged out');
    }
    return Object.assign(new User(), {
      id: user,
      user_id: verified.user_id,
      home_server: verified.home_server,
      password_hash: ''
    });
  },
  controllers: routes
});

// handle 404, after other handlers. as per faq
app.use(function(req, res, next) {
  if (res.headersSent) {
    return next();
  }
  res.status(404).json({ error: 'not found' });
});

const port = process.env.PORT || 1234;
app.listen(port, () => debug(`Listening on port ${port}`));
