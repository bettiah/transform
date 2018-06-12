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
export class MatrixClientR0PushrulesScopeKindRuleIdActions {
  /**
   * @description : This endpoint allows clients to change the actions of a push rule.
   *This can be used to change the actions of builtin rules.
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
   *    "x-example": "room"
   *  },
   *  {
   *    "description": "The identifier for the rule.\n",
   *    "in": "path",
   *    "name": "ruleId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "#spam:example.com"
   *  },
   *  {
   *    "description": "The action(s) to perform when the conditions for this rule are met.\n",
   *    "in": "body",
   *    "name": "body",
   *    "required": true,
   *    "schema": {
   *      "example": {
   *        "actions": [
   *          "notify"
   *        ]
   *      },
   *      "properties": {
   *        "actions": {
   *          "description": "The action(s) to perform for this rule.",
   *          "items": {
   *            "enum": [
   *              "notify",
   *              "dont_notify",
   *              "coalesce",
   *              "set_tweak"
   *            ],
   *            "type": "string"
   *          },
   *          "type": "array"
   *        }
   *      },
   *      "required": [
   *        "actions"
   *      ],
   *      "type": "object"
   *    }
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The actions for the push rule were set.",
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
   * @summary : Set the actions for a push rule.
   *
   */
  @Put('/_matrix/client/r0/pushrules/:scope/:kind/:ruleId/actions')
  async setPushRuleActions(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string,
    @Body({ required: true })
    body: dto.SetPushRuleActionsBody,
    @CurrentUser() user?: User
  ): Promise<any> {
    throw new HttpError(501);
  }
}
