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
export class MatrixClientR0Account3pid {
  @Get('/_matrix/client/r0/account/3pid')
  async getAccount3PIDs(
    @CurrentUser() session: Session
  ): Promise<dto.GetAccount3PIDsResponse | any> {
    throw new HttpError(501);
  }

  @Post('/_matrix/client/r0/account/3pid')
  async post3PIDs(
    @Body() body: dto.Post3PIDsBody,
    @CurrentUser() session: Session
  ): Promise<any> {
    throw new HttpError(501);
  }
}
