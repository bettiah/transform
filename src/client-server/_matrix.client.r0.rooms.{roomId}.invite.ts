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

@JsonController('')
export class MatrixClientR0RoomsRoomIdInvite {
  @Post('/_matrix/client/r0/rooms/:roomId/invite')
  async inviteBy3PID(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.InviteBy3PIDBody,
    @CurrentUser() user?: User
  ): Promise<dto.InviteBy3PIDResponse429 | any> {
    throw new HttpError(501);
  }
}
