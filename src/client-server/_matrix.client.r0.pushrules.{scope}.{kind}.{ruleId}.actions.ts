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
export class MatrixClientR0PushrulesScopeKindRuleIdActions {
  @Put('/_matrix/client/r0/pushrules/:scope/:kind/:ruleId/actions')
  async setPushRuleActions(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string,
    @Body({ required: true })
    body: dto.SetPushRuleActionsBody,
    @CurrentUser() session: Session
  ): Promise<any> {
    throw new HttpError(501);
  }
}
