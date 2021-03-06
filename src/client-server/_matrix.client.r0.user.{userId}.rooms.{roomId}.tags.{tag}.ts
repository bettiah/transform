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
export class MatrixClientR0UserUserIdRoomsRoomIdTagsTag {
  @Put('/_matrix/client/r0/user/:userId/rooms/:roomId/tags/:tag')
  async setRoomTag(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Param('tag') tag: string,
    @Body({ required: true })
    body: any,
    @CurrentUser() session: Session
  ): Promise<any> {
    throw new HttpError(501);
  }

  @Delete('/_matrix/client/r0/user/:userId/rooms/:roomId/tags/:tag')
  async deleteRoomTag(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Param('tag') tag: string,
    @CurrentUser() session: Session
  ): Promise<any> {
    throw new HttpError(501);
  }
}
