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
export class MatrixClientR0JoinRoomIdOrAlias {
  @Post('/_matrix/client/r0/join/:roomIdOrAlias')
  async joinRoom(
    @Param('roomIdOrAlias') roomIdOrAlias: string,
    @Body({ required: true })
    body: dto.JoinRoomBody,
    @CurrentUser() user?: User
  ): Promise<dto.JoinRoomResponse429 | any> {
    throw new HttpError(501);
  }
}
