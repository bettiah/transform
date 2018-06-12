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
export class MatrixClientR0AccountWhoami {
  @Get('/_matrix/client/r0/account/whoami')
  async getTokenOwner(
    @CurrentUser() user?: User
  ): Promise<
    | dto.GetTokenOwnerResponse
    | dto.GetTokenOwnerResponse401
    | dto.GetTokenOwnerResponse403
    | dto.GetTokenOwnerResponse429
    | any
  > {
    throw new HttpError(501);
  }
}
