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
export class MatrixClientR0RoomsRoomIdContextEventId {
  /**
   * @description : This API returns a number of events that happened just before and
   *after the specified event. This allows clients to get the context
   *surrounding an event.
   *
   * @parameters : [
   *  {
   *    "description": "The room to get events from.",
   *    "in": "path",
   *    "name": "roomId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "!636q39766251:example.com"
   *  },
   *  {
   *    "description": "The event to get context around.",
   *    "in": "path",
   *    "name": "eventId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "$f3h4d129462ha:example.com"
   *  },
   *  {
   *    "description": "The maximum number of events to return. Default: 10.",
   *    "in": "query",
   *    "name": "limit",
   *    "type": "integer",
   *    "x-example": 3
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The events and state surrounding the requested event.",
   *    "examples": {
   *      "application/json": {
   *        "end": "t29-57_2_0_2",
   *        "events_after": [
   *          {
   *            "age": 91911336,
   *            "content": {
   *              "body": "7",
   *              "msgtype": "m.text"
   *            },
   *            "event_id": "$14460306086CiUaL:localhost:8480",
   *            "origin_server_ts": 1446030608551,
   *            "room_id": "!sCDvXTtzjpiPxaqkkt:localhost:8480",
   *            "sender": "@test:localhost:8480",
   *            "type": "m.room.message"
   *          }
   *        ],
   *        "events_before": [
   *          {
   *            "age": 91911903,
   *            "content": {
   *              "body": "5",
   *              "msgtype": "m.text"
   *            },
   *            "event_id": "$14460306074UYTlh:localhost:8480",
   *            "origin_server_ts": 1446030607984,
   *            "room_id": "!sCDvXTtzjpiPxaqkkt:localhost:8480",
   *            "sender": "@test:localhost:8480",
   *            "type": "m.room.message"
   *          }
   *        ],
   *        "start": "t27-54_2_0_2",
   *        "state": [
   *          {
   *            "age": 3123715284,
   *            "content": {
   *              "creator": "@test:localhost:8480"
   *            },
   *            "event_id": "$14429988040dgQAE:localhost:8480",
   *            "origin_server_ts": 1442998804603,
   *            "room_id": "!sCDvXTtzjpiPxaqkkt:localhost:8480",
   *            "sender": "@test:localhost:8480",
   *            "state_key": "",
   *            "type": "m.room.create"
   *          },
   *          {
   *            "age": 2067105053,
   *            "content": {
   *              "avatar_url": "mxc://localhost:8480/tVWZTAIIfqtXMZZtmGCkVjTD#auto",
   *              "displayname": "Bob2",
   *              "membership": "join"
   *            },
   *            "event_id": "$14440554144URDbf:localhost:8480",
   *            "origin_server_ts": 1444055414834,
   *            "replaces_state": "$14440552472PgiGk:localhost:8480",
   *            "room_id": "!sCDvXTtzjpiPxaqkkt:localhost:8480",
   *            "sender": "@test:localhost:8480",
   *            "state_key": "@test:localhost:8480",
   *            "type": "m.room.member"
   *          }
   *        ]
   *      }
   *    },
   *    "schema": {
   *      "description": "The events and state surrounding the requested event.",
   *      "properties": {
   *        "end": {
   *          "description": "A token that can be used to paginate forwards with.",
   *          "type": "string"
   *        },
   *        "event": {
   *          "allOf": [
   *            {
   *              "allOf": [
   *                {
   *                  "description": "The basic set of fields all events must have.",
   *                  "properties": {
   *                    "content": {
   *                      "description": "The fields in this object will vary depending on the type of event. When interacting with the REST API, this is the HTTP body.",
   *                      "type": "object"
   *                    },
   *                    "type": {
   *                      "description": "The type of event. This SHOULD be namespaced similar to Java package naming conventions e.g. 'com.example.subdomain.event.type'",
   *                      "type": "string"
   *                    }
   *                  },
   *                  "required": [
   *                    "type"
   *                  ],
   *                  "title": "Event",
   *                  "type": "object"
   *                }
   *              ],
   *              "description": "In addition to the Event fields, Room Events have the following additional fields.",
   *              "properties": {
   *                "event_id": {
   *                  "description": "The globally unique event identifier.",
   *                  "type": "string"
   *                },
   *                "origin_server_ts": {
   *                  "description": "Timestamp in milliseconds on originating homeserver when this event was sent.",
   *                  "type": "number"
   *                },
   *                "room_id": {
   *                  "description": "The ID of the room associated with this event.",
   *                  "type": "string"
   *                },
   *                "sender": {
   *                  "description": "Contains the fully-qualified ID of the user who *sent* this event.",
   *                  "type": "string"
   *                },
   *                "unsigned": {
   *                  "description": "Contains optional extra information about the event.",
   *                  "properties": {
   *                    "age": {
   *                      "description": "The time in milliseconds that has elapsed since the event was sent. This field is generated by the local homeserver, and may be incorrect if the local time on at least one of the two servers is out of sync, which can cause the age to either be negative or greater than it actually is.",
   *                      "type": "integer"
   *                    },
   *                    "redacted_because": {
   *                      "description": "Optional. The event that redacted this event, if any.",
   *                      "title": "Event",
   *                      "type": "object"
   *                    },
   *                    "transaction_id": {
   *                      "description": "The client-supplied transaction ID, if the client being given the event is the same one which sent it.",
   *                      "type": "string"
   *                    }
   *                  },
   *                  "title": "UnsignedData",
   *                  "type": "object"
   *                }
   *              },
   *              "required": [
   *                "event_id",
   *                "room_id",
   *                "sender",
   *                "origin_server_ts"
   *              ],
   *              "title": "Room Event",
   *              "type": "object"
   *            }
   *          ],
   *          "description": "Details of the requested event."
   *        },
   *        "events_after": {
   *          "description": "A list of room events that happened just after the\nrequested event, in chronological order.",
   *          "items": {
   *            "allOf": [
   *              {
   *                "allOf": [
   *                  {
   *                    "description": "The basic set of fields all events must have.",
   *                    "properties": {
   *                      "content": {
   *                        "description": "The fields in this object will vary depending on the type of event. When interacting with the REST API, this is the HTTP body.",
   *                        "type": "object"
   *                      },
   *                      "type": {
   *                        "description": "The type of event. This SHOULD be namespaced similar to Java package naming conventions e.g. 'com.example.subdomain.event.type'",
   *                        "type": "string"
   *                      }
   *                    },
   *                    "required": [
   *                      "type"
   *                    ],
   *                    "title": "Event",
   *                    "type": "object"
   *                  }
   *                ],
   *                "description": "In addition to the Event fields, Room Events have the following additional fields.",
   *                "properties": {
   *                  "event_id": {
   *                    "description": "The globally unique event identifier.",
   *                    "type": "string"
   *                  },
   *                  "origin_server_ts": {
   *                    "description": "Timestamp in milliseconds on originating homeserver when this event was sent.",
   *                    "type": "number"
   *                  },
   *                  "room_id": {
   *                    "description": "The ID of the room associated with this event.",
   *                    "type": "string"
   *                  },
   *                  "sender": {
   *                    "description": "Contains the fully-qualified ID of the user who *sent* this event.",
   *                    "type": "string"
   *                  },
   *                  "unsigned": {
   *                    "description": "Contains optional extra information about the event.",
   *                    "properties": {
   *                      "age": {
   *                        "description": "The time in milliseconds that has elapsed since the event was sent. This field is generated by the local homeserver, and may be incorrect if the local time on at least one of the two servers is out of sync, which can cause the age to either be negative or greater than it actually is.",
   *                        "type": "integer"
   *                      },
   *                      "redacted_because": {
   *                        "description": "Optional. The event that redacted this event, if any.",
   *                        "title": "Event",
   *                        "type": "object"
   *                      },
   *                      "transaction_id": {
   *                        "description": "The client-supplied transaction ID, if the client being given the event is the same one which sent it.",
   *                        "type": "string"
   *                      }
   *                    },
   *                    "title": "UnsignedData",
   *                    "type": "object"
   *                  }
   *                },
   *                "required": [
   *                  "event_id",
   *                  "room_id",
   *                  "sender",
   *                  "origin_server_ts"
   *                ],
   *                "title": "Room Event",
   *                "type": "object"
   *              }
   *            ]
   *          },
   *          "type": "array"
   *        },
   *        "events_before": {
   *          "description": "A list of room events that happened just before the\nrequested event, in reverse-chronological order.",
   *          "items": {
   *            "allOf": [
   *              {
   *                "allOf": [
   *                  {
   *                    "description": "The basic set of fields all events must have.",
   *                    "properties": {
   *                      "content": {
   *                        "description": "The fields in this object will vary depending on the type of event. When interacting with the REST API, this is the HTTP body.",
   *                        "type": "object"
   *                      },
   *                      "type": {
   *                        "description": "The type of event. This SHOULD be namespaced similar to Java package naming conventions e.g. 'com.example.subdomain.event.type'",
   *                        "type": "string"
   *                      }
   *                    },
   *                    "required": [
   *                      "type"
   *                    ],
   *                    "title": "Event",
   *                    "type": "object"
   *                  }
   *                ],
   *                "description": "In addition to the Event fields, Room Events have the following additional fields.",
   *                "properties": {
   *                  "event_id": {
   *                    "description": "The globally unique event identifier.",
   *                    "type": "string"
   *                  },
   *                  "origin_server_ts": {
   *                    "description": "Timestamp in milliseconds on originating homeserver when this event was sent.",
   *                    "type": "number"
   *                  },
   *                  "room_id": {
   *                    "description": "The ID of the room associated with this event.",
   *                    "type": "string"
   *                  },
   *                  "sender": {
   *                    "description": "Contains the fully-qualified ID of the user who *sent* this event.",
   *                    "type": "string"
   *                  },
   *                  "unsigned": {
   *                    "description": "Contains optional extra information about the event.",
   *                    "properties": {
   *                      "age": {
   *                        "description": "The time in milliseconds that has elapsed since the event was sent. This field is generated by the local homeserver, and may be incorrect if the local time on at least one of the two servers is out of sync, which can cause the age to either be negative or greater than it actually is.",
   *                        "type": "integer"
   *                      },
   *                      "redacted_because": {
   *                        "description": "Optional. The event that redacted this event, if any.",
   *                        "title": "Event",
   *                        "type": "object"
   *                      },
   *                      "transaction_id": {
   *                        "description": "The client-supplied transaction ID, if the client being given the event is the same one which sent it.",
   *                        "type": "string"
   *                      }
   *                    },
   *                    "title": "UnsignedData",
   *                    "type": "object"
   *                  }
   *                },
   *                "required": [
   *                  "event_id",
   *                  "room_id",
   *                  "sender",
   *                  "origin_server_ts"
   *                ],
   *                "title": "Room Event",
   *                "type": "object"
   *              }
   *            ]
   *          },
   *          "type": "array"
   *        },
   *        "start": {
   *          "description": "A token that can be used to paginate backwards with.",
   *          "type": "string"
   *        },
   *        "state": {
   *          "description": "The state of the room at the last event returned.",
   *          "items": {
   *            "allOf": [
   *              {
   *                "allOf": [
   *                  {
   *                    "allOf": [
   *                      {
   *                        "description": "The basic set of fields all events must have.",
   *                        "properties": {
   *                          "content": {
   *                            "description": "The fields in this object will vary depending on the type of event. When interacting with the REST API, this is the HTTP body.",
   *                            "type": "object"
   *                          },
   *                          "type": {
   *                            "description": "The type of event. This SHOULD be namespaced similar to Java package naming conventions e.g. 'com.example.subdomain.event.type'",
   *                            "type": "string"
   *                          }
   *                        },
   *                        "required": [
   *                          "type"
   *                        ],
   *                        "title": "Event",
   *                        "type": "object"
   *                      }
   *                    ],
   *                    "description": "In addition to the Event fields, Room Events have the following additional fields.",
   *                    "properties": {
   *                      "event_id": {
   *                        "description": "The globally unique event identifier.",
   *                        "type": "string"
   *                      },
   *                      "origin_server_ts": {
   *                        "description": "Timestamp in milliseconds on originating homeserver when this event was sent.",
   *                        "type": "number"
   *                      },
   *                      "room_id": {
   *                        "description": "The ID of the room associated with this event.",
   *                        "type": "string"
   *                      },
   *                      "sender": {
   *                        "description": "Contains the fully-qualified ID of the user who *sent* this event.",
   *                        "type": "string"
   *                      },
   *                      "unsigned": {
   *                        "description": "Contains optional extra information about the event.",
   *                        "properties": {
   *                          "age": {
   *                            "description": "The time in milliseconds that has elapsed since the event was sent. This field is generated by the local homeserver, and may be incorrect if the local time on at least one of the two servers is out of sync, which can cause the age to either be negative or greater than it actually is.",
   *                            "type": "integer"
   *                          },
   *                          "redacted_because": {
   *                            "description": "Optional. The event that redacted this event, if any.",
   *                            "title": "Event",
   *                            "type": "object"
   *                          },
   *                          "transaction_id": {
   *                            "description": "The client-supplied transaction ID, if the client being given the event is the same one which sent it.",
   *                            "type": "string"
   *                          }
   *                        },
   *                        "title": "UnsignedData",
   *                        "type": "object"
   *                      }
   *                    },
   *                    "required": [
   *                      "event_id",
   *                      "room_id",
   *                      "sender",
   *                      "origin_server_ts"
   *                    ],
   *                    "title": "Room Event",
   *                    "type": "object"
   *                  }
   *                ],
   *                "description": "In addition to the Room Event fields, State Events have the following additional fields.",
   *                "properties": {
   *                  "prev_content": {
   *                    "description": "Optional. The previous ``content`` for this event. If there is no previous content, this key will be missing.",
   *                    "title": "EventContent",
   *                    "type": "object"
   *                  },
   *                  "state_key": {
   *                    "description": "A unique key which defines the overwriting semantics for this piece of room state. This value is often a zero-length string. The presence of this key makes this event a State Event. The key MUST NOT start with '_'.",
   *                    "type": "string"
   *                  }
   *                },
   *                "required": [
   *                  "state_key"
   *                ],
   *                "title": "State Event",
   *                "type": "object"
   *              }
   *            ]
   *          },
   *          "type": "array"
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
   * @summary : Get events and state around the specified event.
   *
   */
  @Get('/_matrix/client/r0/rooms/:roomId/context/:eventId')
  async getEventContext(
    @Param('roomId') roomId: string,
    @Param('eventId') eventId: string,
    @QueryParam('limit', { required: true })
    limit: number
  ): Promise<dto.GetEventContextResponse | any> {
    throw new HttpError(501);
  }
}
