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
export class MatrixClientR0RoomsRoomIdStateEventTypeStateKey {
  @Get('/_matrix/client/r0/rooms/:roomId/state/:eventType/:stateKey')
  async getRoomStateWithKey(
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string,
    @Param('stateKey') stateKey: string,
    @CurrentUser() user?: User
  ): Promise<any> {
    throw new HttpError(501);
  }

  @Put('/_matrix/client/r0/rooms/:roomId/state/:eventType/:stateKey')
  async setRoomStateWithKey(
    @Param('roomId') roomId: string,
    @Param('eventType') eventType: string,
    @Param('stateKey') stateKey: string,
    @Body({ required: true })
    body: any,
    @CurrentUser() user?: User
  ): Promise<dto.SetRoomStateWithKeyResponse | any> {
    throw new HttpError(501);
  }
}
