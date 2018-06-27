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
  UnauthorizedError,
  Res
} from 'routing-controllers';

import * as dto from './types';
import { LoginType } from '../types';

import { rand } from '../utils';
import { redisAsync, redisGetAndDel } from '../redis';
import { registerUser } from '../auth';
const config = require('../../config.json');
const debug = require('debug')('server:register');

@JsonController('')
export class MatrixClientR0Register {
  @Post('/_matrix/client/r0/register')
  async register(
    // @IsIn(['guest', 'user'])
    @QueryParam('kind') kind: string,
    @Body({ required: true })
    body: dto.RegisterBody,
    @Res() response: any
  ): Promise<
    | dto.RegisterResponse
    | dto.AuthenticationResponse
    | dto.RegisterResponse429
    | any
  > {
    if (body.auth && body.auth.session && body.auth.type === LoginType.dummy) {
      const session = await redisGetAndDel(body.auth.session);
      debug('session', session, 'kind', kind);
      if (!session) {
        throw new UnauthorizedError('invalid session');
      }
      // get user / pass from session
      const [user, pass] = session.split(':');
      const signedIn = await registerUser(user, pass, body.device_id);
      // maybe add device_id & initial_device_display_name to db - TODO
      const resp: dto.RegisterResponse = {
        access_token: signedIn.jwt,
        device_id: signedIn.session.device_id,
        home_server: signedIn.session.home_server,
        user_id: signedIn.session.user_id
      };
      return resp;
    } else if (body.username && body.password) {
      // TODO - check if in use
      const session = rand();
      // TODO - store hash of password
      const value = `${body.username}:${body.password}`;
      // save to redis, expire soon
      await redisAsync().setAsync(session, value, 'EX', config.session_timeout);
      // send back a session id
      const resp: dto.AuthenticationResponse = {
        session,
        flows: [{ stages: [LoginType.dummy] }]
      };
      return response.status(401).send(resp);
    }
    throw new HttpError(501);
  }
}
