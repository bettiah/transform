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
export class MatrixClientR0ProfileUserIdAvatarUrl {
  @Get('/_matrix/client/r0/profile/{userId}/avatar_url')
  async getAvatarUrl(
    @Param('userId') userId: string
  ): Promise<dto.GetAvatarUrlResponse | any> {
    throw new HttpError(501);
  }

  @Put('/_matrix/client/r0/profile/{userId}/avatar_url')
  async setAvatarUrl(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: dto.SetAvatarUrlBody
  ): Promise<dto.SetAvatarUrlResponse429 | any> {
    throw new HttpError(501);
  }
}
