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
export class MatrixClientR0RoomsRoomIdMembers {
  /**
   * @description : Get the list of members for this room.
   *
   * @parameters : [
   *  {
   *    "description": "The room to get the member events for.",
   *    "in": "path",
   *    "name": "roomId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "!636q39766251:example.com"
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "A list of members of the room. If you are joined to the room then\nthis will be the current members of the room. If you have left the\nroom then this will be the members of the room when you left.",
   *    "examples": {
   *      "application/json": {
   *        "chunk": [
   *          {
   *            "age": 6547561012,
   *            "content": {
   *              "avatar_url": "mxc://example.com/fzysBrHpPEeTGANCVLXWXNMI#auto",
   *              "membership": "join"
   *            },
   *            "event_id": "$1426600438280zExKY:example.com",
   *            "membership": "join",
   *            "origin_server_ts": 1426600438277,
   *            "room_id": "!636q39766251:example.com",
   *            "sender": "@alice:example.com",
   *            "state_key": "@alice:example.com",
   *            "type": "m.room.member"
   *          },
   *          {
   *            "age": 1622568720,
   *            "content": {
   *              "avatar_url": "mxc://example.com/GCmhgzMPRjqgpODLsNQzVuHZ#auto",
   *              "displayname": "Bob",
   *              "membership": "join"
   *            },
   *            "event_id": "$1431525430134MxlLX:example.com",
   *            "origin_server_ts": 1431525430569,
   *            "replaces_state": "$142652023736BSXcM:example.com",
   *            "room_id": "!636q39766251:example.com",
   *            "sender": "@bob:example.com",
   *            "state_key": "@bob:example.com",
   *            "type": "m.room.member"
   *          }
   *        ]
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "chunk": {
   *          "items": {
   *            "allOf": [
   *              {
   *                "allOf": [
   *                  {
   *                    "allOf": [
   *                      {
   *                        "allOf": [
   *                          {
   *                            "description": "The basic set of fields all events must have.",
   *                            "properties": {
   *                              "content": {
   *                                "description": "The fields in this object will vary depending on the type of event. When interacting with the REST API, this is the HTTP body.",
   *                                "type": "object"
   *                              },
   *                              "type": {
   *                                "description": "The type of event. This SHOULD be namespaced similar to Java package naming conventions e.g. 'com.example.subdomain.event.type'",
   *                                "type": "string"
   *                              }
   *                            },
   *                            "required": [
   *                              "type"
   *                            ],
   *                            "title": "Event",
   *                            "type": "object"
   *                          }
   *                        ],
   *                        "description": "In addition to the Event fields, Room Events have the following additional fields.",
   *                        "properties": {
   *                          "event_id": {
   *                            "description": "The globally unique event identifier.",
   *                            "type": "string"
   *                          },
   *                          "origin_server_ts": {
   *                            "description": "Timestamp in milliseconds on originating homeserver when this event was sent.",
   *                            "type": "number"
   *                          },
   *                          "room_id": {
   *                            "description": "The ID of the room associated with this event.",
   *                            "type": "string"
   *                          },
   *                          "sender": {
   *                            "description": "Contains the fully-qualified ID of the user who *sent* this event.",
   *                            "type": "string"
   *                          },
   *                          "unsigned": {
   *                            "description": "Contains optional extra information about the event.",
   *                            "properties": {
   *                              "age": {
   *                                "description": "The time in milliseconds that has elapsed since the event was sent. This field is generated by the local homeserver, and may be incorrect if the local time on at least one of the two servers is out of sync, which can cause the age to either be negative or greater than it actually is.",
   *                                "type": "integer"
   *                              },
   *                              "redacted_because": {
   *                                "description": "Optional. The event that redacted this event, if any.",
   *                                "title": "Event",
   *                                "type": "object"
   *                              },
   *                              "transaction_id": {
   *                                "description": "The client-supplied transaction ID, if the client being given the event is the same one which sent it.",
   *                                "type": "string"
   *                              }
   *                            },
   *                            "title": "UnsignedData",
   *                            "type": "object"
   *                          }
   *                        },
   *                        "required": [
   *                          "event_id",
   *                          "room_id",
   *                          "sender",
   *                          "origin_server_ts"
   *                        ],
   *                        "title": "Room Event",
   *                        "type": "object"
   *                      }
   *                    ],
   *                    "description": "In addition to the Room Event fields, State Events have the following additional fields.",
   *                    "properties": {
   *                      "prev_content": {
   *                        "description": "Optional. The previous ``content`` for this event. If there is no previous content, this key will be missing.",
   *                        "title": "EventContent",
   *                        "type": "object"
   *                      },
   *                      "state_key": {
   *                        "description": "A unique key which defines the overwriting semantics for this piece of room state. This value is often a zero-length string. The presence of this key makes this event a State Event. The key MUST NOT start with '_'.",
   *                        "type": "string"
   *                      }
   *                    },
   *                    "required": [
   *                      "state_key"
   *                    ],
   *                    "title": "State Event",
   *                    "type": "object"
   *                  }
   *                ],
   *                "description": "Adjusts the membership state for a user in a room. It is preferable to use the membership APIs (``/rooms/<room id>/invite`` etc) when performing membership actions rather than adjusting the state directly as there are a restricted set of valid transformations. For example, user A cannot force user B to join a room, and trying to force this state change directly will fail.\n\nThe following membership states are specified:\n\n- ``invite`` - The user has been invited to join a room, but has not yet joined it. They may not participate in the room until they join.\n\n- ``join`` - The user has joined the room (possibly after accepting an invite), and may participate in it.\n\n- ``leave`` - The user was once joined to the room, but has since left (possibly by choice, or possibly by being kicked).\n\n- ``ban`` - The user has been banned from the room, and is no longer allowed to join it until they are un-banned from the room (by having their membership state set to a value other than ``ban``).\n\n- ``knock`` - This is a reserved word, which currently has no meaning.\n\nThe ``third_party_invite`` property will be set if this invite is an ``invite`` event and is the successor of an ``m.room.third_party_invite`` event, and absent otherwise.\n\nThis event may also include an ``invite_room_state`` key **outside the** ``content`` **key**. If present, this contains an array of ``StrippedState`` Events. These events provide information on a subset of state events such as the room name.",
   *                "properties": {
   *                  "content": {
   *                    "properties": {
   *                      "avatar_url": {
   *                        "description": "The avatar URL for this user, if any. This is added by the homeserver.",
   *                        "type": "string"
   *                      },
   *                      "displayname": {
   *                        "description": "The display name for this user, if any. This is added by the homeserver.",
   *                        "type": [
   *                          "string",
   *                          "null"
   *                        ]
   *                      },
   *                      "is_direct": {
   *                        "description": "Flag indicating if the room containing this event was created with the intention of being a direct chat. See `Direct Messaging`_.",
   *                        "type": "boolean"
   *                      },
   *                      "membership": {
   *                        "description": "The membership state of the user.",
   *                        "enum": [
   *                          "invite",
   *                          "join",
   *                          "knock",
   *                          "leave",
   *                          "ban"
   *                        ],
   *                        "type": "string"
   *                      },
   *                      "third_party_invite": {
   *                        "properties": {
   *                          "display_name": {
   *                            "description": "A name which can be displayed to represent the user instead of their third party identifier",
   *                            "type": "string"
   *                          },
   *                          "signed": {
   *                            "description": "A block of content which has been signed, which servers can use to verify the event. Clients should ignore this.",
   *                            "properties": {
   *                              "mxid": {
   *                                "description": "The invited matrix user ID. Must be equal to the user_id property of the event.",
   *                                "type": "string"
   *                              },
   *                              "signatures": {
   *                                "description": "A single signature from the verifying server, in the format specified by the Signing Events section of the server-server API.",
   *                                "title": "Signatures",
   *                                "type": "object"
   *                              },
   *                              "token": {
   *                                "description": "The token property of the containing third_party_invite object.",
   *                                "type": "string"
   *                              }
   *                            },
   *                            "required": [
   *                              "mxid",
   *                              "signatures",
   *                              "token"
   *                            ],
   *                            "title": "signed",
   *                            "type": "object"
   *                          }
   *                        },
   *                        "required": [
   *                          "display_name",
   *                          "signed"
   *                        ],
   *                        "title": "Invite",
   *                        "type": "object"
   *                      }
   *                    },
   *                    "required": [
   *                      "membership"
   *                    ],
   *                    "title": "EventContent",
   *                    "type": "object"
   *                  },
   *                  "invite_room_state": {
   *                    "description": "A subset of the state of the room at the time of the invite, if ``membership`` is ``invite``. Note that this state is informational, and SHOULD NOT be trusted; once the client has joined the room, it SHOULD fetch the live state from the server and discard the invite_room_state. Also, clients must not rely on any particular state being present here; they SHOULD behave properly (with possibly a degraded but not a broken experience) in the absence of any particular events here. If they are set on the room, at least the state for ``m.room.avatar``, ``m.room.canonical_alias``, ``m.room.join_rules``, and ``m.room.name`` SHOULD be included.",
   *                    "items": {
   *                      "description": "A stripped down state event, with only the ``type``, ``state_key`` and ``content`` keys.",
   *                      "properties": {
   *                        "content": {
   *                          "description": "The ``content`` for the event.",
   *                          "title": "EventContent",
   *                          "type": "object"
   *                        },
   *                        "state_key": {
   *                          "description": "The ``state_key`` for the event.",
   *                          "type": "string"
   *                        },
   *                        "type": {
   *                          "description": "The ``type`` for the event.",
   *                          "type": "string"
   *                        }
   *                      },
   *                      "required": [
   *                        "type",
   *                        "state_key",
   *                        "content"
   *                      ],
   *                      "title": "StrippedState",
   *                      "type": "object"
   *                    },
   *                    "type": "array"
   *                  },
   *                  "state_key": {
   *                    "description": "The ``user_id`` this membership event relates to.",
   *                    "type": "string"
   *                  },
   *                  "type": {
   *                    "enum": [
   *                      "m.room.member"
   *                    ],
   *                    "type": "string"
   *                  }
   *                },
   *                "title": "The current membership state of a user in the room.",
   *                "type": "object"
   *              }
   *            ],
   *            "title": "MemberEvent",
   *            "type": "object"
   *          },
   *          "type": "array"
   *        }
   *      },
   *      "type": "object"
   *    }
   *  },
   *  "403": {
   *    "description": "You aren't a member of the room and weren't previously a member of the room.\n"
   *  }
   *}
   *
   * @security : [
   *  {
   *    "accessToken": []
   *  }
   *]
   *
   * @summary : Get the m.room.member events for the room.
   *
   */
  @Get('/_matrix/client/r0/rooms/:roomId/members')
  async getMembersByRoom(
    @Param('roomId') roomId: string
  ): Promise<dto.GetMembersByRoomResponse | any> {
    throw new HttpError(501);
  }
}
