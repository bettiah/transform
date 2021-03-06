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
export class MatrixClientR0InitialSync {
  @Get('/_matrix/client/r0/initialSync')
  async initialSync(
    @QueryParam('limit') limit: number,
    @QueryParam('archived') archived: boolean,
    @CurrentUser() session: Session
  ): Promise<dto.InitialSyncResponse | any> {
    throw new HttpError(501);
  }
}
