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
export class MatrixClientR0PresenceListUserId {
  @Get('/_matrix/client/r0/presence/list/{userId}')
  async getPresenceForList(
    @Param('userId') userId: string
  ): Promise<dto.PresenceEventResponse[] | any> {
    throw new HttpError(501);
  }

  @Post('/_matrix/client/r0/presence/list/{userId}')
  async modifyPresenceList(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: dto.ModifyPresenceListBody
  ): Promise<dto.ModifyPresenceListResponse429 | any> {
    throw new HttpError(501);
  }
}
