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
export class MatrixClientR0RoomsRoomIdUnban {
  @Post('/_matrix/client/r0/rooms/:roomId/unban')
  async unban(
    @Param('roomId') roomId: string,
    @Body({ required: true })
    body: dto.UnbanBody,
    @CurrentUser() session: Session
  ): Promise<any> {
    throw new HttpError(501);
  }
}
