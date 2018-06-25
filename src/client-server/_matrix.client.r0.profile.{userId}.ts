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
export class MatrixClientR0ProfileUserId {
  @Get('/_matrix/client/r0/profile/:userId')
  async getUserProfile(
    @Param('userId') userId: string
  ): Promise<dto.GetUserProfileResponse | any> {
    throw new HttpError(501);
  }
}
