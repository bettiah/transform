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
export class MatrixClientR0KeysQuery {
  @Post('/_matrix/client/r0/keys/query')
  async queryKeys(
    @Body() body: dto.QueryKeysBody,
    @CurrentUser() session: Session
  ): Promise<dto.QueryKeysResponse | any> {
    throw new HttpError(501);
  }
}
