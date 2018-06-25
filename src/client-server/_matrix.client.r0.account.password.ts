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
export class MatrixClientR0AccountPassword {
  @Post('/_matrix/client/r0/account/password')
  async changePassword(
    @Body() body: dto.ChangePasswordBody,
    @CurrentUser() session: Session
  ): Promise<dto.AuthenticationResponse | dto.ChangePasswordResponse429 | any> {
    throw new HttpError(501);
  }
}
