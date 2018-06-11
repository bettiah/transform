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
export class MatrixClientR0AccountDeactivate {
  @Post('/_matrix/client/r0/account/deactivate')
  async deactivateAccount(
    @Body({ required: true })
    body: dto.DeactivateAccountBody
  ): Promise<
    dto.AuthenticationResponse | dto.DeactivateAccountResponse429 | any
  > {
    throw new HttpError(501);
  }
}
