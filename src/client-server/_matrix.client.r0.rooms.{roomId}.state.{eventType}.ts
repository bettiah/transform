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
export class MatrixClientR0RoomsRoomIdStateEventType {
  @Get('/_matrix/client/r0/rooms/:roomId/state/:eventType')
  async getRoomStateByType(
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string,
    @CurrentUser() user?: User
  ): Promise<any> {
    throw new HttpError(501);
  }

  @Put('/_matrix/client/r0/rooms/:roomId/state/:eventType')
  async setRoomState(
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string,
    @Body({ required: true })
    body: any,
    @CurrentUser() user?: User
  ): Promise<dto.SetRoomStateResponse | any> {
    throw new HttpError(501);
  }
}
