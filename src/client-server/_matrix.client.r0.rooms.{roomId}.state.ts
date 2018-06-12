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
export class MatrixClientR0RoomsRoomIdState {
  @Get('/_matrix/client/r0/rooms/:roomId/state')
  async getRoomState(
    @Param('roomId') roomId: string,
    @CurrentUser() user?: User
  ): Promise<dto.StateEventResponse[] | any> {
    throw new HttpError(501);
  }
}
