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
export class MatrixClientR0AdminWhoisUserId {
  /**
   * @description : Gets information about a particular user.
   *
   *This API may be restricted to only be called by the user being looked
   *up, or by a server admin. Server-local administrator privileges are not
   *specified in this document.
   *
   * @parameters : [
   *  {
   *    "description": "The user to look up.",
   *    "in": "path",
   *    "name": "userId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "@peter:rabbit.rocks"
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The lookup was successful.",
   *    "examples": {
   *      "application/json": {
   *        "devices": {
   *          "teapot": {
   *            "sessions": [
   *              {
   *                "connections": [
   *                  {
   *                    "ip": "127.0.0.1",
   *                    "last_seen": 1411996332123,
   *                    "user_agent": "curl/7.31.0-DEV"
   *                  },
   *                  {
   *                    "ip": "10.0.0.2",
   *                    "last_seen": 1411996332123,
   *                    "user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36"
   *                  }
   *                ]
   *              }
   *            ]
   *          }
   *        },
   *        "user_id": "@peter:rabbit.rocks"
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "devices": {
   *          "additionalProperties": {
   *            "properties": {
   *              "sessions": {
   *                "description": "A user's sessions (i.e. what they did with an access token from one login).",
   *                "items": {
   *                  "properties": {
   *                    "connections": {
   *                      "description": "Information particular connections in the session.",
   *                      "items": {
   *                        "properties": {
   *                          "ip": {
   *                            "description": "Most recently seen IP address of the session.",
   *                            "type": "string"
   *                          },
   *                          "last_seen": {
   *                            "description": "Unix timestamp that the session was last active.",
   *                            "type": "number"
   *                          },
   *                          "user_agent": {
   *                            "description": "User agent string last seen in the session.",
   *                            "type": "string"
   *                          }
   *                        },
   *                        "title": "ConnectionInfo",
   *                        "type": "object"
   *                      },
   *                      "type": "array"
   *                    }
   *                  },
   *                  "title": "SessionInfo",
   *                  "type": "object"
   *                },
   *                "type": "array"
   *              }
   *            },
   *            "title": "DeviceInfo",
   *            "type": "object"
   *          },
   *          "description": "Each key is an identitfier for one of the user's devices.",
   *          "type": "object"
   *        },
   *        "user_id": {
   *          "description": "The Matrix user ID of the user.",
   *          "type": "string"
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
   * @summary : Gets information about a particular user.
   *
   */
  @Get('/_matrix/client/r0/admin/whois/:userId')
  async getWhoIs(
    @Param('userId') userId: string,
    @CurrentUser() user?: User
  ): Promise<dto.GetWhoIsResponse | any> {
    throw new HttpError(501);
  }
}
