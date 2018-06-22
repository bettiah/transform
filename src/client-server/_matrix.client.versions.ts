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

const config = require('../../config.json');

@JsonController('')
export class MatrixClientVersions {
  @Get('/_matrix/client/versions')
  async getVersions(): Promise<dto.GetVersionsResponse | any> {
    return { versions: config['supported_versions'] };
  }
}
