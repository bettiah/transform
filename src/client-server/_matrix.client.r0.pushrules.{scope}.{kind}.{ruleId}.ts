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
export class MatrixClientR0PushrulesScopeKindRuleId {
  /**
   * @description : Retrieve a single specified push rule.
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
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The specific push rule. This will also include keys specific to the\nrule itself such as the rule's ``actions`` and ``conditions`` if set.",
   *    "examples": {
   *      "application/json": {
   *        "actions": [
   *          "dont_notify"
   *        ],
   *        "default": false,
   *        "enabled": true,
   *        "pattern": "cake*lie",
   *        "rule_id": "nocake"
   *      }
   *    },
   *    "schema": {
   *      "allOf": [
   *        {
   *          "properties": {
   *            "actions": {
   *              "description": "The actions to perform when this rule is matched.",
   *              "items": {
   *                "type": [
   *                  "object",
   *                  "string"
   *                ]
   *              },
   *              "type": "array"
   *            },
   *            "conditions": {
   *              "description": "The conditions that must hold true for an event in order for a rule to be\napplied to an event. A rule with no conditions always matches. Only\napplicable to ``underride`` and ``override`` rules.",
   *              "items": {
   *                "allOf": [
   *                  {
   *                    "properties": {
   *                      "is": {
   *                        "description": "Required for ``room_member_count`` conditions. A decimal integer\noptionally prefixed by one of, ==, <, >, >= or <=. A prefix of < matches\nrooms where the member count is strictly less than the given number and\nso forth. If no prefix is present, this parameter defaults to ==.",
   *                        "type": "string"
   *                      },
   *                      "key": {
   *                        "description": "Required for ``event_match`` conditions. The dot-separated field of the\nevent to match.",
   *                        "type": "string",
   *                        "x-example": "content.body"
   *                      },
   *                      "kind": {
   *                        "enum": [
   *                          "event_match",
   *                          "contains_display_name",
   *                          "room_member_count"
   *                        ],
   *                        "type": "string"
   *                      },
   *                      "pattern": {
   *                        "description": "Required for ``event_match`` conditions. The glob-style pattern to\nmatch against. Patterns with no special glob characters should be\ntreated as having asterisks prepended and appended when testing the\ncondition.",
   *                        "type": "string"
   *                      }
   *                    },
   *                    "required": [
   *                      "kind"
   *                    ],
   *                    "title": "PushCondition",
   *                    "type": "object"
   *                  }
   *                ]
   *              },
   *              "type": "array"
   *            },
   *            "default": {
   *              "description": "Whether this is a default rule, or has been set explicitly.",
   *              "type": "boolean"
   *            },
   *            "enabled": {
   *              "description": "Whether the push rule is enabled or not.",
   *              "type": "boolean"
   *            },
   *            "pattern": {
   *              "description": "The glob-style pattern to match against.  Only applicable to ``content``\nrules.",
   *              "type": "string"
   *            },
   *            "rule_id": {
   *              "description": "The ID of this rule.",
   *              "type": "string"
   *            }
   *          },
   *          "required": [
   *            "actions",
   *            "default",
   *            "enabled",
   *            "rule_id"
   *          ],
   *          "title": "PushRule",
   *          "type": "object"
   *        }
   *      ],
   *      "description": "The push rule.",
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
   * @summary : Retrieve a push rule.
   *
   */
  @Get('/_matrix/client/r0/pushrules/:scope/:kind/:ruleId')
  async getPushRule(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string
  ): Promise<dto.PushRuleResponse | any> {
    throw new HttpError(501);
  }

  /**
   * @description : This endpoint allows the creation, modification and deletion of pushers
   *for this user ID. The behaviour of this endpoint varies depending on the
   *values in the JSON body.
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
   *    "description": "Use 'before' with a ``rule_id`` as its value to make the new rule the\nnext-most important rule with respect to the given user defined rule.\nIt is not possible to add a rule relative to a predefined server rule.",
   *    "in": "query",
   *    "name": "before",
   *    "required": false,
   *    "type": "string",
   *    "x-example": "someRuleId"
   *  },
   *  {
   *    "description": "This makes the new rule the next-less important rule relative to the\ngiven user defined rule. It is not possible to add a rule relative\nto a predefined server rule.",
   *    "in": "query",
   *    "name": "after",
   *    "required": false,
   *    "type": "string",
   *    "x-example": "anotherRuleId"
   *  },
   *  {
   *    "description": "The push rule data. Additional top-level keys may be present depending\non the parameters for the rule ``kind``.",
   *    "in": "body",
   *    "name": "pushrule",
   *    "required": true,
   *    "schema": {
   *      "example": {
   *        "actions": [
   *          "notify"
   *        ],
   *        "pattern": "cake*lie"
   *      },
   *      "properties": {
   *        "actions": {
   *          "description": "The action(s) to perform when the conditions for this rule are met.",
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
   *        },
   *        "conditions": {
   *          "description": "The conditions that must hold true for an event in order for a\nrule to be applied to an event. A rule with no conditions\nalways matches. Only applicable to ``underride`` and ``override`` rules.",
   *          "items": {
   *            "allOf": [
   *              {
   *                "properties": {
   *                  "is": {
   *                    "description": "Required for ``room_member_count`` conditions. A decimal integer\noptionally prefixed by one of, ==, <, >, >= or <=. A prefix of < matches\nrooms where the member count is strictly less than the given number and\nso forth. If no prefix is present, this parameter defaults to ==.",
   *                    "type": "string"
   *                  },
   *                  "key": {
   *                    "description": "Required for ``event_match`` conditions. The dot-separated field of the\nevent to match.",
   *                    "type": "string",
   *                    "x-example": "content.body"
   *                  },
   *                  "kind": {
   *                    "enum": [
   *                      "event_match",
   *                      "contains_display_name",
   *                      "room_member_count"
   *                    ],
   *                    "type": "string"
   *                  },
   *                  "pattern": {
   *                    "description": "Required for ``event_match`` conditions. The glob-style pattern to\nmatch against. Patterns with no special glob characters should be\ntreated as having asterisks prepended and appended when testing the\ncondition.",
   *                    "type": "string"
   *                  }
   *                },
   *                "required": [
   *                  "kind"
   *                ],
   *                "title": "PushCondition",
   *                "type": "object"
   *              }
   *            ],
   *            "type": "object"
   *          },
   *          "type": "array"
   *        },
   *        "pattern": {
   *          "description": "Only applicable to ``content`` rules. The glob-style pattern to match against.",
   *          "type": "string"
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
   *    "description": "The pusher was set.",
   *    "examples": {
   *      "application/json": {}
   *    },
   *    "schema": {
   *      "type": "object"
   *    }
   *  },
   *  "400": {
   *    "description": "There was a problem configuring this push rule.",
   *    "examples": {
   *      "application/json": {
   *        "errcode": "M_UNKNOWN",
   *        "error": "before/after rule not found: someRuleId"
   *      }
   *    },
   *    "schema": {
   *      "type": "object"
   *    }
   *  },
   *  "429": {
   *    "description": "This request was rate-limited.",
   *    "schema": {
   *      "description": "A Matrix-level Error",
   *      "properties": {
   *        "errcode": {
   *          "description": "An error code.",
   *          "type": "string"
   *        },
   *        "error": {
   *          "description": "A human-readable error message.",
   *          "type": "string"
   *        }
   *      },
   *      "required": [
   *        "errcode"
   *      ],
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
   * @summary : Add or change a push rule.
   *
   */
  @Put('/_matrix/client/r0/pushrules/:scope/:kind/:ruleId')
  async setPushRule(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string,
    @QueryParam('before') before: string,
    @QueryParam('after') after: string,
    @Body({ required: true })
    body: dto.SetPushRuleBody
  ): Promise<dto.SetPushRuleResponse429 | any> {
    throw new HttpError(501);
  }

  /**
   * @description : This endpoint removes the push rule defined in the path.
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
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The push rule was deleted.",
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
   * @summary : Delete a push rule.
   *
   */
  @Delete('/_matrix/client/r0/pushrules/:scope/:kind/:ruleId')
  async deletePushRule(
    @Param('scope') scope: string,
    @Param('kind') kind: string,
    @Param('ruleId') ruleId: string
  ): Promise<any> {
    throw new HttpError(501);
  }
}
