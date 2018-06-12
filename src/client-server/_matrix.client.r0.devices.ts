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
export class MatrixClientR0Devices {
  @Get('/_matrix/client/r0/devices')
  async getDevices(
    @CurrentUser() user?: User
  ): Promise<dto.GetDevicesResponse | any> {
    throw new HttpError(501);
  }
}
