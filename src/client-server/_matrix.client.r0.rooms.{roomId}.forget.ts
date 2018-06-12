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
export class MatrixClientR0RoomsRoomIdForget {
  @Post('/_matrix/client/r0/rooms/:roomId/forget')
  async forgetRoom(
    @Param('roomId') roomId: string,
    @CurrentUser() user?: User
  ): Promise<dto.ForgetRoomResponse429 | any> {
    throw new HttpError(501);
  }
}
