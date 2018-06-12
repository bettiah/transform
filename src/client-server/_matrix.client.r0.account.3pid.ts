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
export class MatrixClientR0Account3pid {
  /**
   * @description : Gets a list of the third party identifiers that the homeserver has
   *associated with the user's account.
   *
   *This is *not* the same as the list of third party identifiers bound to
   *the user's Matrix ID in Identity Servers.
   *
   *Identifiers in this list may be used by the homeserver as, for example,
   *identifiers that it will accept to reset the user's account password.
   *
   * @responses : {
   *  "200": {
   *    "description": "The lookup was successful.",
   *    "examples": {
   *      "application/json": {
   *        "threepids": [
   *          {
   *            "address": "monkey@banana.island",
   *            "medium": "email"
   *          }
   *        ]
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "threepids": {
   *          "items": {
   *            "properties": {
   *              "address": {
   *                "description": "The third party identifier address.",
   *                "type": "string"
   *              },
   *              "medium": {
   *                "description": "The medium of the third party identifier.",
   *                "enum": [
   *                  "email"
   *                ],
   *                "type": "string"
   *              }
   *            },
   *            "title": "Third party identifier",
   *            "type": "object"
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
   * @summary : Gets a list of a user's third party identifiers.
   *
   */
  @Get('/_matrix/client/r0/account/3pid')
  async getAccount3PIDs(
    @CurrentUser() user?: User
  ): Promise<dto.GetAccount3PIDsResponse | any> {
    throw new HttpError(501);
  }

  /**
   * @description : Adds contact information to the user's account.
   *
   * @parameters : [
   *  {
   *    "in": "body",
   *    "name": "body",
   *    "schema": {
   *      "example": {
   *        "bind": false,
   *        "three_pid_creds": {
   *          "client_secret": "d0n'tT3ll",
   *          "id_server": "matrix.org",
   *          "sid": "abc123987"
   *        }
   *      },
   *      "properties": {
   *        "bind": {
   *          "description": "Whether the homeserver should also bind this third party\nidentifier to the account's Matrix ID with the passed identity\nserver. Default: ``false``.",
   *          "type": "boolean",
   *          "x-example": true
   *        },
   *        "three_pid_creds": {
   *          "description": "The third party credentials to associate with the account.",
   *          "properties": {
   *            "client_secret": {
   *              "description": "The client secret used in the session with the Identity Server.",
   *              "type": "string"
   *            },
   *            "id_server": {
   *              "description": "The Identity Server to use.",
   *              "type": "string"
   *            },
   *            "sid": {
   *              "description": "The session identifier given by the Identity Server.",
   *              "type": "string"
   *            }
   *          },
   *          "required": [
   *            "client_secret",
   *            "id_server",
   *            "sid"
   *          ],
   *          "title": "ThreePidCredentials",
   *          "type": "object"
   *        }
   *      },
   *      "required": [
   *        "three_pid_creds"
   *      ],
   *      "type": "object"
   *    }
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The addition was successful.",
   *    "examples": {
   *      "application/json": {},
   *      "schema": {
   *        "type": "object"
   *      }
   *    }
   *  },
   *  "403": {
   *    "description": "The credentials could not be verified with the identity server.",
   *    "examples": {
   *      "application/json": {
   *        "errcode": "M_THREEPID_AUTH_FAILED",
   *        "error": "The third party credentials could not be verified by the identity server."
   *      }
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
   * @summary : Adds contact information to the user's account.
   *
   */
  @Post('/_matrix/client/r0/account/3pid')
  async post3PIDs(
    @Body({ required: true })
    body: dto.Post3PIDsBody,
    @CurrentUser() user?: User
  ): Promise<any> {
    throw new HttpError(501);
  }
}
