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
import { redisAsync, RedisKeys } from '../redis';
import { ErrorTypes } from '../types';

@JsonController('')
export class MatrixClientR0UserUserIdFilterFilterId {
  @Get('/_matrix/client/r0/user/:userId/filter/:filterId')
  async getFilter(
    @Param('userId') userId: string,
    @Param('filterId') filterId: string,
    @CurrentUser() user?: User
  ): Promise<dto.GetFilterResponse | any> {
    const key = RedisKeys.USER_FILTER + filterId;
    const filter = await redisAsync().getAsync(key);
    if (filter === undefined) {
      throw new BadRequestError(ErrorTypes.M_NOT_FOUND);
    }
    console.log('filter', filter, key);
    return JSON.parse(filter);
  }
}
