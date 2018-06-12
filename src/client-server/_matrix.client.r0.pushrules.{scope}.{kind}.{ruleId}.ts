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
export class MatrixClientR0PushrulesScopeKindRuleId {
  @Get('/_matrix/client/r0/pushrules/:scope/:kind/:ruleId')
  async getPushRule(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string,
    @CurrentUser() user?: User
  ): Promise<dto.PushRuleResponse | any> {
    throw new HttpError(501);
  }

  @Put('/_matrix/client/r0/pushrules/:scope/:kind/:ruleId')
  async setPushRule(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string,
    @QueryParam('before') before: string,
    @QueryParam('after') after: string,
    @Body({ required: true })
    body: dto.SetPushRuleBody,
    @CurrentUser() user?: User
  ): Promise<dto.SetPushRuleResponse429 | any> {
    throw new HttpError(501);
  }

  @Delete('/_matrix/client/r0/pushrules/:scope/:kind/:ruleId')
  async deletePushRule(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string,
    @CurrentUser() user?: User
  ): Promise<any> {
    throw new HttpError(501);
  }
}
