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

@JsonController('')
export class MatrixClientR0RoomsRoomIdInvite {
  @Post('/_matrix/client/r0/rooms/:roomId/inviteBy3PID')
  async inviteBy3PID(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.InviteBy3PIDBody,
    @CurrentUser() session: Session
  ): Promise<dto.InviteBy3PIDResponse429 | any> {
    throw new HttpError(501);
  }
}
