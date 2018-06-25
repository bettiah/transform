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
export class MatrixClientR0PublicRooms {
  @Get('/_matrix/client/r0/publicRooms')
  async getPublicRooms(
    @QueryParam('limit') limit: number,
    @QueryParam('since') since: string,
    @QueryParam('server') server: string
  ): Promise<dto.GetPublicRoomsResponse | any> {
    throw new HttpError(501);
  }

  @Post('/_matrix/client/r0/publicRooms')
  async queryPublicRooms(
    @QueryParam('server') server: string,
    @Body({ required: true })
    body: dto.QueryPublicRoomsBody,
    @CurrentUser() session: Session
  ): Promise<dto.QueryPublicRoomsResponse | any> {
    throw new HttpError(501);
  }
}
