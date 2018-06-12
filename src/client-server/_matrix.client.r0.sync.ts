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
export class MatrixClientR0Sync {
  /**
   * @description : Synchronise the client's state with the latest state on the server.
   *Clients use this API when they first log in to get an initial snapshot
   *of the state on the server, and then continue to call this API to get
   *incremental deltas to the state, and to receive new messages.
   *
   * @parameters : [
   *  {
   *    "description": "The ID of a filter created using the filter API or a filter JSON\nobject encoded as a string. The server will detect whether it is\nan ID or a JSON object by whether the first character is a ``\"{\"``\nopen brace. Passing the JSON inline is best suited to one off\nrequests. Creating a filter using the filter API is recommended for\nclients that reuse the same filter multiple times, for example in\nlong poll requests.",
   *    "in": "query",
   *    "name": "filter",
   *    "type": "string",
   *    "x-example": "66696p746572"
   *  },
   *  {
   *    "description": "A point in time to continue a sync from.",
   *    "in": "query",
   *    "name": "since",
   *    "type": "string",
   *    "x-example": "s72594_4483_1934"
   *  },
   *  {
   *    "description": "Controls whether to include the full state for all rooms the user\nis a member of.\n\nIf this is set to ``true``, then all state events will be returned,\neven if ``since`` is non-empty. The timeline will still be limited\nby the ``since`` parameter. In this case, the ``timeout`` parameter\nwill be ignored and the query will return immediately, possibly with\nan empty timeline.\n\nIf ``false``, and ``since`` is non-empty, only state which has\nchanged since the point indicated by ``since`` will be returned.\n\nBy default, this is ``false``.",
   *    "in": "query",
   *    "name": "full_state",
   *    "type": "boolean",
   *    "x-example": "false"
   *  },
   *  {
   *    "description": "Controls whether the client is automatically marked as online by\npolling this API. If this parameter is omitted then the client is\nautomatically marked as online when it uses this API. Otherwise if\nthe parameter is set to \"offline\" then the client is not marked as\nbeing online when it uses this API.",
   *    "enum": [
   *      "offline"
   *    ],
   *    "in": "query",
   *    "name": "set_presence",
   *    "type": "string",
   *    "x-example": "offline"
   *  },
   *  {
   *    "description": "The maximum time to wait, in milliseconds, before returning this\nrequest. If no events (or other data) become available before this\ntime elapses, the server will return a response with empty fields.\n\nBy default, this is ``0``, so the server will return immediately\neven if the response is empty.",
   *    "in": "query",
   *    "name": "timeout",
   *    "type": "integer",
   *    "x-example": 30000
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The initial snapshot or delta for the client to use to update their state.",
   *    "examples": {
   *      "application/json": {
   *        "account_data": {
   *          "events": [
   *            {
   *              "content": {
   *                "custom_config_key": "custom_config_value"
   *              },
   *              "type": "org.example.custom.config"
   *            }
   *          ]
   *        },
   *        "next_batch": "s72595_4483_1934",
   *        "presence": {
   *          "events": [
   *            {
   *              "content": {
   *                "presence": "online"
   *              },
   *              "sender": "@alice:example.com",
   *              "type": "m.presence"
   *            }
   *          ]
   *        },
   *        "rooms": {
   *          "invite": {
   *            "!696r7674:example.com": {
   *              "invite_state": {
   *                "events": [
   *                  {
   *                    "content": {
   *                      "name": "My Room Name"
   *                    },
   *                    "sender": "@alice:example.com",
   *                    "state_key": "",
   *                    "type": "m.room.name"
   *                  },
   *                  {
   *                    "content": {
   *                      "membership": "invite"
   *                    },
   *                    "sender": "@alice:example.com",
   *                    "state_key": "@bob:example.com",
   *                    "type": "m.room.member"
   *                  }
   *                ]
   *              }
   *            }
   *          },
   *          "join": {
   *            "!726s6s6q:example.com": {
   *              "account_data": {
   *                "events": [
   *                  {
   *                    "content": {
   *                      "tags": {
   *                        "work": {
   *                          "order": 1
   *                        }
   *                      }
   *                    },
   *                    "type": "m.tag"
   *                  },
   *                  {
   *                    "content": {
   *                      "custom_config_key": "custom_config_value"
   *                    },
   *                    "type": "org.example.custom.room.config"
   *                  }
   *                ]
   *              },
   *              "ephemeral": {
   *                "events": [
   *                  {
   *                    "content": {
   *                      "user_ids": [
   *                        "@alice:example.com"
   *                      ]
   *                    },
   *                    "type": "m.typing"
   *                  }
   *                ]
   *              },
   *              "state": {
   *                "events": [
   *                  {
   *                    "content": {
   *                      "membership": "join"
   *                    },
   *                    "event_id": "$66697273743031:example.com",
   *                    "origin_server_ts": 1417731086795,
   *                    "sender": "@alice:example.com",
   *                    "state_key": "@alice:example.com",
   *                    "type": "m.room.member"
   *                  }
   *                ]
   *              },
   *              "timeline": {
   *                "events": [
   *                  {
   *                    "content": {
   *                      "membership": "join"
   *                    },
   *                    "event_id": "$7365636s6r6432:example.com",
   *                    "origin_server_ts": 1417731086795,
   *                    "prev_content": {
   *                      "membership": "invite"
   *                    },
   *                    "sender": "@bob:example.com",
   *                    "state_key": "@bob:example.com",
   *                    "type": "m.room.member"
   *                  },
   *                  {
   *                    "age": 124524,
   *                    "content": {
   *                      "body": "I am a fish",
   *                      "msgtype": "m.text"
   *                    },
   *                    "event_id": "$74686972643033:example.com",
   *                    "origin_server_ts": 1417731086797,
   *                    "sender": "@alice:example.com",
   *                    "txn_id": "1234",
   *                    "type": "m.room.message"
   *                  }
   *                ],
   *                "limited": true,
   *                "prev_batch": "t34-23535_0_0"
   *              }
   *            }
   *          },
   *          "leave": {}
   *        }
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "account_data": {
   *          "allOf": [
   *            {
   *              "properties": {
   *                "events": {
   *                  "description": "List of events",
   *                  "items": {
   *                    "allOf": [
   *                      {
   *                        "properties": {
   *                          "content": {
   *                            "description": "The content of this event. The fields in this object will vary depending on the type of event.",
   *                            "title": "EventContent",
   *                            "type": "object"
   *                          },
   *                          "event_id": {
   *                            "description": "The ID of this event, if applicable.",
   *                            "type": "string"
   *                          },
   *                          "origin_server_ts": {
   *                            "description": "Timestamp in milliseconds on originating homeserver when this event was sent.",
   *                            "format": "int64",
   *                            "type": "integer"
   *                          },
   *                          "sender": {
   *                            "description": "The MXID of the user who sent this event.",
   *                            "type": "string"
   *                          },
   *                          "state_key": {
   *                            "description": "Optional. This key will only be present for state events. A unique key which defines the overwriting semantics for this piece of room state.",
   *                            "type": "string"
   *                          },
   *                          "type": {
   *                            "description": "The type of event.",
   *                            "type": "string"
   *                          },
   *                          "unsigned": {
   *                            "description": "Information about this event which was not sent by the originating homeserver",
   *                            "properties": {
   *                              "age": {
   *                                "description": "Time in milliseconds since the event was sent.",
   *                                "format": "int64",
   *                                "type": "integer"
   *                              },
   *                              "prev_content": {
   *                                "description": "Optional. The previous ``content`` for this state. This will be present only for state events appearing in the ``timeline``. If this is not a state event, or there is no previous content, this key will be missing.",
   *                                "title": "EventContent",
   *                                "type": "object"
   *                              },
   *                              "redacted_because": {
   *                                "description": "Optional. The event that redacted this event, if any.",
   *                                "title": "Event",
   *                                "type": "object"
   *                              },
   *                              "transaction_id": {
   *                                "description": "Optional. The transaction ID set when this message was sent. This key will only be present for message events sent by the device calling this API.",
   *                                "type": "string"
   *                              }
   *                            },
   *                            "title": "Unsigned",
   *                            "type": "object"
   *                          }
   *                        },
   *                        "title": "Event",
   *                        "type": "object"
   *                      }
   *                    ],
   *                    "type": "object"
   *                  },
   *                  "type": "array"
   *                }
   *              },
   *              "type": "object"
   *            }
   *          ],
   *          "description": "The global private data created by this user.",
   *          "title": "Account Data",
   *          "type": "object"
   *        },
   *        "device_lists": {
   *          "description": "Information on end-to-end device updates, as specified in\n|device_lists_sync|_.",
   *          "title": "DeviceLists",
   *          "type": "object"
   *        },
   *        "next_batch": {
   *          "description": "The batch token to supply in the ``since`` param of the next\n``/sync`` request.",
   *          "type": "string"
   *        },
   *        "presence": {
   *          "allOf": [
   *            {
   *              "properties": {
   *                "events": {
   *                  "description": "List of events",
   *                  "items": {
   *                    "allOf": [
   *                      {
   *                        "properties": {
   *                          "content": {
   *                            "description": "The content of this event. The fields in this object will vary depending on the type of event.",
   *                            "title": "EventContent",
   *                            "type": "object"
   *                          },
   *                          "event_id": {
   *                            "description": "The ID of this event, if applicable.",
   *                            "type": "string"
   *                          },
   *                          "origin_server_ts": {
   *                            "description": "Timestamp in milliseconds on originating homeserver when this event was sent.",
   *                            "format": "int64",
   *                            "type": "integer"
   *                          },
   *                          "sender": {
   *                            "description": "The MXID of the user who sent this event.",
   *                            "type": "string"
   *                          },
   *                          "state_key": {
   *                            "description": "Optional. This key will only be present for state events. A unique key which defines the overwriting semantics for this piece of room state.",
   *                            "type": "string"
   *                          },
   *                          "type": {
   *                            "description": "The type of event.",
   *                            "type": "string"
   *                          },
   *                          "unsigned": {
   *                            "description": "Information about this event which was not sent by the originating homeserver",
   *                            "properties": {
   *                              "age": {
   *                                "description": "Time in milliseconds since the event was sent.",
   *                                "format": "int64",
   *                                "type": "integer"
   *                              },
   *                              "prev_content": {
   *                                "description": "Optional. The previous ``content`` for this state. This will be present only for state events appearing in the ``timeline``. If this is not a state event, or there is no previous content, this key will be missing.",
   *                                "title": "EventContent",
   *                                "type": "object"
   *                              },
   *                              "redacted_because": {
   *                                "description": "Optional. The event that redacted this event, if any.",
   *                                "title": "Event",
   *                                "type": "object"
   *                              },
   *                              "transaction_id": {
   *                                "description": "Optional. The transaction ID set when this message was sent. This key will only be present for message events sent by the device calling this API.",
   *                                "type": "string"
   *                              }
   *                            },
   *                            "title": "Unsigned",
   *                            "type": "object"
   *                          }
   *                        },
   *                        "title": "Event",
   *                        "type": "object"
   *                      }
   *                    ],
   *                    "type": "object"
   *                  },
   *                  "type": "array"
   *                }
   *              },
   *              "type": "object"
   *            }
   *          ],
   *          "description": "The updates to the presence status of other users.",
   *          "title": "Presence",
   *          "type": "object"
   *        },
   *        "rooms": {
   *          "description": "Updates to rooms.",
   *          "properties": {
   *            "invite": {
   *              "additionalProperties": {
   *                "properties": {
   *                  "invite_state": {
   *                    "allOf": [
   *                      {
   *                        "properties": {
   *                          "events": {
   *                            "description": "List of events",
   *                            "items": {
   *                              "allOf": [
   *                                {
   *                                  "properties": {
   *                                    "content": {
   *                                      "description": "The content of this event. The fields in this object will vary depending on the type of event.",
   *                                      "title": "EventContent",
   *                                      "type": "object"
   *                                    },
   *                                    "event_id": {
   *                                      "description": "The ID of this event, if applicable.",
   *                                      "type": "string"
   *                                    },
   *                                    "origin_server_ts": {
   *                                      "description": "Timestamp in milliseconds on originating homeserver when this event was sent.",
   *                                      "format": "int64",
   *                                      "type": "integer"
   *                                    },
   *                                    "sender": {
   *                                      "description": "The MXID of the user who sent this event.",
   *                                      "type": "string"
   *                                    },
   *                                    "state_key": {
   *                                      "description": "Optional. This key will only be present for state events. A unique key which defines the overwriting semantics for this piece of room state.",
   *                                      "type": "string"
   *                                    },
   *                                    "type": {
   *                                      "description": "The type of event.",
   *                                      "type": "string"
   *                                    },
   *                                    "unsigned": {
   *                                      "description": "Information about this event which was not sent by the originating homeserver",
   *                                      "properties": {
   *                                        "age": {
   *                                          "description": "Time in milliseconds since the event was sent.",
   *                                          "format": "int64",
   *                                          "type": "integer"
   *                                        },
   *                                        "prev_content": {
   *                                          "description": "Optional. The previous ``content`` for this state. This will be present only for state events appearing in the ``timeline``. If this is not a state event, or there is no previous content, this key will be missing.",
   *                                          "title": "EventContent",
   *                                          "type": "object"
   *                                        },
   *                                        "redacted_because": {
   *                                          "description": "Optional. The event that redacted this event, if any.",
   *                                          "title": "Event",
   *                                          "type": "object"
   *                                        },
   *                                        "transaction_id": {
   *                                          "description": "Optional. The transaction ID set when this message was sent. This key will only be present for message events sent by the device calling this API.",
   *                                          "type": "string"
   *                                        }
   *                                      },
   *                                      "title": "Unsigned",
   *                                      "type": "object"
   *                                    }
   *                                  },
   *                                  "title": "Event",
   *                                  "type": "object"
   *                                }
   *                              ],
   *                              "type": "object"
   *                            },
   *                            "type": "array"
   *                          }
   *                        },
   *                        "type": "object"
   *                      }
   *                    ],
   *                    "description": "The state of a room that the user has been invited\nto. These state events may only have the ``sender``,\n``type``, ``state_key`` and ``content`` keys\npresent. These events do not replace any state that\nthe client already has for the room, for example if\nthe client has archived the room. Instead the\nclient should keep two separate copies of the\nstate: the one from the ``invite_state`` and one\nfrom the archived ``state``. If the client joins\nthe room then the current state will be given as a\ndelta against the archived ``state`` not the\n``invite_state``.",
   *                    "title": "InviteState",
   *                    "type": "object"
   *                  }
   *                },
   *                "title": "Invited Room",
   *                "type": "object"
   *              },
   *              "description": "The rooms that the user has been invited to.",
   *              "title": "Invited Rooms",
   *              "type": "object"
   *            },
   *            "join": {
   *              "additionalProperties": {
   *                "properties": {
   *                  "account_data": {
   *                    "allOf": [
   *                      {
   *                        "properties": {
   *                          "events": {
   *                            "description": "List of events",
   *                            "items": {
   *                              "allOf": [
   *                                {
   *                                  "properties": {
   *                                    "content": {
   *                                      "description": "The content of this event. The fields in this object will vary depending on the type of event.",
   *                                      "title": "EventContent",
   *                                      "type": "object"
   *                                    },
   *                                    "event_id": {
   *                                      "description": "The ID of this event, if applicable.",
   *                                      "type": "string"
   *                                    },
   *                                    "origin_server_ts": {
   *                                      "description": "Timestamp in milliseconds on originating homeserver when this event was sent.",
   *                                      "format": "int64",
   *                                      "type": "integer"
   *                                    },
   *                                    "sender": {
   *                                      "description": "The MXID of the user who sent this event.",
   *                                      "type": "string"
   *                                    },
   *                                    "state_key": {
   *                                      "description": "Optional. This key will only be present for state events. A unique key which defines the overwriting semantics for this piece of room state.",
   *                                      "type": "string"
   *                                    },
   *                                    "type": {
   *                                      "description": "The type of event.",
   *                                      "type": "string"
   *                                    },
   *                                    "unsigned": {
   *                                      "description": "Information about this event which was not sent by the originating homeserver",
   *                                      "properties": {
   *                                        "age": {
   *                                          "description": "Time in milliseconds since the event was sent.",
   *                                          "format": "int64",
   *                                          "type": "integer"
   *                                        },
   *                                        "prev_content": {
   *                                          "description": "Optional. The previous ``content`` for this state. This will be present only for state events appearing in the ``timeline``. If this is not a state event, or there is no previous content, this key will be missing.",
   *                                          "title": "EventContent",
   *                                          "type": "object"
   *                                        },
   *                                        "redacted_because": {
   *                                          "description": "Optional. The event that redacted this event, if any.",
   *                                          "title": "Event",
   *                                          "type": "object"
   *                                        },
   *                                        "transaction_id": {
   *                                          "description": "Optional. The transaction ID set when this message was sent. This key will only be present for message events sent by the device calling this API.",
   *                                          "type": "string"
   *                                        }
   *                                      },
   *                                      "title": "Unsigned",
   *                                      "type": "object"
   *                                    }
   *                                  },
   *                                  "title": "Event",
   *                                  "type": "object"
   *                                }
   *                              ],
   *                              "type": "object"
   *                            },
   *                            "type": "array"
   *                          }
   *                        },
   *                        "type": "object"
   *                      }
   *                    ],
   *                    "description": "The private data that this user has attached to\nthis room.",
   *                    "title": "Account Data",
   *                    "type": "object"
   *                  },
   *                  "ephemeral": {
   *                    "allOf": [
   *                      {
   *                        "properties": {
   *                          "events": {
   *                            "description": "List of events",
   *                            "items": {
   *                              "allOf": [
   *                                {
   *                                  "properties": {
   *                                    "content": {
   *                                      "description": "The content of this event. The fields in this object will vary depending on the type of event.",
   *                                      "title": "EventContent",
   *                                      "type": "object"
   *                                    },
   *                                    "event_id": {
   *                                      "description": "The ID of this event, if applicable.",
   *                                      "type": "string"
   *                                    },
   *                                    "origin_server_ts": {
   *                                      "description": "Timestamp in milliseconds on originating homeserver when this event was sent.",
   *                                      "format": "int64",
   *                                      "type": "integer"
   *                                    },
   *                                    "sender": {
   *                                      "description": "The MXID of the user who sent this event.",
   *                                      "type": "string"
   *                                    },
   *                                    "state_key": {
   *                                      "description": "Optional. This key will only be present for state events. A unique key which defines the overwriting semantics for this piece of room state.",
   *                                      "type": "string"
   *                                    },
   *                                    "type": {
   *                                      "description": "The type of event.",
   *                                      "type": "string"
   *                                    },
   *                                    "unsigned": {
   *                                      "description": "Information about this event which was not sent by the originating homeserver",
   *                                      "properties": {
   *                                        "age": {
   *                                          "description": "Time in milliseconds since the event was sent.",
   *                                          "format": "int64",
   *                                          "type": "integer"
   *                                        },
   *                                        "prev_content": {
   *                                          "description": "Optional. The previous ``content`` for this state. This will be present only for state events appearing in the ``timeline``. If this is not a state event, or there is no previous content, this key will be missing.",
   *                                          "title": "EventContent",
   *                                          "type": "object"
   *                                        },
   *                                        "redacted_because": {
   *                                          "description": "Optional. The event that redacted this event, if any.",
   *                                          "title": "Event",
   *                                          "type": "object"
   *                                        },
   *                                        "transaction_id": {
   *                                          "description": "Optional. The transaction ID set when this message was sent. This key will only be present for message events sent by the device calling this API.",
   *                                          "type": "string"
   *                                        }
   *                                      },
   *                                      "title": "Unsigned",
   *                                      "type": "object"
   *                                    }
   *                                  },
   *                                  "title": "Event",
   *                                  "type": "object"
   *                                }
   *                              ],
   *                              "type": "object"
   *                            },
   *                            "type": "array"
   *                          }
   *                        },
   *                        "type": "object"
   *                      }
   *                    ],
   *                    "description": "The ephemeral events in the room that aren't\nrecorded in the timeline or state of the room.\ne.g. typing.",
   *                    "title": "Ephemeral",
   *                    "type": "object"
   *                  },
   *                  "state": {
   *                    "allOf": [
   *                      {
   *                        "properties": {
   *                          "events": {
   *                            "description": "List of events",
   *                            "items": {
   *                              "allOf": [
   *                                {
   *                                  "properties": {
   *                                    "content": {
   *                                      "description": "The content of this event. The fields in this object will vary depending on the type of event.",
   *                                      "title": "EventContent",
   *                                      "type": "object"
   *                                    },
   *                                    "event_id": {
   *                                      "description": "The ID of this event, if applicable.",
   *                                      "type": "string"
   *                                    },
   *                                    "origin_server_ts": {
   *                                      "description": "Timestamp in milliseconds on originating homeserver when this event was sent.",
   *                                      "format": "int64",
   *                                      "type": "integer"
   *                                    },
   *                                    "sender": {
   *                                      "description": "The MXID of the user who sent this event.",
   *                                      "type": "string"
   *                                    },
   *                                    "state_key": {
   *                                      "description": "Optional. This key will only be present for state events. A unique key which defines the overwriting semantics for this piece of room state.",
   *                                      "type": "string"
   *                                    },
   *                                    "type": {
   *                                      "description": "The type of event.",
   *                                      "type": "string"
   *                                    },
   *                                    "unsigned": {
   *                                      "description": "Information about this event which was not sent by the originating homeserver",
   *                                      "properties": {
   *                                        "age": {
   *                                          "description": "Time in milliseconds since the event was sent.",
   *                                          "format": "int64",
   *                                          "type": "integer"
   *                                        },
   *                                        "prev_content": {
   *                                          "description": "Optional. The previous ``content`` for this state. This will be present only for state events appearing in the ``timeline``. If this is not a state event, or there is no previous content, this key will be missing.",
   *                                          "title": "EventContent",
   *                                          "type": "object"
   *                                        },
   *                                        "redacted_because": {
   *                                          "description": "Optional. The event that redacted this event, if any.",
   *                                          "title": "Event",
   *                                          "type": "object"
   *                                        },
   *                                        "transaction_id": {
   *                                          "description": "Optional. The transaction ID set when this message was sent. This key will only be present for message events sent by the device calling this API.",
   *                                          "type": "string"
   *                                        }
   *                                      },
   *                                      "title": "Unsigned",
   *                                      "type": "object"
   *                                    }
   *                                  },
   *                                  "title": "Event",
   *                                  "type": "object"
   *                                }
   *                              ],
   *                              "type": "object"
   *                            },
   *                            "type": "array"
   *                          }
   *                        },
   *                        "type": "object"
   *                      }
   *                    ],
   *                    "description": "Updates to the state, between the time indicated by\nthe ``since`` parameter, and the start of the\n``timeline`` (or all state up to the start of the\n``timeline``, if ``since`` is not given, or\n``full_state`` is true).",
   *                    "title": "State",
   *                    "type": "object"
   *                  },
   *                  "timeline": {
   *                    "allOf": [
   *                      {
   *                        "allOf": [
   *                          {
   *                            "properties": {
   *                              "events": {
   *                                "description": "List of events",
   *                                "items": {
   *                                  "allOf": [
   *                                    {
   *                                      "properties": {
   *                                        "content": {
   *                                          "description": "The content of this event. The fields in this object will vary depending on the type of event.",
   *                                          "title": "EventContent",
   *                                          "type": "object"
   *                                        },
   *                                        "event_id": {
   *                                          "description": "The ID of this event, if applicable.",
   *                                          "type": "string"
   *                                        },
   *                                        "origin_server_ts": {
   *                                          "description": "Timestamp in milliseconds on originating homeserver when this event was sent.",
   *                                          "format": "int64",
   *                                          "type": "integer"
   *                                        },
   *                                        "sender": {
   *                                          "description": "The MXID of the user who sent this event.",
   *                                          "type": "string"
   *                                        },
   *                                        "state_key": {
   *                                          "description": "Optional. This key will only be present for state events. A unique key which defines the overwriting semantics for this piece of room state.",
   *                                          "type": "string"
   *                                        },
   *                                        "type": {
   *                                          "description": "The type of event.",
   *                                          "type": "string"
   *                                        },
   *                                        "unsigned": {
   *                                          "description": "Information about this event which was not sent by the originating homeserver",
   *                                          "properties": {
   *                                            "age": {
   *                                              "description": "Time in milliseconds since the event was sent.",
   *                                              "format": "int64",
   *                                              "type": "integer"
   *                                            },
   *                                            "prev_content": {
   *                                              "description": "Optional. The previous ``content`` for this state. This will be present only for state events appearing in the ``timeline``. If this is not a state event, or there is no previous content, this key will be missing.",
   *                                              "title": "EventContent",
   *                                              "type": "object"
   *                                            },
   *                                            "redacted_because": {
   *                                              "description": "Optional. The event that redacted this event, if any.",
   *                                              "title": "Event",
   *                                              "type": "object"
   *                                            },
   *                                            "transaction_id": {
   *                                              "description": "Optional. The transaction ID set when this message was sent. This key will only be present for message events sent by the device calling this API.",
   *                                              "type": "string"
   *                                            }
   *                                          },
   *                                          "title": "Unsigned",
   *                                          "type": "object"
   *                                        }
   *                                      },
   *                                      "title": "Event",
   *                                      "type": "object"
   *                                    }
   *                                  ],
   *                                  "type": "object"
   *                                },
   *                                "type": "array"
   *                              }
   *                            },
   *                            "type": "object"
   *                          }
   *                        ],
   *                        "properties": {
   *                          "limited": {
   *                            "description": "True if the number of events returned was limited by the ``limit`` on the filter",
   *                            "type": "boolean"
   *                          },
   *                          "prev_batch": {
   *                            "description": "A token that can be supplied to the ``from`` parameter of the rooms/{roomId}/messages endpoint",
   *                            "type": "string"
   *                          }
   *                        },
   *                        "type": "object"
   *                      }
   *                    ],
   *                    "description": "The timeline of messages and state changes in the\nroom.",
   *                    "title": "Timeline",
   *                    "type": "object"
   *                  },
   *                  "unread_notifications": {
   *                    "description": "Counts of unread notifications for this room",
   *                    "properties": {
   *                      "highlight_count": {
   *                        "description": "The number of unread notifications for this room with the highlight flag set",
   *                        "title": "Highlighted notification count",
   *                        "type": "integer"
   *                      },
   *                      "notification_count": {
   *                        "description": "The total number of unread notifications for this room",
   *                        "title": "Total notification count",
   *                        "type": "integer"
   *                      }
   *                    },
   *                    "title": "Unread Notification Counts",
   *                    "type": "object"
   *                  }
   *                },
   *                "title": "Joined Room",
   *                "type": "object"
   *              },
   *              "description": "The rooms that the user has joined.",
   *              "title": "Joined Rooms",
   *              "type": "object"
   *            },
   *            "leave": {
   *              "additionalProperties": {
   *                "properties": {
   *                  "state": {
   *                    "allOf": [
   *                      {
   *                        "properties": {
   *                          "events": {
   *                            "description": "List of events",
   *                            "items": {
   *                              "allOf": [
   *                                {
   *                                  "properties": {
   *                                    "content": {
   *                                      "description": "The content of this event. The fields in this object will vary depending on the type of event.",
   *                                      "title": "EventContent",
   *                                      "type": "object"
   *                                    },
   *                                    "event_id": {
   *                                      "description": "The ID of this event, if applicable.",
   *                                      "type": "string"
   *                                    },
   *                                    "origin_server_ts": {
   *                                      "description": "Timestamp in milliseconds on originating homeserver when this event was sent.",
   *                                      "format": "int64",
   *                                      "type": "integer"
   *                                    },
   *                                    "sender": {
   *                                      "description": "The MXID of the user who sent this event.",
   *                                      "type": "string"
   *                                    },
   *                                    "state_key": {
   *                                      "description": "Optional. This key will only be present for state events. A unique key which defines the overwriting semantics for this piece of room state.",
   *                                      "type": "string"
   *                                    },
   *                                    "type": {
   *                                      "description": "The type of event.",
   *                                      "type": "string"
   *                                    },
   *                                    "unsigned": {
   *                                      "description": "Information about this event which was not sent by the originating homeserver",
   *                                      "properties": {
   *                                        "age": {
   *                                          "description": "Time in milliseconds since the event was sent.",
   *                                          "format": "int64",
   *                                          "type": "integer"
   *                                        },
   *                                        "prev_content": {
   *                                          "description": "Optional. The previous ``content`` for this state. This will be present only for state events appearing in the ``timeline``. If this is not a state event, or there is no previous content, this key will be missing.",
   *                                          "title": "EventContent",
   *                                          "type": "object"
   *                                        },
   *                                        "redacted_because": {
   *                                          "description": "Optional. The event that redacted this event, if any.",
   *                                          "title": "Event",
   *                                          "type": "object"
   *                                        },
   *                                        "transaction_id": {
   *                                          "description": "Optional. The transaction ID set when this message was sent. This key will only be present for message events sent by the device calling this API.",
   *                                          "type": "string"
   *                                        }
   *                                      },
   *                                      "title": "Unsigned",
   *                                      "type": "object"
   *                                    }
   *                                  },
   *                                  "title": "Event",
   *                                  "type": "object"
   *                                }
   *                              ],
   *                              "type": "object"
   *                            },
   *                            "type": "array"
   *                          }
   *                        },
   *                        "type": "object"
   *                      }
   *                    ],
   *                    "description": "The state updates for the room up to the start of the timeline.",
   *                    "title": "State",
   *                    "type": "object"
   *                  },
   *                  "timeline": {
   *                    "allOf": [
   *                      {
   *                        "allOf": [
   *                          {
   *                            "properties": {
   *                              "events": {
   *                                "description": "List of events",
   *                                "items": {
   *                                  "allOf": [
   *                                    {
   *                                      "properties": {
   *                                        "content": {
   *                                          "description": "The content of this event. The fields in this object will vary depending on the type of event.",
   *                                          "title": "EventContent",
   *                                          "type": "object"
   *                                        },
   *                                        "event_id": {
   *                                          "description": "The ID of this event, if applicable.",
   *                                          "type": "string"
   *                                        },
   *                                        "origin_server_ts": {
   *                                          "description": "Timestamp in milliseconds on originating homeserver when this event was sent.",
   *                                          "format": "int64",
   *                                          "type": "integer"
   *                                        },
   *                                        "sender": {
   *                                          "description": "The MXID of the user who sent this event.",
   *                                          "type": "string"
   *                                        },
   *                                        "state_key": {
   *                                          "description": "Optional. This key will only be present for state events. A unique key which defines the overwriting semantics for this piece of room state.",
   *                                          "type": "string"
   *                                        },
   *                                        "type": {
   *                                          "description": "The type of event.",
   *                                          "type": "string"
   *                                        },
   *                                        "unsigned": {
   *                                          "description": "Information about this event which was not sent by the originating homeserver",
   *                                          "properties": {
   *                                            "age": {
   *                                              "description": "Time in milliseconds since the event was sent.",
   *                                              "format": "int64",
   *                                              "type": "integer"
   *                                            },
   *                                            "prev_content": {
   *                                              "description": "Optional. The previous ``content`` for this state. This will be present only for state events appearing in the ``timeline``. If this is not a state event, or there is no previous content, this key will be missing.",
   *                                              "title": "EventContent",
   *                                              "type": "object"
   *                                            },
   *                                            "redacted_because": {
   *                                              "description": "Optional. The event that redacted this event, if any.",
   *                                              "title": "Event",
   *                                              "type": "object"
   *                                            },
   *                                            "transaction_id": {
   *                                              "description": "Optional. The transaction ID set when this message was sent. This key will only be present for message events sent by the device calling this API.",
   *                                              "type": "string"
   *                                            }
   *                                          },
   *                                          "title": "Unsigned",
   *                                          "type": "object"
   *                                        }
   *                                      },
   *                                      "title": "Event",
   *                                      "type": "object"
   *                                    }
   *                                  ],
   *                                  "type": "object"
   *                                },
   *                                "type": "array"
   *                              }
   *                            },
   *                            "type": "object"
   *                          }
   *                        ],
   *                        "properties": {
   *                          "limited": {
   *                            "description": "True if the number of events returned was limited by the ``limit`` on the filter",
   *                            "type": "boolean"
   *                          },
   *                          "prev_batch": {
   *                            "description": "A token that can be supplied to the ``from`` parameter of the rooms/{roomId}/messages endpoint",
   *                            "type": "string"
   *                          }
   *                        },
   *                        "type": "object"
   *                      }
   *                    ],
   *                    "description": "The timeline of messages and state changes in the\nroom up to the point when the user left.",
   *                    "title": "Timeline",
   *                    "type": "object"
   *                  }
   *                },
   *                "title": "Left Room",
   *                "type": "object"
   *              },
   *              "description": "The rooms that the user has left or been banned from.",
   *              "title": "Left rooms",
   *              "type": "object"
   *            }
   *          },
   *          "title": "Rooms",
   *          "type": "object"
   *        },
   *        "to_device": {
   *          "description": "Information on the send-to-device messages for the client\ndevice, as defined in |send_to_device_sync|_.",
   *          "title": "ToDevice",
   *          "type": "object"
   *        }
   *      },
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
   * @summary : Synchronise the client's state and receive new messages.
   *
   */
  @Get('/_matrix/client/r0/sync')
  async sync(
    @QueryParam('filter', { required: true })
    filter: string,
    @QueryParam('since', { required: true })
    since: string,
    @QueryParam('full_state', { required: true })
    fullState: boolean,
    @QueryParam('set_presence', { required: true })
    setPresence: string,
    @QueryParam('timeout', { required: true })
    timeout: number,
    @CurrentUser() user?: User
  ): Promise<dto.SyncResponse | any> {
    throw new HttpError(501);
  }
}
