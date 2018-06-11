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
export class MatrixClientR0KeysClaim {
  @Post('/_matrix/client/r0/keys/claim')
  async claimKeys(
    @Body({ required: true })
    body: dto.ClaimKeysBody
  ): Promise<dto.ClaimKeysResponse | any> {
    throw new HttpError(501);
  }
}
