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
export class MatrixClientR0Search {
  @Post('/_matrix/client/r0/search')
  async search(
    @QueryParam('next_batch') nextBatch: string,
    @Body() body: dto.SearchBody,
    @CurrentUser() session: Session
  ): Promise<dto.ResultsResponse | dto.SearchResponse429 | any> {
    throw new HttpError(501);
  }
}
