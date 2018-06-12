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
export class MatrixClientR0Pushrules {
  /**
   * @description : Retrieve all push rulesets for this user. Clients can "drill-down" on
   *the rulesets by suffixing a ``scope`` to this path e.g.
   *``/pushrules/global/``. This will return a subset of this data under the
   *specified key e.g. the ``global`` key.
   *
   * @responses : {
   *  "200": {
   *    "description": "All the push rulesets for this user.",
   *    "examples": {
   *      "application/json": {
   *        "global": {
   *          "content": [
   *            {
   *              "actions": [
   *                "notify",
   *                {
   *                  "set_tweak": "sound",
   *                  "value": "default"
   *                },
   *                {
   *                  "set_tweak": "highlight"
   *                }
   *              ],
   *              "default": true,
   *              "enabled": true,
   *              "pattern": "alice",
   *              "rule_id": ".m.rule.contains_user_name"
   *            }
   *          ],
   *          "override": [
   *            {
   *              "actions": [
   *                "dont_notify"
   *              ],
   *              "conditions": [],
   *              "default": true,
   *              "enabled": false,
   *              "rule_id": ".m.rule.master"
   *            },
   *            {
   *              "actions": [
   *                "dont_notify"
   *              ],
   *              "conditions": [
   *                {
   *                  "key": "content.msgtype",
   *                  "kind": "event_match",
   *                  "pattern": "m.notice"
   *                }
   *              ],
   *              "default": true,
   *              "enabled": true,
   *              "rule_id": ".m.rule.suppress_notices"
   *            }
   *          ],
   *          "room": [],
   *          "sender": [],
   *          "underride": [
   *            {
   *              "actions": [
   *                "notify",
   *                {
   *                  "set_tweak": "sound",
   *                  "value": "ring"
   *                },
   *                {
   *                  "set_tweak": "highlight",
   *                  "value": false
   *                }
   *              ],
   *              "conditions": [
   *                {
   *                  "key": "type",
   *                  "kind": "event_match",
   *                  "pattern": "m.call.invite"
   *                }
   *              ],
   *              "default": true,
   *              "enabled": true,
   *              "rule_id": ".m.rule.call"
   *            },
   *            {
   *              "actions": [
   *                "notify",
   *                {
   *                  "set_tweak": "sound",
   *                  "value": "default"
   *                },
   *                {
   *                  "set_tweak": "highlight"
   *                }
   *              ],
   *              "conditions": [
   *                {
   *                  "kind": "contains_display_name"
   *                }
   *              ],
   *              "default": true,
   *              "enabled": true,
   *              "rule_id": ".m.rule.contains_display_name"
   *            },
   *            {
   *              "actions": [
   *                "notify",
   *                {
   *                  "set_tweak": "sound",
   *                  "value": "default"
   *                },
   *                {
   *                  "set_tweak": "highlight",
   *                  "value": false
   *                }
   *              ],
   *              "conditions": [
   *                {
   *                  "is": "2",
   *                  "kind": "room_member_count"
   *                }
   *              ],
   *              "default": true,
   *              "enabled": true,
   *              "rule_id": ".m.rule.room_one_to_one"
   *            },
   *            {
   *              "actions": [
   *                "notify",
   *                {
   *                  "set_tweak": "sound",
   *                  "value": "default"
   *                },
   *                {
   *                  "set_tweak": "highlight",
   *                  "value": false
   *                }
   *              ],
   *              "conditions": [
   *                {
   *                  "key": "type",
   *                  "kind": "event_match",
   *                  "pattern": "m.room.member"
   *                },
   *                {
   *                  "key": "content.membership",
   *                  "kind": "event_match",
   *                  "pattern": "invite"
   *                },
   *                {
   *                  "key": "state_key",
   *                  "kind": "event_match",
   *                  "pattern": "@alice:example.com"
   *                }
   *              ],
   *              "default": true,
   *              "enabled": true,
   *              "rule_id": ".m.rule.invite_for_me"
   *            },
   *            {
   *              "actions": [
   *                "notify",
   *                {
   *                  "set_tweak": "highlight",
   *                  "value": false
   *                }
   *              ],
   *              "conditions": [
   *                {
   *                  "key": "type",
   *                  "kind": "event_match",
   *                  "pattern": "m.room.member"
   *                }
   *              ],
   *              "default": true,
   *              "enabled": true,
   *              "rule_id": ".m.rule.member_event"
   *            },
   *            {
   *              "actions": [
   *                "notify",
   *                {
   *                  "set_tweak": "highlight",
   *                  "value": false
   *                }
   *              ],
   *              "conditions": [
   *                {
   *                  "key": "type",
   *                  "kind": "event_match",
   *                  "pattern": "m.room.message"
   *                }
   *              ],
   *              "default": true,
   *              "enabled": true,
   *              "rule_id": ".m.rule.message"
   *            }
   *          ]
   *        }
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "global": {
   *          "allOf": [
   *            {
   *              "properties": {
   *                "content": {
   *                  "items": {
   *                    "allOf": [
   *                      {
   *                        "properties": {
   *                          "actions": {
   *                            "description": "The actions to perform when this rule is matched.",
   *                            "items": {
   *                              "type": [
   *                                "object",
   *                                "string"
   *                              ]
   *                            },
   *                            "type": "array"
   *                          },
   *                          "conditions": {
   *                            "description": "The conditions that must hold true for an event in order for a rule to be\napplied to an event. A rule with no conditions always matches. Only\napplicable to ``underride`` and ``override`` rules.",
   *                            "items": {
   *                              "allOf": [
   *                                {
   *                                  "properties": {
   *                                    "is": {
   *                                      "description": "Required for ``room_member_count`` conditions. A decimal integer\noptionally prefixed by one of, ==, <, >, >= or <=. A prefix of < matches\nrooms where the member count is strictly less than the given number and\nso forth. If no prefix is present, this parameter defaults to ==.",
   *                                      "type": "string"
   *                                    },
   *                                    "key": {
   *                                      "description": "Required for ``event_match`` conditions. The dot-separated field of the\nevent to match.",
   *                                      "type": "string",
   *                                      "x-example": "content.body"
   *                                    },
   *                                    "kind": {
   *                                      "enum": [
   *                                        "event_match",
   *                                        "contains_display_name",
   *                                        "room_member_count"
   *                                      ],
   *                                      "type": "string"
   *                                    },
   *                                    "pattern": {
   *                                      "description": "Required for ``event_match`` conditions. The glob-style pattern to\nmatch against. Patterns with no special glob characters should be\ntreated as having asterisks prepended and appended when testing the\ncondition.",
   *                                      "type": "string"
   *                                    }
   *                                  },
   *                                  "required": [
   *                                    "kind"
   *                                  ],
   *                                  "title": "PushCondition",
   *                                  "type": "object"
   *                                }
   *                              ]
   *                            },
   *                            "type": "array"
   *                          },
   *                          "default": {
   *                            "description": "Whether this is a default rule, or has been set explicitly.",
   *                            "type": "boolean"
   *                          },
   *                          "enabled": {
   *                            "description": "Whether the push rule is enabled or not.",
   *                            "type": "boolean"
   *                          },
   *                          "pattern": {
   *                            "description": "The glob-style pattern to match against.  Only applicable to ``content``\nrules.",
   *                            "type": "string"
   *                          },
   *                          "rule_id": {
   *                            "description": "The ID of this rule.",
   *                            "type": "string"
   *                          }
   *                        },
   *                        "required": [
   *                          "actions",
   *                          "default",
   *                          "enabled",
   *                          "rule_id"
   *                        ],
   *                        "title": "PushRule",
   *                        "type": "object"
   *                      }
   *                    ],
   *                    "title": "PushRule",
   *                    "type": "object"
   *                  },
   *                  "type": "array"
   *                },
   *                "override": {
   *                  "items": {
   *                    "allOf": [
   *                      {
   *                        "properties": {
   *                          "actions": {
   *                            "description": "The actions to perform when this rule is matched.",
   *                            "items": {
   *                              "type": [
   *                                "object",
   *                                "string"
   *                              ]
   *                            },
   *                            "type": "array"
   *                          },
   *                          "conditions": {
   *                            "description": "The conditions that must hold true for an event in order for a rule to be\napplied to an event. A rule with no conditions always matches. Only\napplicable to ``underride`` and ``override`` rules.",
   *                            "items": {
   *                              "allOf": [
   *                                {
   *                                  "properties": {
   *                                    "is": {
   *                                      "description": "Required for ``room_member_count`` conditions. A decimal integer\noptionally prefixed by one of, ==, <, >, >= or <=. A prefix of < matches\nrooms where the member count is strictly less than the given number and\nso forth. If no prefix is present, this parameter defaults to ==.",
   *                                      "type": "string"
   *                                    },
   *                                    "key": {
   *                                      "description": "Required for ``event_match`` conditions. The dot-separated field of the\nevent to match.",
   *                                      "type": "string",
   *                                      "x-example": "content.body"
   *                                    },
   *                                    "kind": {
   *                                      "enum": [
   *                                        "event_match",
   *                                        "contains_display_name",
   *                                        "room_member_count"
   *                                      ],
   *                                      "type": "string"
   *                                    },
   *                                    "pattern": {
   *                                      "description": "Required for ``event_match`` conditions. The glob-style pattern to\nmatch against. Patterns with no special glob characters should be\ntreated as having asterisks prepended and appended when testing the\ncondition.",
   *                                      "type": "string"
   *                                    }
   *                                  },
   *                                  "required": [
   *                                    "kind"
   *                                  ],
   *                                  "title": "PushCondition",
   *                                  "type": "object"
   *                                }
   *                              ]
   *                            },
   *                            "type": "array"
   *                          },
   *                          "default": {
   *                            "description": "Whether this is a default rule, or has been set explicitly.",
   *                            "type": "boolean"
   *                          },
   *                          "enabled": {
   *                            "description": "Whether the push rule is enabled or not.",
   *                            "type": "boolean"
   *                          },
   *                          "pattern": {
   *                            "description": "The glob-style pattern to match against.  Only applicable to ``content``\nrules.",
   *                            "type": "string"
   *                          },
   *                          "rule_id": {
   *                            "description": "The ID of this rule.",
   *                            "type": "string"
   *                          }
   *                        },
   *                        "required": [
   *                          "actions",
   *                          "default",
   *                          "enabled",
   *                          "rule_id"
   *                        ],
   *                        "title": "PushRule",
   *                        "type": "object"
   *                      }
   *                    ],
   *                    "title": "PushRule",
   *                    "type": "object"
   *                  },
   *                  "type": "array"
   *                },
   *                "room": {
   *                  "items": {
   *                    "allOf": [
   *                      {
   *                        "properties": {
   *                          "actions": {
   *                            "description": "The actions to perform when this rule is matched.",
   *                            "items": {
   *                              "type": [
   *                                "object",
   *                                "string"
   *                              ]
   *                            },
   *                            "type": "array"
   *                          },
   *                          "conditions": {
   *                            "description": "The conditions that must hold true for an event in order for a rule to be\napplied to an event. A rule with no conditions always matches. Only\napplicable to ``underride`` and ``override`` rules.",
   *                            "items": {
   *                              "allOf": [
   *                                {
   *                                  "properties": {
   *                                    "is": {
   *                                      "description": "Required for ``room_member_count`` conditions. A decimal integer\noptionally prefixed by one of, ==, <, >, >= or <=. A prefix of < matches\nrooms where the member count is strictly less than the given number and\nso forth. If no prefix is present, this parameter defaults to ==.",
   *                                      "type": "string"
   *                                    },
   *                                    "key": {
   *                                      "description": "Required for ``event_match`` conditions. The dot-separated field of the\nevent to match.",
   *                                      "type": "string",
   *                                      "x-example": "content.body"
   *                                    },
   *                                    "kind": {
   *                                      "enum": [
   *                                        "event_match",
   *                                        "contains_display_name",
   *                                        "room_member_count"
   *                                      ],
   *                                      "type": "string"
   *                                    },
   *                                    "pattern": {
   *                                      "description": "Required for ``event_match`` conditions. The glob-style pattern to\nmatch against. Patterns with no special glob characters should be\ntreated as having asterisks prepended and appended when testing the\ncondition.",
   *                                      "type": "string"
   *                                    }
   *                                  },
   *                                  "required": [
   *                                    "kind"
   *                                  ],
   *                                  "title": "PushCondition",
   *                                  "type": "object"
   *                                }
   *                              ]
   *                            },
   *                            "type": "array"
   *                          },
   *                          "default": {
   *                            "description": "Whether this is a default rule, or has been set explicitly.",
   *                            "type": "boolean"
   *                          },
   *                          "enabled": {
   *                            "description": "Whether the push rule is enabled or not.",
   *                            "type": "boolean"
   *                          },
   *                          "pattern": {
   *                            "description": "The glob-style pattern to match against.  Only applicable to ``content``\nrules.",
   *                            "type": "string"
   *                          },
   *                          "rule_id": {
   *                            "description": "The ID of this rule.",
   *                            "type": "string"
   *                          }
   *                        },
   *                        "required": [
   *                          "actions",
   *                          "default",
   *                          "enabled",
   *                          "rule_id"
   *                        ],
   *                        "title": "PushRule",
   *                        "type": "object"
   *                      }
   *                    ],
   *                    "title": "PushRule",
   *                    "type": "object"
   *                  },
   *                  "type": "array"
   *                },
   *                "sender": {
   *                  "items": {
   *                    "allOf": [
   *                      {
   *                        "properties": {
   *                          "actions": {
   *                            "description": "The actions to perform when this rule is matched.",
   *                            "items": {
   *                              "type": [
   *                                "object",
   *                                "string"
   *                              ]
   *                            },
   *                            "type": "array"
   *                          },
   *                          "conditions": {
   *                            "description": "The conditions that must hold true for an event in order for a rule to be\napplied to an event. A rule with no conditions always matches. Only\napplicable to ``underride`` and ``override`` rules.",
   *                            "items": {
   *                              "allOf": [
   *                                {
   *                                  "properties": {
   *                                    "is": {
   *                                      "description": "Required for ``room_member_count`` conditions. A decimal integer\noptionally prefixed by one of, ==, <, >, >= or <=. A prefix of < matches\nrooms where the member count is strictly less than the given number and\nso forth. If no prefix is present, this parameter defaults to ==.",
   *                                      "type": "string"
   *                                    },
   *                                    "key": {
   *                                      "description": "Required for ``event_match`` conditions. The dot-separated field of the\nevent to match.",
   *                                      "type": "string",
   *                                      "x-example": "content.body"
   *                                    },
   *                                    "kind": {
   *                                      "enum": [
   *                                        "event_match",
   *                                        "contains_display_name",
   *                                        "room_member_count"
   *                                      ],
   *                                      "type": "string"
   *                                    },
   *                                    "pattern": {
   *                                      "description": "Required for ``event_match`` conditions. The glob-style pattern to\nmatch against. Patterns with no special glob characters should be\ntreated as having asterisks prepended and appended when testing the\ncondition.",
   *                                      "type": "string"
   *                                    }
   *                                  },
   *                                  "required": [
   *                                    "kind"
   *                                  ],
   *                                  "title": "PushCondition",
   *                                  "type": "object"
   *                                }
   *                              ]
   *                            },
   *                            "type": "array"
   *                          },
   *                          "default": {
   *                            "description": "Whether this is a default rule, or has been set explicitly.",
   *                            "type": "boolean"
   *                          },
   *                          "enabled": {
   *                            "description": "Whether the push rule is enabled or not.",
   *                            "type": "boolean"
   *                          },
   *                          "pattern": {
   *                            "description": "The glob-style pattern to match against.  Only applicable to ``content``\nrules.",
   *                            "type": "string"
   *                          },
   *                          "rule_id": {
   *                            "description": "The ID of this rule.",
   *                            "type": "string"
   *                          }
   *                        },
   *                        "required": [
   *                          "actions",
   *                          "default",
   *                          "enabled",
   *                          "rule_id"
   *                        ],
   *                        "title": "PushRule",
   *                        "type": "object"
   *                      }
   *                    ],
   *                    "title": "PushRule",
   *                    "type": "object"
   *                  },
   *                  "type": "array"
   *                },
   *                "underride": {
   *                  "items": {
   *                    "allOf": [
   *                      {
   *                        "properties": {
   *                          "actions": {
   *                            "description": "The actions to perform when this rule is matched.",
   *                            "items": {
   *                              "type": [
   *                                "object",
   *                                "string"
   *                              ]
   *                            },
   *                            "type": "array"
   *                          },
   *                          "conditions": {
   *                            "description": "The conditions that must hold true for an event in order for a rule to be\napplied to an event. A rule with no conditions always matches. Only\napplicable to ``underride`` and ``override`` rules.",
   *                            "items": {
   *                              "allOf": [
   *                                {
   *                                  "properties": {
   *                                    "is": {
   *                                      "description": "Required for ``room_member_count`` conditions. A decimal integer\noptionally prefixed by one of, ==, <, >, >= or <=. A prefix of < matches\nrooms where the member count is strictly less than the given number and\nso forth. If no prefix is present, this parameter defaults to ==.",
   *                                      "type": "string"
   *                                    },
   *                                    "key": {
   *                                      "description": "Required for ``event_match`` conditions. The dot-separated field of the\nevent to match.",
   *                                      "type": "string",
   *                                      "x-example": "content.body"
   *                                    },
   *                                    "kind": {
   *                                      "enum": [
   *                                        "event_match",
   *                                        "contains_display_name",
   *                                        "room_member_count"
   *                                      ],
   *                                      "type": "string"
   *                                    },
   *                                    "pattern": {
   *                                      "description": "Required for ``event_match`` conditions. The glob-style pattern to\nmatch against. Patterns with no special glob characters should be\ntreated as having asterisks prepended and appended when testing the\ncondition.",
   *                                      "type": "string"
   *                                    }
   *                                  },
   *                                  "required": [
   *                                    "kind"
   *                                  ],
   *                                  "title": "PushCondition",
   *                                  "type": "object"
   *                                }
   *                              ]
   *                            },
   *                            "type": "array"
   *                          },
   *                          "default": {
   *                            "description": "Whether this is a default rule, or has been set explicitly.",
   *                            "type": "boolean"
   *                          },
   *                          "enabled": {
   *                            "description": "Whether the push rule is enabled or not.",
   *                            "type": "boolean"
   *                          },
   *                          "pattern": {
   *                            "description": "The glob-style pattern to match against.  Only applicable to ``content``\nrules.",
   *                            "type": "string"
   *                          },
   *                          "rule_id": {
   *                            "description": "The ID of this rule.",
   *                            "type": "string"
   *                          }
   *                        },
   *                        "required": [
   *                          "actions",
   *                          "default",
   *                          "enabled",
   *                          "rule_id"
   *                        ],
   *                        "title": "PushRule",
   *                        "type": "object"
   *                      }
   *                    ],
   *                    "title": "PushRule",
   *                    "type": "object"
   *                  },
   *                  "type": "array"
   *                }
   *              },
   *              "type": "object"
   *            }
   *          ],
   *          "description": "The global ruleset.",
   *          "title": "Ruleset",
   *          "type": "object"
   *        }
   *      },
   *      "required": [
   *        "global"
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
   * @summary : Retrieve all push rulesets.
   *
   */
  @Get('/_matrix/client/r0/pushrules/')
  async getPushRules(
    @CurrentUser() user?: User
  ): Promise<dto.GetPushRulesResponse | any> {
    throw new HttpError(501);
  }
}
