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
export class MatrixClientR0RoomsRoomIdMessages {
  @Get('/_matrix/client/r0/rooms/:roomId/messages')
  async getRoomEvents(
    @Param('roomId') roomId: string,
    @QueryParam('from', { required: true })
    from: string,
    @QueryParam('to') to: string,
    @QueryParam('dir', { required: true })
    dir: string,
    @QueryParam('limit') limit: number,
    @QueryParam('filter') filter: string,
    @CurrentUser() session: Session
  ): Promise<dto.GetRoomEventsResponse | any> {
    throw new HttpError(501);
  }
}
