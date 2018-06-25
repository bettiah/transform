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
export class MatrixClientR0RoomsRoomIdEventEventId {
  @Get('/_matrix/client/r0/rooms/:roomId/event/:eventId')
  async getOneRoomEvent(
    @Param('roomId') roomId: string,
    @Param('eventId') eventId: string,
    @CurrentUser() session: Session
  ): Promise<dto._EventResponse | any> {
    throw new HttpError(501);
  }
}
