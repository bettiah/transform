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
export class MatrixClientR0RoomsRoomIdForget {
  @Post('/_matrix/client/r0/rooms/:roomId/forget')
  async forgetRoom(
    @Param('roomId') roomId: string,
    @CurrentUser() session: Session
  ): Promise<dto.ForgetRoomResponse429 | any> {
    throw new HttpError(501);
  }
}
