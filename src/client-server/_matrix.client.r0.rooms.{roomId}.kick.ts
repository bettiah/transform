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
export class MatrixClientR0RoomsRoomIdKick {
  @Post('/_matrix/client/r0/rooms/:roomId/kick')
  async kick(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.KickBody,
    @CurrentUser() user?: User
  ): Promise<any> {
    throw new HttpError(501);
  }
}
