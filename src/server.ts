const express: any = require('express');

import 'reflect-metadata';
import {
  useExpressServer,
  Action,
  UnauthorizedError
} from 'routing-controllers';

import { MatrixController, MatrixMediaController } from './tss';

const debug = require('debug')('server');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

async function init() {
  debug('initialized');
}

function verifyToken(_a1: any) {}
function tokenUser(_a1: any) {}

process.on('unhandledRejection', (reason, p) => {
  debug('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

init().catch(error => {
  debug('initialization', error);
  process.exit(-1);
});

useExpressServer(app, {
  // routePrefix: '/api2',
  cors: true,
  validation: { whitelist: true, skipMissingProperties: true },
  authorizationChecker: (action: Action, roles: string[]) => {
    const token = action.request.headers['jwt'];
    if (!token) {
      debug('missing token');
      return false;
    }
    try {
      verifyToken(token);
    } catch (ex) {
      debug(ex.message);
      return false;
    }
    // const _ = await tokenUser(token);
    return true;
  },
  currentUserChecker: async (action: Action) => {
    const token = action.request.headers['jwt'];
    if (!token) {
      throw new UnauthorizedError('missing token');
    }
    return tokenUser(token);
  },
  controllers: [MatrixController, MatrixMediaController]
});

const port = process.env.PORT || 1234;
app.listen(port, () => debug(`Listening on port ${port}`));
