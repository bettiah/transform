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
export class MatrixMediaR0ThumbnailServerNameMediaId {
  @Get('/_matrix/media/r0/thumbnail/:serverName/:mediaId')
  async getContentThumbnail(
    @Param('serverName') serverName: string,
    @Param('mediaId') mediaId: string,
    @QueryParam('width') width: number,
    @QueryParam('height') height: number,
    @QueryParam('method') method: string
  ): Promise<dto.GetContentThumbnailResponse429 | any> {
    throw new HttpError(501);
  }
}
