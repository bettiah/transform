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
export class MatrixClientR0SendToDeviceEventTypeTxnId {
  @Put('/_matrix/client/r0/sendToDevice/:eventType/:txnId')
  async sendToDevice(
    @Param('eventType') eventType: string,
    @Param('txnId') txnId: string,
    @Body({ required: true })
    body: dto.SendToDeviceBody,
    @CurrentUser() user?: User
  ): Promise<any> {
    throw new HttpError(501);
  }
}
