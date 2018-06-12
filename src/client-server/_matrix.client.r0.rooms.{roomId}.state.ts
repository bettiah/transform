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
export class MatrixClientR0RoomsRoomIdState {
  /**
   * @description : Get the state events for the current state of a room.
   *
   * @parameters : [
   *  {
   *    "description": "The room to look up the state for.",
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
   *    "description": "The current state of the room",
   *    "examples": {
   *      "application/json": [
   *        {
   *          "age": 7148266897,
   *          "content": {
   *            "join_rule": "public"
   *          },
   *          "event_id": "$14259997323TLwtb:example.com",
   *          "origin_server_ts": 1425999732392,
   *          "room_id": "!636q39766251:example.com",
   *          "sender": "@alice:example.com",
   *          "state_key": "",
   *          "type": "m.room.join_rules"
   *        },
   *        {
   *          "age": 6547561012,
   *          "content": {
   *            "avatar_url": "mxc://example.com/fzysBrHpPEeTGANCVLXWXNMI#auto",
   *            "membership": "join"
   *          },
   *          "event_id": "$1426600438280zExKY:example.com",
   *          "membership": "join",
   *          "origin_server_ts": 1426600438277,
   *          "room_id": "!636q39766251:example.com",
   *          "sender": "@alice:example.com",
   *          "state_key": "@alice:example.com",
   *          "type": "m.room.member"
   *        },
   *        {
   *          "age": 7148267200,
   *          "content": {
   *            "creator": "@alice:example.com"
   *          },
   *          "event_id": "$14259997320KhbwJ:example.com",
   *          "origin_server_ts": 1425999732089,
   *          "room_id": "!636q39766251:example.com",
   *          "sender": "@alice:example.com",
   *          "state_key": "",
   *          "type": "m.room.create"
   *        },
   *        {
   *          "age": 1622568720,
   *          "content": {
   *            "avatar_url": "mxc://example.com/GCmhgzMPRjqgpODLsNQzVuHZ#auto",
   *            "displayname": "Bob",
   *            "membership": "join"
   *          },
   *          "event_id": "$1431525430134MxlLX:example.com",
   *          "origin_server_ts": 1431525430569,
   *          "replaces_state": "$142652023736BSXcM:example.com",
   *          "room_id": "!636q39766251:example.com",
   *          "sender": "@bob:example.com",
   *          "state_key": "@bob:example.com",
   *          "type": "m.room.member"
   *        },
   *        {
   *          "age": 7148267004,
   *          "content": {
   *            "ban": 50,
   *            "events": {
   *              "m.room.name": 100,
   *              "m.room.power_levels": 100
   *            },
   *            "events_default": 0,
   *            "kick": 50,
   *            "redact": 50,
   *            "state_default": 50,
   *            "users": {
   *              "@alice:example.com": 100
   *            },
   *            "users_default": 0
   *          },
   *          "event_id": "$14259997322mqfaq:example.com",
   *          "origin_server_ts": 1425999732285,
   *          "room_id": "!636q39766251:example.com",
   *          "sender": "@alice:example.com",
   *          "state_key": "",
   *          "type": "m.room.power_levels"
   *        }
   *      ]
   *    },
   *    "schema": {
   *      "description": "If the user is a member of the room this will be the\ncurrent state of the room as a list of events. If the user\nhas left the room then this will be the state of the room\nwhen they left as a list of events.",
   *      "items": {
   *        "allOf": [
   *          {
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
   *            ],
   *            "description": "In addition to the Room Event fields, State Events have the following additional fields.",
   *            "properties": {
   *              "prev_content": {
   *                "description": "Optional. The previous ``content`` for this event. If there is no previous content, this key will be missing.",
   *                "title": "EventContent",
   *                "type": "object"
   *              },
   *              "state_key": {
   *                "description": "A unique key which defines the overwriting semantics for this piece of room state. This value is often a zero-length string. The presence of this key makes this event a State Event. The key MUST NOT start with '_'.",
   *                "type": "string"
   *              }
   *            },
   *            "required": [
   *              "state_key"
   *            ],
   *            "title": "State Event",
   *            "type": "object"
   *          }
   *        ],
   *        "title": "StateEvent",
   *        "type": "object"
   *      },
   *      "title": "RoomState",
   *      "type": "array"
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
   * @summary : Get all state events in the current state of a room.
   *
   */
  @Get('/_matrix/client/r0/rooms/:roomId/state')
  async getRoomState(
    @Param('roomId') roomId: string,
    @CurrentUser() user?: User
  ): Promise<dto.StateEventResponse[] | any> {
    throw new HttpError(501);
  }
}
