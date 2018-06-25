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
import { setPresence, getPresence } from '../presence';
import { ErrorTypes } from '../types';

@JsonController('')
export class MatrixClientR0PresenceUserIdStatus {
  @Get('/_matrix/client/r0/presence/:userId/status')
  async getPresence(
    @Param('userId') userId: string
  ): Promise<dto.GetPresenceResponse | any> {
    const msg = await getPresence(userId);
    if (!msg.presence || !msg.status_msg || !msg.last_active_ago) {
      return new BadRequestError(ErrorTypes.M_NOT_FOUND);
    }
    return {
      // currently_active : TODO
      ...msg
    };
  }

  @Put('/_matrix/client/r0/presence/:userId/status')
  async setPresence(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: dto.SetPresenceBody,
    @CurrentUser() session: Session
  ): Promise<dto.SetPresenceResponse429 | any> {
    //  make sure user is not setting someone else's presence
    if (userId !== session.username) {
      throw new UnauthorizedError("cannot set other's presence");
    }
    await setPresence(userId, body.presence, body.status_msg);
    return {};
  }
}
