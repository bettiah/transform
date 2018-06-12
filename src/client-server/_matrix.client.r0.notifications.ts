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
export class MatrixClientR0Notifications {
  @Get('/_matrix/client/r0/notifications')
  async getNotifications(
    @QueryParam('from') from: string,
    @QueryParam('limit') limit: number,
    @QueryParam('only') only: string,
    @CurrentUser() user?: User
  ): Promise<dto.GetNotificationsResponse | any> {
    throw new HttpError(501);
  }
}
