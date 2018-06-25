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
import { User } from '../model';
import { redisAsync } from '../redis';

@JsonController('')
export class MatrixClientR0Logout {
  @Post('/_matrix/client/r0/logout')
  async logout(@CurrentUser() user?: User): Promise<dto.LogoutResponse | any> {
    // const key = `${user!.home_server}:${user!.user_id}:${user.dev}`;
    // await redisAsync().delAsync(key);
  }
}
