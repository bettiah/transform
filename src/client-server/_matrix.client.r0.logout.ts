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
import { Session } from '../auth';
import { redisAsync } from '../redis';

@JsonController('')
export class MatrixClientR0Logout {
  @Post('/_matrix/client/r0/logout')
  async logout(
    @CurrentUser() session: Session
  ): Promise<dto.LogoutResponse | any> {
    const key = `${session.home_server}:${session.user_id}:${
      session.device_id
    }`;
    await redisAsync().delAsync(key);
    return {};
  }
}
