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

@JsonController('')
export class MatrixClientR0PushrulesScopeKindRuleIdEnabled {
  /**
   * @description : This endpoint allows clients to enable or disable the specified push rule.
   *
   * @parameters : [
   *  {
   *    "description": "``global`` to specify global rules.",
   *    "in": "path",
   *    "name": "scope",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "global"
   *  },
   *  {
   *    "description": "The kind of rule\n",
   *    "enum": [
   *      "override",
   *      "underride",
   *      "sender",
   *      "room",
   *      "content"
   *    ],
   *    "in": "path",
   *    "name": "kind",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "content"
   *  },
   *  {
   *    "description": "The identifier for the rule.\n",
   *    "in": "path",
   *    "name": "ruleId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "nocake"
   *  },
   *  {
   *    "description": "Whether the push rule is enabled or not.\n",
   *    "in": "body",
   *    "name": "body",
   *    "required": true,
   *    "schema": {
   *      "example": {
   *        "enabled": true
   *      },
   *      "properties": {
   *        "enabled": {
   *          "description": "Whether the push rule is enabled or not.",
   *          "type": "boolean"
   *        }
   *      },
   *      "required": [
   *        "enabled"
   *      ],
   *      "type": "object"
   *    }
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The push rule was enabled or disabled.",
   *    "examples": {
   *      "application/json": {}
   *    },
   *    "schema": {
   *      "type": "object"
   *    }
   *  }
   *}
   *
   * @security : [
   *  {
   *    "accessToken": []
   *  }
   *]
   *
   * @summary : Enable or disable a push rule.
   *
   */
  @Put('/_matrix/client/r0/pushrules/:scope/:kind/:ruleId/enabled')
  async setPushRuleEnabled(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string,
    @Body({ required: true })
    body: dto.SetPushRuleEnabledBody
  ): Promise<any> {
    throw new HttpError(501);
  }
}
