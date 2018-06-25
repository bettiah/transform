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
export class MatrixMediaR0PreviewUrl {
  @Get('/_matrix/media/r0/preview_url')
  async getUrlPreview(
    @QueryParam('url', { required: true })
    url: string,
    @QueryParam('ts') ts: number,
    @CurrentUser() session: Session
  ): Promise<dto.GetUrlPreviewResponse | dto.GetUrlPreviewResponse429 | any> {
    throw new HttpError(501);
  }
}
