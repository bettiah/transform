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
export class MatrixClientR0EventsEventId {
  @Get('/_matrix/client/r0/events/:eventId')
  async getOneEvent(
    @Param('eventId') eventId: string,
    @CurrentUser() user?: User
  ): Promise<dto._EventResponse | any> {
    throw new HttpError(501);
  }
}
