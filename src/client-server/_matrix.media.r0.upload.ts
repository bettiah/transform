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
export class MatrixMediaR0Upload {
  @Post('/_matrix/media/r0/upload')
  async uploadContent(
    @HeaderParam('Content-Type') contentType: string,
    @QueryParam('filename') filename: string,
    @Body({ required: true })
    body: string,
    @CurrentUser() session: Session
  ): Promise<dto.UploadContentResponse | dto.UploadContentResponse429 | any> {
    throw new HttpError(501);
  }
}
