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
export class MatrixClientR0Logout {
  @Post('/_matrix/client/r0/logout')
  async logout(): Promise<dto.LogoutResponse | any> {
    throw new HttpError(501);
  }
}
