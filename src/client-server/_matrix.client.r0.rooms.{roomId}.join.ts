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
export class MatrixClientR0RoomsRoomIdJoin {
  @Post('/_matrix/client/r0/rooms/:roomId/join')
  async joinRoomById(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.JoinRoomByIdBody,
    @CurrentUser() user?: User
  ): Promise<dto.JoinRoomByIdResponse429 | any> {
    throw new HttpError(501);
  }
}
