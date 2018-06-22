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
import { getRepository } from 'typeorm';

@JsonController('')
export class MatrixClientR0ProfileUserIdDisplayname {
  @Get('/_matrix/client/r0/profile/:userId/displayname')
  async getDisplayName(
    @Param('userId') userId: string
  ): Promise<dto.GetDisplayNameResponse | any> {
    const user = await getRepository(User).findOneOrFail(
      {
        user_id: userId
      },
      { select: ['display_name'] }
    );
    return { display_name: user.display_name };
  }

  @Put('/_matrix/client/r0/profile/:userId/displayname')
  async setDisplayName(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: dto.SetDisplayNameBody,
    @CurrentUser() user?: User
  ): Promise<dto.SetDisplayNameResponse429 | any> {
    //  make sure user is not setting someone else's presence
    if (userId != user!.user_id) {
      throw new UnauthorizedError("cannot set other's name");
    }

    if (body.displayname) {
      await getRepository(User).save({
        id: user!.id,
        display_name: body.displayname
      });
    }
    return {};
  }
}
