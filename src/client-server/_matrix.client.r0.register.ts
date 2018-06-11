import {
  JsonController,
  Authorized,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  HttpError,
  NotFoundError,
  BadRequestError,
  CurrentUser,
  QueryParam,
  HeaderParam,
  UnauthorizedError
} from 'routing-controllers';

import * as dto from './types';
import { LoginType } from '../types';

import { rand, normalizeUser, redisAsync, redisMulti } from '../utils';
import { signup } from '../auth';
const config = require('../../config.json');
const debug = require('debug')('server:register');

@JsonController('')
export class MatrixClientR0Register {
  @Post('/_matrix/client/r0/register')
  async register(
    @QueryParam('kind') kind: string,
    @Body({ required: true })
    body: dto.RegisterBody
  ): Promise<
    | dto.RegisterResponse
    | dto.AuthenticationResponse
    | dto.RegisterResponse429
    | any
  > {
    if (body.auth && body.auth.session && body.auth.type === LoginType.dummy) {
      const [session, _] = await redisMulti()
        .get(body.auth.session)
        .del(body.auth.session)
        .execAsync();
      debug('session', session);
      if (!session) {
        throw new UnauthorizedError('invalid session');
      }
      // get user / pass from session
      const [user, pass] = session.split(':');
      const device_id = body.device_id || rand(); // TODO - store, check device_id
      const signedIn = await signup(normalizeUser(user), pass, device_id);
      const resp: dto.RegisterResponse = {
        access_token: signedIn.jwt,
        device_id,
        home_server: signedIn.user.home_server,
        user_id: signedIn.user.user_id
      };
      return resp;
    } else if (body.username && body.password) {
      // TODO - check if in use
      const session = rand();
      // TODO - store hash of password
      const value = `${body.username}:${body.password}`;
      await redisAsync().setAsync(session, value, 'EX', config.session_timeout);
      // send back a session id
      const resp: dto.AuthenticationResponse = {
        session,
        flows: [{ stages: [LoginType.dummy] }]
      };
      return resp;
    }
    throw new HttpError(501);
  }
}
