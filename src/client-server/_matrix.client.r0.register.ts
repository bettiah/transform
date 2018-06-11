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
import { rand, normalizeUser, redisAsync } from '../utils';
import { signup } from '../auth';
const config = require('../../config.json');

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
      // get from redis - TODO - then delete it
      const session = await redisAsync().getAsync(body.auth.session);
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
