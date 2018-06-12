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
export class MatrixClientR0PresenceUserIdStatus {
  /**
   * @description : Get the given user's presence state.
   *
   * @parameters : [
   *  {
   *    "description": "The user whose presence state to get.",
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
   *    "description": "The presence state for this user.",
   *    "examples": {
   *      "application/json": {
   *        "last_active_ago": 420845,
   *        "presence": "unavailable"
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "currently_active": {
   *          "description": "Whether the user is currently active",
   *          "type": "boolean"
   *        },
   *        "last_active_ago": {
   *          "description": "The length of time in milliseconds since an action was performed\nby this user.",
   *          "type": "integer"
   *        },
   *        "presence": {
   *          "description": "This user's presence.",
   *          "enum": [
   *            "online",
   *            "offline",
   *            "unavailable"
   *          ],
   *          "type": "string"
   *        },
   *        "status_msg": {
   *          "description": "The state message for this user if one was set.",
   *          "type": [
   *            "string",
   *            "null"
   *          ]
   *        }
   *      },
   *      "required": [
   *        "presence"
   *      ],
   *      "type": "object"
   *    }
   *  },
   *  "404": {
   *    "description": "There is no presence state for this user. This user may not exist or\nisn't exposing presence information to you."
   *  }
   *}
   *
   * @summary : Get this user's presence state.
   *
   */
  @Get('/_matrix/client/r0/presence/:userId/status')
  async getPresence(
    @Param('userId') userId: string
  ): Promise<dto.GetPresenceResponse | any> {
    throw new HttpError(501);
  }

  /**
   * @description : This API sets the given user's presence state. When setting the status,
   *the activity time is updated to reflect that activity; the client does
   *not need to specify the ``last_active_ago`` field. You cannot set the
   *presence state of another user.
   *
   * @parameters : [
   *  {
   *    "description": "The user whose presence state to update.",
   *    "in": "path",
   *    "name": "userId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "@alice:example.com"
   *  },
   *  {
   *    "description": "The updated presence state.",
   *    "in": "body",
   *    "name": "presenceState",
   *    "required": true,
   *    "schema": {
   *      "example": {
   *        "presence": "online",
   *        "status_msg": "I am here."
   *      },
   *      "properties": {
   *        "presence": {
   *          "description": "The new presence state.",
   *          "enum": [
   *            "online",
   *            "offline",
   *            "unavailable"
   *          ],
   *          "type": "string"
   *        },
   *        "status_msg": {
   *          "description": "The status message to attach to this state.",
   *          "type": "string"
   *        }
   *      },
   *      "required": [
   *        "presence"
   *      ],
   *      "type": "object"
   *    }
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The new presence state was set.",
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
   * @summary : Update this user's presence state.
   *
   */
  @Put('/_matrix/client/r0/presence/:userId/status')
  async setPresence(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: dto.SetPresenceBody
  ): Promise<dto.SetPresenceResponse429 | any> {
    throw new HttpError(501);
  }
}
