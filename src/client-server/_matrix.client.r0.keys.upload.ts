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
export class MatrixClientR0KeysUpload {
  @Post('/_matrix/client/r0/keys/upload')
  async uploadKeys(
    @Body({ required: true })
    body: dto.UploadKeysBody,
    @CurrentUser() user?: User
  ): Promise<dto.UploadKeysResponse | any> {
    throw new HttpError(501);
  }
}
