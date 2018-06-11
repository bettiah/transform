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

@JsonController('')
export class MatrixClientR0ProfileUserIdDisplayname {
  @Get('/_matrix/client/r0/profile/{userId}/displayname')
  async getDisplayName(
    @Param('userId') userId: string
  ): Promise<dto.GetDisplayNameResponse | any> {
    throw new HttpError(501);
  }

  @Put('/_matrix/client/r0/profile/{userId}/displayname')
  async setDisplayName(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: dto.SetDisplayNameBody
  ): Promise<dto.SetDisplayNameResponse429 | any> {
    throw new HttpError(501);
  }
}
