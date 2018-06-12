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
export class MatrixClientR0InitialSync {
  /**
   * @deprecated : true
   *
   * @description : This returns the full state for this user, with an optional limit on the
   *number of messages per room to return.
   *
   *This endpoint was deprecated in r0 of this specification. Clients
   *should instead call the |/sync|_ API with no ``since`` parameter. See
   *the `migration guide
   *<https://matrix.org/docs/guides/client-server-migrating-from-v1.html#deprecated-endpoints>`_.
   *
   * @parameters : [
   *  {
   *    "description": "The maximum number of messages to return for each room.",
   *    "in": "query",
   *    "name": "limit",
   *    "required": false,
   *    "type": "integer",
   *    "x-example": "2"
   *  },
   *  {
   *    "description": "Whether to include rooms that the user has left. If ``false`` then\nonly rooms that the user has been invited to or has joined are\nincluded. If set to ``true`` then rooms that the user has left are\nincluded as well. By default this is ``false``.",
   *    "in": "query",
   *    "name": "archived",
   *    "required": false,
   *    "type": "boolean",
   *    "x-example": "true"
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The user's current state.",
   *    "examples": {
   *      "application/json": {
   *        "account_data": [
   *          {
   *            "content": {
   *              "custom_config_key": "custom_config_value"
   *            },
   *            "type": "org.example.custom.config"
   *          }
   *        ],
   *        "end": "s3456_9_0",
   *        "presence": [
   *          {
   *            "content": {
   *              "avatar_url": "mxc://localhost/GCmhgzMPRjqgpODLsNQzVuHZ#auto",
   *              "displayname": "Bob",
   *              "last_active_ago": 31053,
   *              "presence": "online",
   *              "user_id": "@bob:localhost"
   *            },
   *            "type": "m.presence"
   *          }
   *        ],
   *        "rooms": [
   *          {
   *            "account_data": [
   *              {
   *                "content": {
   *                  "tags": {
   *                    "work": {
   *                      "order": 1
   *                    }
   *                  }
   *                },
   *                "type": "m.tag"
   *              },
   *              {
   *                "content": {
   *                  "custom_config_key": "custom_config_value"
   *                },
   *                "type": "org.example.custom.room.config"
   *              }
   *            ],
   *            "membership": "join",
   *            "messages": {
   *              "chunk": [
   *                {
   *                  "age": 343513403,
   *                  "content": {
   *                    "body": "foo",
   *                    "msgtype": "m.text"
   *                  },
   *                  "event_id": "$14328044851tzTJS:localhost",
   *                  "origin_server_ts": 1432804485886,
   *                  "room_id": "!TmaZBKYIFrIPVGoUYp:localhost",
   *                  "sender": "@alice:localhost",
   *                  "type": "m.room.message"
   *                },
   *                {
   *                  "age": 343511809,
   *                  "content": {
   *                    "body": "bar",
   *                    "msgtype": "m.text"
   *                  },
   *                  "event_id": "$14328044872spjFg:localhost",
   *                  "origin_server_ts": 1432804487480,
   *                  "room_id": "!TmaZBKYIFrIPVGoUYp:localhost",
   *                  "sender": "@bob:localhost",
   *                  "type": "m.room.message"
   *                }
   *              ],
   *              "end": "s3456_9_0",
   *              "start": "t44-3453_9_0"
   *            },
   *            "room_id": "!TmaZBKYIFrIPVGoUYp:localhost",
   *            "state": [
   *              {
   *                "age": 7148266897,
   *                "content": {
   *                  "join_rule": "public"
   *                },
   *                "event_id": "$14259997323TLwtb:localhost",
   *                "origin_server_ts": 1425999732392,
   *                "room_id": "!TmaZBKYIFrIPVGoUYp:localhost",
   *                "sender": "@alice:localhost",
   *                "state_key": "",
   *                "type": "m.room.join_rules"
   *              },
   *              {
   *                "age": 6547561012,
   *                "content": {
   *                  "avatar_url": "mxc://localhost/fzysBrHpPEeTGANCVLXWXNMI#auto",
   *                  "membership": "join"
   *                },
   *                "event_id": "$1426600438280zExKY:localhost",
   *                "membership": "join",
   *                "origin_server_ts": 1426600438277,
   *                "room_id": "!TmaZBKYIFrIPVGoUYp:localhost",
   *                "sender": "@alice:localhost",
   *                "state_key": "@alice:localhost",
   *                "type": "m.room.member"
   *              },
   *              {
   *                "age": 7148267200,
   *                "content": {
   *                  "creator": "@alice:localhost"
   *                },
   *                "event_id": "$14259997320KhbwJ:localhost",
   *                "origin_server_ts": 1425999732089,
   *                "room_id": "!TmaZBKYIFrIPVGoUYp:localhost",
   *                "sender": "@alice:localhost",
   *                "state_key": "",
   *                "type": "m.room.create"
   *              },
   *              {
   *                "age": 1622568720,
   *                "content": {
   *                  "avatar_url": "mxc://localhost/GCmhgzMPRjqgpODLsNQzVuHZ#auto",
   *                  "displayname": "Bob",
   *                  "membership": "join"
   *                },
   *                "event_id": "$1431525430134MxlLX:localhost",
   *                "origin_server_ts": 1431525430569,
   *                "replaces_state": "$142652023736BSXcM:localhost",
   *                "room_id": "!TmaZBKYIFrIPVGoUYp:localhost",
   *                "sender": "@bob:localhost",
   *                "state_key": "@bob:localhost",
   *                "type": "m.room.member"
   *              },
   *              {
   *                "age": 7148267004,
   *                "content": {
   *                  "ban": 50,
   *                  "events": {
   *                    "m.room.name": 100,
   *                    "m.room.power_levels": 100
   *                  },
   *                  "events_default": 0,
   *                  "kick": 50,
   *                  "redact": 50,
   *                  "state_default": 50,
   *                  "users": {
   *                    "@alice:localhost": 100
   *                  },
   *                  "users_default": 0
   *                },
   *                "event_id": "$14259997322mqfaq:localhost",
   *                "origin_server_ts": 1425999732285,
   *                "room_id": "!TmaZBKYIFrIPVGoUYp:localhost",
   *                "sender": "@alice:localhost",
   *                "state_key": "",
   *                "type": "m.room.power_levels"
   *              }
   *            ],
   *            "visibility": "private"
   *          }
   *        ]
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "account_data": {
   *          "description": "The global private data created by this user.",
   *          "items": {
   *            "allOf": [
   *              {
   *                "description": "The basic set of fields all events must have.",
   *                "properties": {
   *                  "content": {
   *                    "description": "The fields in this object will vary depending on the type of event. When interacting with the REST API, this is the HTTP body.",
   *                    "type": "object"
   *                  },
   *                  "type": {
   *                    "description": "The type of event. This SHOULD be namespaced similar to Java package naming conventions e.g. 'com.example.subdomain.event.type'",
   *                    "type": "string"
   *                  }
   *                },
   *                "required": [
   *                  "type"
   *                ],
   *                "title": "Event",
   *                "type": "object"
   *              }
   *            ],
   *            "title": "Event",
   *            "type": "object"
   *          },
   *          "type": "array"
   *        },
   *        "end": {
   *          "description": "A token which correlates to the last value in ``chunk``. This\ntoken should be used with the ``/events`` API to listen for new\nevents.",
   *          "type": "string"
   *        },
   *        "presence": {
   *          "description": "A list of presence events.",
   *          "items": {
   *            "allOf": [
   *              {
   *                "description": "The basic set of fields all events must have.",
   *                "properties": {
   *                  "content": {
   *                    "description": "The fields in this object will vary depending on the type of event. When interacting with the REST API, this is the HTTP body.",
   *                    "type": "object"
   *                  },
   *                  "type": {
   *                    "description": "The type of event. This SHOULD be namespaced similar to Java package naming conventions e.g. 'com.example.subdomain.event.type'",
   *                    "type": "string"
   *                  }
   *                },
   *                "required": [
   *                  "type"
   *                ],
   *                "title": "Event",
   *                "type": "object"
   *              }
   *            ],
   *            "title": "Event",
   *            "type": "object"
   *          },
   *          "type": "array"
   *        },
   *        "rooms": {
   *          "items": {
   *            "properties": {
   *              "account_data": {
   *                "description": "The private data that this user has attached to\nthis room.",
   *                "items": {
   *                  "allOf": [
   *                    {
   *                      "description": "The basic set of fields all events must have.",
   *                      "properties": {
   *                        "content": {
   *                          "description": "The fields in this object will vary depending on the type of event. When interacting with the REST API, this is the HTTP body.",
   *                          "type": "object"
   *                        },
   *                        "type": {
   *                          "description": "The type of event. This SHOULD be namespaced similar to Java package naming conventions e.g. 'com.example.subdomain.event.type'",
   *                          "type": "string"
   *                        }
   *                      },
   *                      "required": [
   *                        "type"
   *                      ],
   *                      "title": "Event",
   *                      "type": "object"
   *                    }
   *                  ],
   *                  "title": "Event",
   *                  "type": "object"
   *                },
   *                "type": "array"
   *              },
   *              "invite": {
   *                "allOf": [
   *                  {
   *                    "allOf": [
   *                      {
   *                        "allOf": [
   *                          {
   *                            "allOf": [
   *                              {
   *                                "description": "The basic set of fields all events must have.",
   *                                "properties": {
   *                                  "content": {
   *                                    "description": "The fields in this object will vary depending on the type of event. When interacting with the REST API, this is the HTTP body.",
   *                                    "type": "object"
   *                                  },
   *                                  "type": {
   *                                    "description": "The type of event. This SHOULD be namespaced similar to Java package naming conventions e.g. 'com.example.subdomain.event.type'",
   *                                    "type": "string"
   *                                  }
   *                                },
   *                                "required": [
   *                                  "type"
   *                                ],
   *                                "title": "Event",
   *                                "type": "object"
   *                              }
   *                            ],
   *                            "description": "In addition to the Event fields, Room Events have the following additional fields.",
   *                            "properties": {
   *                              "event_id": {
   *                                "description": "The globally unique event identifier.",
   *                                "type": "string"
   *                              },
   *                              "origin_server_ts": {
   *                                "description": "Timestamp in milliseconds on originating homeserver when this event was sent.",
   *                                "type": "number"
   *                              },
   *                              "room_id": {
   *                                "description": "The ID of the room associated with this event.",
   *                                "type": "string"
   *                              },
   *                              "sender": {
   *                                "description": "Contains the fully-qualified ID of the user who *sent* this event.",
   *                                "type": "string"
   *                              },
   *                              "unsigned": {
   *                                "description": "Contains optional extra information about the event.",
   *                                "properties": {
   *                                  "age": {
   *                                    "description": "The time in milliseconds that has elapsed since the event was sent. This field is generated by the local homeserver, and may be incorrect if the local time on at least one of the two servers is out of sync, which can cause the age to either be negative or greater than it actually is.",
   *                                    "type": "integer"
   *                                  },
   *                                  "redacted_because": {
   *                                    "description": "Optional. The event that redacted this event, if any.",
   *                                    "title": "Event",
   *                                    "type": "object"
   *                                  },
   *                                  "transaction_id": {
   *                                    "description": "The client-supplied transaction ID, if the client being given the event is the same one which sent it.",
   *                                    "type": "string"
   *                                  }
   *                                },
   *                                "title": "UnsignedData",
   *                                "type": "object"
   *                              }
   *                            },
   *                            "required": [
   *                              "event_id",
   *                              "room_id",
   *                              "sender",
   *                              "origin_server_ts"
   *                            ],
   *                            "title": "Room Event",
   *                            "type": "object"
   *                          }
   *                        ],
   *                        "description": "In addition to the Room Event fields, State Events have the following additional fields.",
   *                        "properties": {
   *                          "prev_content": {
   *                            "description": "Optional. The previous ``content`` for this event. If there is no previous content, this key will be missing.",
   *                            "title": "EventContent",
   *                            "type": "object"
   *                          },
   *                          "state_key": {
   *                            "description": "A unique key which defines the overwriting semantics for this piece of room state. This value is often a zero-length string. The presence of this key makes this event a State Event. The key MUST NOT start with '_'.",
   *                            "type": "string"
   *                          }
   *                        },
   *                        "required": [
   *                          "state_key"
   *                        ],
   *                        "title": "State Event",
   *                        "type": "object"
   *                      }
   *                    ],
   *                    "description": "Adjusts the membership state for a user in a room. It is preferable to use the membership APIs (``/rooms/<room id>/invite`` etc) when performing membership actions rather than adjusting the state directly as there are a restricted set of valid transformations. For example, user A cannot force user B to join a room, and trying to force this state change directly will fail.\n\nThe following membership states are specified:\n\n- ``invite`` - The user has been invited to join a room, but has not yet joined it. They may not participate in the room until they join.\n\n- ``join`` - The user has joined the room (possibly after accepting an invite), and may participate in it.\n\n- ``leave`` - The user was once joined to the room, but has since left (possibly by choice, or possibly by being kicked).\n\n- ``ban`` - The user has been banned from the room, and is no longer allowed to join it until they are un-banned from the room (by having their membership state set to a value other than ``ban``).\n\n- ``knock`` - This is a reserved word, which currently has no meaning.\n\nThe ``third_party_invite`` property will be set if this invite is an ``invite`` event and is the successor of an ``m.room.third_party_invite`` event, and absent otherwise.\n\nThis event may also include an ``invite_room_state`` key **outside the** ``content`` **key**. If present, this contains an array of ``StrippedState`` Events. These events provide information on a subset of state events such as the room name.",
   *                    "properties": {
   *                      "content": {
   *                        "properties": {
   *                          "avatar_url": {
   *                            "description": "The avatar URL for this user, if any. This is added by the homeserver.",
   *                            "type": "string"
   *                          },
   *                          "displayname": {
   *                            "description": "The display name for this user, if any. This is added by the homeserver.",
   *                            "type": [
   *                              "string",
   *                              "null"
   *                            ]
   *                          },
   *                          "is_direct": {
   *                            "description": "Flag indicating if the room containing this event was created with the intention of being a direct chat. See `Direct Messaging`_.",
   *                            "type": "boolean"
   *                          },
   *                          "membership": {
   *                            "description": "The membership state of the user.",
   *                            "enum": [
   *                              "invite",
   *                              "join",
   *                              "knock",
   *                              "leave",
   *                              "ban"
   *                            ],
   *                            "type": "string"
   *                          },
   *                          "third_party_invite": {
   *                            "properties": {
   *                              "display_name": {
   *                                "description": "A name which can be displayed to represent the user instead of their third party identifier",
   *                                "type": "string"
   *                              },
   *                              "signed": {
   *                                "description": "A block of content which has been signed, which servers can use to verify the event. Clients should ignore this.",
   *                                "properties": {
   *                                  "mxid": {
   *                                    "description": "The invited matrix user ID. Must be equal to the user_id property of the event.",
   *                                    "type": "string"
   *                                  },
   *                                  "signatures": {
   *                                    "description": "A single signature from the verifying server, in the format specified by the Signing Events section of the server-server API.",
   *                                    "title": "Signatures",
   *                                    "type": "object"
   *                                  },
   *                                  "token": {
   *                                    "description": "The token property of the containing third_party_invite object.",
   *                                    "type": "string"
   *                                  }
   *                                },
   *                                "required": [
   *                                  "mxid",
   *                                  "signatures",
   *                                  "token"
   *                                ],
   *                                "title": "signed",
   *                                "type": "object"
   *                              }
   *                            },
   *                            "required": [
   *                              "display_name",
   *                              "signed"
   *                            ],
   *                            "title": "Invite",
   *                            "type": "object"
   *                          }
   *                        },
   *                        "required": [
   *                          "membership"
   *                        ],
   *                        "title": "EventContent",
   *                        "type": "object"
   *                      },
   *                      "invite_room_state": {
   *                        "description": "A subset of the state of the room at the time of the invite, if ``membership`` is ``invite``. Note that this state is informational, and SHOULD NOT be trusted; once the client has joined the room, it SHOULD fetch the live state from the server and discard the invite_room_state. Also, clients must not rely on any particular state being present here; they SHOULD behave properly (with possibly a degraded but not a broken experience) in the absence of any particular events here. If they are set on the room, at least the state for ``m.room.avatar``, ``m.room.canonical_alias``, ``m.room.join_rules``, and ``m.room.name`` SHOULD be included.",
   *                        "items": {
   *                          "description": "A stripped down state event, with only the ``type``, ``state_key`` and ``content`` keys.",
   *                          "properties": {
   *                            "content": {
   *                              "description": "The ``content`` for the event.",
   *                              "title": "EventContent",
   *                              "type": "object"
   *                            },
   *                            "state_key": {
   *                              "description": "The ``state_key`` for the event.",
   *                              "type": "string"
   *                            },
   *                            "type": {
   *                              "description": "The ``type`` for the event.",
   *                              "type": "string"
   *                            }
   *                          },
   *                          "required": [
   *                            "type",
   *                            "state_key",
   *                            "content"
   *                          ],
   *                          "title": "StrippedState",
   *                          "type": "object"
   *                        },
   *                        "type": "array"
   *                      },
   *                      "state_key": {
   *                        "description": "The ``user_id`` this membership event relates to.",
   *                        "type": "string"
   *                      },
   *                      "type": {
   *                        "enum": [
   *                          "m.room.member"
   *                        ],
   *                        "type": "string"
   *                      }
   *                    },
   *                    "title": "The current membership state of a user in the room.",
   *                    "type": "object"
   *                  }
   *                ],
   *                "description": "The invite event if ``membership`` is ``invite``",
   *                "title": "InviteEvent",
   *                "type": "object"
   *              },
   *              "membership": {
   *                "description": "The user's membership state in this room.",
   *                "enum": [
   *                  "invite",
   *                  "join",
   *                  "leave",
   *                  "ban"
   *                ],
   *                "type": "string"
   *              },
   *              "messages": {
   *                "description": "The pagination chunk for this room.",
   *                "properties": {
   *                  "chunk": {
   *                    "description": "If the user is a member of the room this will be a\nlist of the most recent messages for this room. If\nthe user has left the room this will be the\nmessages that preceeded them leaving. This array\nwill consist of at most ``limit`` elements.",
   *                    "items": {
   *                      "allOf": [
   *                        {
   *                          "allOf": [
   *                            {
   *                              "description": "The basic set of fields all events must have.",
   *                              "properties": {
   *                                "content": {
   *                                  "description": "The fields in this object will vary depending on the type of event. When interacting with the REST API, this is the HTTP body.",
   *                                  "type": "object"
   *                                },
   *                                "type": {
   *                                  "description": "The type of event. This SHOULD be namespaced similar to Java package naming conventions e.g. 'com.example.subdomain.event.type'",
   *                                  "type": "string"
   *                                }
   *                              },
   *                              "required": [
   *                                "type"
   *                              ],
   *                              "title": "Event",
   *                              "type": "object"
   *                            }
   *                          ],
   *                          "description": "In addition to the Event fields, Room Events have the following additional fields.",
   *                          "properties": {
   *                            "event_id": {
   *                              "description": "The globally unique event identifier.",
   *                              "type": "string"
   *                            },
   *                            "origin_server_ts": {
   *                              "description": "Timestamp in milliseconds on originating homeserver when this event was sent.",
   *                              "type": "number"
   *                            },
   *                            "room_id": {
   *                              "description": "The ID of the room associated with this event.",
   *                              "type": "string"
   *                            },
   *                            "sender": {
   *                              "description": "Contains the fully-qualified ID of the user who *sent* this event.",
   *                              "type": "string"
   *                            },
   *                            "unsigned": {
   *                              "description": "Contains optional extra information about the event.",
   *                              "properties": {
   *                                "age": {
   *                                  "description": "The time in milliseconds that has elapsed since the event was sent. This field is generated by the local homeserver, and may be incorrect if the local time on at least one of the two servers is out of sync, which can cause the age to either be negative or greater than it actually is.",
   *                                  "type": "integer"
   *                                },
   *                                "redacted_because": {
   *                                  "description": "Optional. The event that redacted this event, if any.",
   *                                  "title": "Event",
   *                                  "type": "object"
   *                                },
   *                                "transaction_id": {
   *                                  "description": "The client-supplied transaction ID, if the client being given the event is the same one which sent it.",
   *                                  "type": "string"
   *                                }
   *                              },
   *                              "title": "UnsignedData",
   *                              "type": "object"
   *                            }
   *                          },
   *                          "required": [
   *                            "event_id",
   *                            "room_id",
   *                            "sender",
   *                            "origin_server_ts"
   *                          ],
   *                          "title": "Room Event",
   *                          "type": "object"
   *                        }
   *                      ],
   *                      "title": "RoomEvent",
   *                      "type": "object"
   *                    },
   *                    "type": "array"
   *                  },
   *                  "end": {
   *                    "description": "A token which correlates to the last value in ``chunk``.\nUsed for pagination.",
   *                    "type": "string"
   *                  },
   *                  "start": {
   *                    "description": "A token which correlates to the first value in ``chunk``.\nUsed for pagination.",
   *                    "type": "string"
   *                  }
   *                },
   *                "required": [
   *                  "start",
   *                  "end",
   *                  "chunk"
   *                ],
   *                "title": "PaginationChunk",
   *                "type": "object"
   *              },
   *              "room_id": {
   *                "description": "The ID of this room.",
   *                "type": "string"
   *              },
   *              "state": {
   *                "description": "If the user is a member of the room this will be the\ncurrent state of the room as a list of events. If the\nuser has left the room this will be the state of the\nroom when they left it.",
   *                "items": {
   *                  "allOf": [
   *                    {
   *                      "allOf": [
   *                        {
   *                          "allOf": [
   *                            {
   *                              "description": "The basic set of fields all events must have.",
   *                              "properties": {
   *                                "content": {
   *                                  "description": "The fields in this object will vary depending on the type of event. When interacting with the REST API, this is the HTTP body.",
   *                                  "type": "object"
   *                                },
   *                                "type": {
   *                                  "description": "The type of event. This SHOULD be namespaced similar to Java package naming conventions e.g. 'com.example.subdomain.event.type'",
   *                                  "type": "string"
   *                                }
   *                              },
   *                              "required": [
   *                                "type"
   *                              ],
   *                              "title": "Event",
   *                              "type": "object"
   *                            }
   *                          ],
   *                          "description": "In addition to the Event fields, Room Events have the following additional fields.",
   *                          "properties": {
   *                            "event_id": {
   *                              "description": "The globally unique event identifier.",
   *                              "type": "string"
   *                            },
   *                            "origin_server_ts": {
   *                              "description": "Timestamp in milliseconds on originating homeserver when this event was sent.",
   *                              "type": "number"
   *                            },
   *                            "room_id": {
   *                              "description": "The ID of the room associated with this event.",
   *                              "type": "string"
   *                            },
   *                            "sender": {
   *                              "description": "Contains the fully-qualified ID of the user who *sent* this event.",
   *                              "type": "string"
   *                            },
   *                            "unsigned": {
   *                              "description": "Contains optional extra information about the event.",
   *                              "properties": {
   *                                "age": {
   *                                  "description": "The time in milliseconds that has elapsed since the event was sent. This field is generated by the local homeserver, and may be incorrect if the local time on at least one of the two servers is out of sync, which can cause the age to either be negative or greater than it actually is.",
   *                                  "type": "integer"
   *                                },
   *                                "redacted_because": {
   *                                  "description": "Optional. The event that redacted this event, if any.",
   *                                  "title": "Event",
   *                                  "type": "object"
   *                                },
   *                                "transaction_id": {
   *                                  "description": "The client-supplied transaction ID, if the client being given the event is the same one which sent it.",
   *                                  "type": "string"
   *                                }
   *                              },
   *                              "title": "UnsignedData",
   *                              "type": "object"
   *                            }
   *                          },
   *                          "required": [
   *                            "event_id",
   *                            "room_id",
   *                            "sender",
   *                            "origin_server_ts"
   *                          ],
   *                          "title": "Room Event",
   *                          "type": "object"
   *                        }
   *                      ],
   *                      "description": "In addition to the Room Event fields, State Events have the following additional fields.",
   *                      "properties": {
   *                        "prev_content": {
   *                          "description": "Optional. The previous ``content`` for this event. If there is no previous content, this key will be missing.",
   *                          "title": "EventContent",
   *                          "type": "object"
   *                        },
   *                        "state_key": {
   *                          "description": "A unique key which defines the overwriting semantics for this piece of room state. This value is often a zero-length string. The presence of this key makes this event a State Event. The key MUST NOT start with '_'.",
   *                          "type": "string"
   *                        }
   *                      },
   *                      "required": [
   *                        "state_key"
   *                      ],
   *                      "title": "State Event",
   *                      "type": "object"
   *                    }
   *                  ],
   *                  "title": "StateEvent",
   *                  "type": "object"
   *                },
   *                "type": "array"
   *              },
   *              "visibility": {
   *                "description": "Whether this room is visible to the ``/publicRooms`` API\nor not.\"",
   *                "enum": [
   *                  "private",
   *                  "public"
   *                ],
   *                "type": "string"
   *              }
   *            },
   *            "required": [
   *              "room_id",
   *              "membership"
   *            ],
   *            "title": "RoomInfo",
   *            "type": "object"
   *          },
   *          "type": "array"
   *        }
   *      },
   *      "required": [
   *        "end",
   *        "rooms",
   *        "presence"
   *      ],
   *      "type": "object"
   *    }
   *  },
   *  "404": {
   *    "description": "There is no avatar URL for this user or this user does not exist."
   *  }
   *}
   *
   * @security : [
   *  {
   *    "accessToken": []
   *  }
   *]
   *
   * @summary : Get the user's current state.
   *
   */
  @Get('/_matrix/client/r0/initialSync')
  async initialSync(
    @QueryParam('limit') limit: number,
    @QueryParam('archived') archived: boolean,
    @CurrentUser() user?: User
  ): Promise<dto.InitialSyncResponse | any> {
    throw new HttpError(501);
  }
}
