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
export class MatrixClientR0DeleteDevices {
  @Post('/_matrix/client/r0/delete_devices')
  async deleteDevices(
    @Body({ required: true })
    body: dto.DeleteDevicesBody,
    @CurrentUser() user?: User
  ): Promise<dto.AuthenticationResponse | any> {
    throw new HttpError(501);
  }
}
