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
export class MatrixClientR0PresenceListUserId {
  /**
   * @description : Retrieve a list of presence events for every user on this list.
   *
   * @parameters : [
   *  {
   *    "description": "The user whose presence list should be retrieved.",
   *    "in": "path",
   *    "name": "userId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "@alice:example.com"
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "A list of presence events for this list.",
   *    "examples": {
   *      "application/json": [
   *        {
   *          "content": {
   *            "last_active_ago": 395,
   *            "presence": "offline",
   *            "user_id": "@alice:matrix.org"
   *          },
   *          "type": "m.presence"
   *        },
   *        {
   *          "content": {
   *            "currently_active": true,
   *            "last_active_ago": 16874,
   *            "presence": "online",
   *            "user_id": "@marisa:matrix.org"
   *          },
   *          "type": "m.presence"
   *        }
   *      ]
   *    },
   *    "schema": {
   *      "items": {
   *        "allOf": [
   *          {
   *            "description": "The basic set of fields all events must have.",
   *            "properties": {
   *              "content": {
   *                "description": "The fields in this object will vary depending on the type of event. When interacting with the REST API, this is the HTTP body.",
   *                "type": "object"
   *              },
   *              "type": {
   *                "description": "The type of event. This SHOULD be namespaced similar to Java package naming conventions e.g. 'com.example.subdomain.event.type'",
   *                "type": "string"
   *              }
   *            },
   *            "required": [
   *              "type"
   *            ],
   *            "title": "Event",
   *            "type": "object"
   *          }
   *        ],
   *        "title": "PresenceEvent",
   *        "type": "object"
   *      },
   *      "type": "array"
   *    }
   *  }
   *}
   *
   * @summary : Get presence events for this presence list.
   *
   */
  @Get('/_matrix/client/r0/presence/list/:userId')
  async getPresenceForList(
    @Param('userId') userId: string
  ): Promise<dto.PresenceEventResponse[] | any> {
    throw new HttpError(501);
  }

  /**
   * @description : Adds or removes users from this presence list.
   *
   * @parameters : [
   *  {
   *    "description": "The user whose presence list is being modified.",
   *    "in": "path",
   *    "name": "userId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "@alice:example.com"
   *  },
   *  {
   *    "description": "The modifications to make to this presence list.",
   *    "in": "body",
   *    "name": "presence_diff",
   *    "required": true,
   *    "schema": {
   *      "example": {
   *        "drop": [
   *          "@alice:matrix.org"
   *        ],
   *        "invite": [
   *          "@bob:matrix.org"
   *        ]
   *      },
   *      "properties": {
   *        "drop": {
   *          "description": "A list of user IDs to remove from the list.",
   *          "items": {
   *            "description": "A list of user IDs.",
   *            "type": "string"
   *          },
   *          "type": "array"
   *        },
   *        "invite": {
   *          "description": "A list of user IDs to add to the list.",
   *          "items": {
   *            "description": "A list of user IDs.",
   *            "type": "string"
   *          },
   *          "type": "array"
   *        }
   *      },
   *      "type": "object"
   *    }
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The list was updated.",
   *    "examples": {
   *      "application/json": {}
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
   * @summary : Add or remove users from this presence list.
   *
   */
  @Post('/_matrix/client/r0/presence/list/:userId')
  async modifyPresenceList(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: dto.ModifyPresenceListBody,
    @CurrentUser() user?: User
  ): Promise<dto.ModifyPresenceListResponse429 | any> {
    throw new HttpError(501);
  }
}
