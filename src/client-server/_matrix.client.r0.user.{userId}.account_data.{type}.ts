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
export class MatrixClientR0UserUserIdAccountDataType {
  @Put('/_matrix/client/r0/user/:userId/account_data/:type')
  async setAccountData(
    @Param('userId') userId: string,
    @Param('type') type: string,
    @Body({ required: true })
    body: any,
    @CurrentUser() session: Session
  ): Promise<any> {
    console.log('type', type, 'body', body);
    // TODO - implement properly
    return {};
  }
}
