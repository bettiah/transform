
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
  
  import * as dto from './dto';  
  
@JsonController("")
export class MatrixClientR0PushrulesScopeKindRuleIdEnabled {
@Put("/_matrix/client/r0/pushrules/{scope}/{kind}/{ruleId}/enabled")
async setPushRuleEnabled(@Param("scope") scope:string,@Param("kind") kind:string,@Param("ruleId") ruleId:string,@Body({ required: true }) body: dto.SetPushRuleEnabledBody) : Promise< any > {
 throw new HttpError(501);
}

}

