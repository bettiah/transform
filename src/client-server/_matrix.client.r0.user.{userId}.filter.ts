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
import { rand } from '../utils';
import { redisAsync, RedisKeys } from '../redis';

@JsonController('')
export class MatrixClientR0UserUserIdFilter {
  @Post('/_matrix/client/r0/user/:userId/filter')
  async defineFilter(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: dto.DefineFilterBody,
    @CurrentUser() user?: User
  ): Promise<dto.DefineFilterResponse | any> {
    // TODO - handle properly
    const filter_id = rand();
    const key = RedisKeys.USER_FILTER + filter_id;
    await redisAsync().setAsync(key, JSON.stringify(body));
    return { filter_id };
  }
}
