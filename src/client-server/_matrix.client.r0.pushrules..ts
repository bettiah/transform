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
export class MatrixClientR0Pushrules {
  @Get('/_matrix/client/r0/pushrules/')
  async getPushRules(
    @CurrentUser() user?: User
  ): Promise<dto.GetPushRulesResponse | any> {
    throw new HttpError(501);
  }
}