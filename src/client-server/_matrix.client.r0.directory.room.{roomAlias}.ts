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
export class MatrixClientR0DirectoryRoomRoomAlias {
  @Get('/_matrix/client/r0/directory/room/:roomAlias')
  async getRoomIdByAlias(
    @Param('roomAlias') roomAlias: string
  ): Promise<dto.GetRoomIdByAliasResponse | any> {
    throw new HttpError(501);
  }

  @Put('/_matrix/client/r0/directory/room/:roomAlias')
  async setRoomAlias(
    @Param('roomAlias') roomAlias: string,
    @Body({ required: true })
    body: dto.SetRoomAliasBody,
    @CurrentUser() session: Session
  ): Promise<any> {
    throw new HttpError(501);
  }

  @Delete('/_matrix/client/r0/directory/room/:roomAlias')
  async deleteRoomAlias(
    @Param('roomAlias') roomAlias: string,
    @CurrentUser() session: Session
  ): Promise<any> {
    throw new HttpError(501);
  }
}
