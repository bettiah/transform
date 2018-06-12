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
import { authenticate } from '../auth';
import { normalizeUser } from '../utils';
import { LoginType } from '../types';

@JsonController('')
export class MatrixClientR0Login {
  @Post('/_matrix/client/r0/login')
  async login(
    @Body({ required: true })
    body: dto.LoginBody
  ): Promise<dto.LoginResponse | dto.LoginResponse429 | any> {
    if (body.type === LoginType.password) {
      const { user, jwt } = await authenticate(
        normalizeUser(body.user!),
        body.password!,
        body.device_id!
      );
      const resp: dto.LoginResponse = {
        access_token: jwt,
        device_id: user.device_id,
        home_server: user.home_server,
        user_id: user.user_id
      };
      return resp;
    }
    throw new HttpError(501);
  }
}
