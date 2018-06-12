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
export class MatrixMediaR0Upload {
  @Post('/_matrix/media/r0/upload')
  async uploadContent(
    @HeaderParam('Content-Type', { required: true })
    contentType: string,
    @QueryParam('filename', { required: true })
    filename: string,
    @Body({ required: true })
    body: string,
    @CurrentUser() user?: User
  ): Promise<dto.UploadContentResponse | dto.UploadContentResponse429 | any> {
    throw new HttpError(501);
  }
}
