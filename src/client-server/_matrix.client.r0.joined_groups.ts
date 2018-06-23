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

import { User } from '../model';

@JsonController('')
export class MatrixClientR0JoinedGroups {
  @Get('/_matrix/client/r0/joined_groups')
  async getJoinedGroups(@CurrentUser() user?: User): Promise<any> {
    // TODO - implement properly
    return { groups: [] };
  }
}
