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
export class MatrixClientR0Events {
  @Get('/_matrix/client/r0/events')
  async getEvents(
    @QueryParam('from') from: string,
    @QueryParam('timeout') timeout: number,
    @CurrentUser() session: Session
  ): Promise<dto.GetEventsResponse | any> {
    throw new HttpError(501);
  }
}
