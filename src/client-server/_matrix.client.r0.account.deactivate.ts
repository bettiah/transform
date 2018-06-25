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
export class MatrixClientR0AccountDeactivate {
  @Post('/_matrix/client/r0/account/deactivate')
  async deactivateAccount(
    @Body() body: dto.DeactivateAccountBody,
    @CurrentUser() session: Session
  ): Promise<
    dto.AuthenticationResponse | dto.DeactivateAccountResponse429 | any
  > {
    throw new HttpError(501);
  }
}
