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
export class MatrixMediaR0DownloadServerNameMediaId {
  @Get('/_matrix/media/r0/download/:serverName/:mediaId')
  async getContent(
    @Param('serverName') serverName: string,
    @Param('mediaId') mediaId: string
  ): Promise<dto.GetContentResponse429 | any> {
    throw new HttpError(501);
  }
}
