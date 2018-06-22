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
import { setPresence, getPresence } from './presence';
import { ErrorTypes } from '../types';

@JsonController('')
export class MatrixClientR0PresenceUserIdStatus {
  @Get('/_matrix/client/r0/presence/:userId/status')
  async getPresence(
    @Param('userId') userId: string
  ): Promise<dto.GetPresenceResponse | any> {
    const msg = await getPresence(userId);
    if (!msg[0] || !msg[1] || !msg[2]) {
      return new BadRequestError(ErrorTypes.M_NOT_FOUND);
    }
    return {
      // currently_active : TODO
      presence: msg[0],
      status_msg: msg[1],
      last_active_ago: Date.now() - msg[2]
    };
  }

  @Put('/_matrix/client/r0/presence/:userId/status')
  async setPresence(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: dto.SetPresenceBody,
    @CurrentUser() user: User
  ): Promise<dto.SetPresenceResponse429 | any> {
    //  make sure user is not setting someone else's presence
    if (userId != user!.user_id) {
      throw new UnauthorizedError("cannot set other's presence");
    }
    await setPresence(userId, body.presence, body.status_msg);
    return {};
  }
}
