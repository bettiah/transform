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
export class MatrixClientR0RoomsRoomIdContextEventId {
  @Get('/_matrix/client/r0/rooms/:roomId/context/:eventId')
  async getEventContext(
    @Param('roomId') roomId: string,
    @Param('eventId') eventId: string,
    @QueryParam('limit') limit: number,
    @CurrentUser() session: Session
  ): Promise<dto.GetEventContextResponse | any> {
    throw new HttpError(501);
  }
}
