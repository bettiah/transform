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
export class MatrixClientR0Pushrules {
  @Get('/_matrix/client/r0/pushrules/')
  async getPushRules(
    @CurrentUser() session: Session
  ): Promise<dto.GetPushRulesResponse | any> {
    throw new HttpError(501);
  }
}
