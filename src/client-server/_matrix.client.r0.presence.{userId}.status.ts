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
  InternalServerError
} from 'routing-controllers';

import * as dto from './types';
import { User } from '../model';
import { RedisKeys, redisMulti } from '../redis';

const config = require('../../config.json');

@JsonController('')
export class MatrixClientR0PresenceUserIdStatus {
  @Get('/_matrix/client/r0/presence/:userId/status')
  async getPresence(
    @Param('userId') userId: string
  ): Promise<dto.GetPresenceResponse | any> {
    const presence_ = RedisKeys.USER_PRESENCE + userId;
    const activity_ = RedisKeys.USER_ACTIVITY + userId;

    const msg = await redisMulti()
      .get(presence_)
      .get(activity_)
      .execAsync();

    if (!msg[0] || !msg[1]) {
      // is an error
      return new InternalServerError('');
    }
    const [presence, status_msg] = msg[0].split(':');
    return { presence, status_msg, last_active_ago: Date.now() - msg[1] };
  }

  @Put('/_matrix/client/r0/presence/:userId/status')
  async setPresence(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: dto.SetPresenceBody,
    @CurrentUser() user?: User
  ): Promise<dto.SetPresenceResponse429 | any> {
    //  make sure user is not setting someone else's presence
    if (userId != user!.user_id) {
      throw new UnauthorizedError("cannot set other's presence");
    }
    const presence_ = RedisKeys.USER_PRESENCE + userId;
    const activity_ = RedisKeys.USER_ACTIVITY + userId;
    const msg = `${body.presence}:${body.status_msg}`;

    // TODO implement redis keyspace notifications for modifying presence

    await redisMulti()
      // .set(presence_, msg, 'EX', config.presence_timeout)
      .set(presence_, msg)
      .set(activity_, Date.now())
      .execAsync();
    return {};
  }
}
