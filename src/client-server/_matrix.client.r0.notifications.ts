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
export class MatrixClientR0Notifications {
  /**
   * @description : This API is used to paginate through the list of events that the
   *user has been, or would have been notified about.
   *
   * @parameters : [
   *  {
   *    "description": "Pagination token given to retrieve the next set of events.",
   *    "in": "query",
   *    "name": "from",
   *    "required": false,
   *    "type": "string",
   *    "x-example": "xxxxx"
   *  },
   *  {
   *    "description": "Limit on the number of events to return in this request.",
   *    "in": "query",
   *    "name": "limit",
   *    "required": false,
   *    "type": "number",
   *    "x-example": "20"
   *  },
   *  {
   *    "description": "Allows basic filtering of events returned. Supply ``highlight``\nto return only events where the notification had the highlight\ntweak set.",
   *    "in": "query",
   *    "name": "only",
   *    "required": false,
   *    "type": "string",
   *    "x-example": "highlight"
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "A batch of events is being returned",
   *    "examples": {
   *      "application/json": {
   *        "next_token": "abcdef",
   *        "notifications": [
   *          {
   *            "actions": [
   *              "notify"
   *            ],
   *            "event": {
   *              "age": 124524,
   *              "content": {
   *                "body": "I am a fish",
   *                "msgtype": "m.text"
   *              },
   *              "event_id": "$74686972643033:example.com",
   *              "origin_server_ts": 1417731086797,
   *              "sender": "@alice:example.com",
   *              "txn_id": "1234",
   *              "type": "m.room.message"
   *            },
   *            "profile_tag": "hcbvkzxhcvb",
   *            "read": true,
   *            "room_id": "!abcdefg:example.com",
   *            "ts": 1475508881945
   *          }
   *        ]
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "next_token": {
   *          "description": "The token to supply in the ``from`` param of the next\n``/notifications`` request in order to request more\nevents. If this is absent, there are no more results.",
   *          "type": "string"
   *        },
   *        "notifications": {
   *          "description": "The list of events that triggered notifications.",
   *          "items": {
   *            "properties": {
   *              "actions": {
   *                "description": "The action(s) to perform when the conditions for this rule are met.\nSee `Push Rules: API`_.",
   *                "items": {
   *                  "type": [
   *                    "object",
   *                    "string"
   *                  ]
   *                },
   *                "type": "array"
   *              },
   *              "event": {
   *                "allOf": [
   *                  {
   *                    "properties": {
   *                      "content": {
   *                        "description": "The content of this event. The fields in this object will vary depending on the type of event.",
   *                        "title": "EventContent",
   *                        "type": "object"
   *                      },
   *                      "event_id": {
   *                        "description": "The ID of this event, if applicable.",
   *                        "type": "string"
   *                      },
   *                      "origin_server_ts": {
   *                        "description": "Timestamp in milliseconds on originating homeserver when this event was sent.",
   *                        "format": "int64",
   *                        "type": "integer"
   *                      },
   *                      "sender": {
   *                        "description": "The MXID of the user who sent this event.",
   *                        "type": "string"
   *                      },
   *                      "state_key": {
   *                        "description": "Optional. This key will only be present for state events. A unique key which defines the overwriting semantics for this piece of room state.",
   *                        "type": "string"
   *                      },
   *                      "type": {
   *                        "description": "The type of event.",
   *                        "type": "string"
   *                      },
   *                      "unsigned": {
   *                        "description": "Information about this event which was not sent by the originating homeserver",
   *                        "properties": {
   *                          "age": {
   *                            "description": "Time in milliseconds since the event was sent.",
   *                            "format": "int64",
   *                            "type": "integer"
   *                          },
   *                          "prev_content": {
   *                            "description": "Optional. The previous ``content`` for this state. This will be present only for state events appearing in the ``timeline``. If this is not a state event, or there is no previous content, this key will be missing.",
   *                            "title": "EventContent",
   *                            "type": "object"
   *                          },
   *                          "redacted_because": {
   *                            "description": "Optional. The event that redacted this event, if any.",
   *                            "title": "Event",
   *                            "type": "object"
   *                          },
   *                          "transaction_id": {
   *                            "description": "Optional. The transaction ID set when this message was sent. This key will only be present for message events sent by the device calling this API.",
   *                            "type": "string"
   *                          }
   *                        },
   *                        "title": "Unsigned",
   *                        "type": "object"
   *                      }
   *                    },
   *                    "title": "Event",
   *                    "type": "object"
   *                  }
   *                ],
   *                "description": "The Event object for the event that triggered the notification.",
   *                "title": "Event",
   *                "type": "object"
   *              },
   *              "profile_tag": {
   *                "description": "The profile tag of the rule that matched this event.",
   *                "type": "string"
   *              },
   *              "read": {
   *                "description": "Indicates whether the user has sent a read receipt indicating\nthat they have read this message.",
   *                "type": "boolean"
   *              },
   *              "room_id": {
   *                "description": "The ID of the room in which the event was posted.",
   *                "type": "string"
   *              },
   *              "ts": {
   *                "description": "The unix timestamp at which the event notification was sent,\nin milliseconds.",
   *                "type": "integer"
   *              }
   *            },
   *            "required": [
   *              "actions",
   *              "event",
   *              "read",
   *              "room_id",
   *              "ts"
   *            ],
   *            "title": "Notification",
   *            "type": "object"
   *          },
   *          "type": "array"
   *        }
   *      },
   *      "required": [
   *        "notifications"
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
   * @summary : Gets a list of events that the user has been notified about
   *
   */
  @Get('/_matrix/client/r0/notifications')
  async getNotifications(
    @QueryParam('from') from: string,
    @QueryParam('limit') limit: number,
    @QueryParam('only') only: string
  ): Promise<dto.GetNotificationsResponse | any> {
    throw new HttpError(501);
  }
}
