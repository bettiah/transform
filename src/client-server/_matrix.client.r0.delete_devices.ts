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
export class MatrixClientR0DeleteDevices {
  @Post('/_matrix/client/r0/delete_devices')
  async deleteDevices(
    @Body() body: dto.DeleteDevicesBody,
    @CurrentUser() session: Session
  ): Promise<dto.AuthenticationResponse | any> {
    throw new HttpError(501);
  }
}
