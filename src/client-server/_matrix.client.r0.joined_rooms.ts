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
export class MatrixClientR0JoinedRooms {
  @Get('/_matrix/client/r0/joined_rooms')
  async getJoinedRooms(
    @CurrentUser() session: Session
  ): Promise<dto.GetJoinedRoomsResponse | any> {
    throw new HttpError(501);
  }
}
