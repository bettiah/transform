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
export class MatrixClientR0PushersSet {
  @Post('/_matrix/client/r0/pushers/set')
  async postPusher(
    @Body({ required: true })
    body: dto.PostPusherBody,
    @CurrentUser() user?: User
  ): Promise<dto.PostPusherResponse429 | any> {
    throw new HttpError(501);
  }
}
