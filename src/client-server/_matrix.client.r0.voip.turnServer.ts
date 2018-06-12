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
export class MatrixClientR0VoipTurnServer {
  /**
   * @description : This API provides credentials for the client to use when initiating
   *calls.
   *
   * @responses : {
   *  "200": {
   *    "description": "The TURN server credentials.",
   *    "examples": {
   *      "application/json": {
   *        "password": "JlKfBy1QwLrO20385QyAtEyIv0=",
   *        "ttl": 86400,
   *        "uris": [
   *          "turn:turn.example.com:3478?transport=udp",
   *          "turn:10.20.30.40:3478?transport=tcp",
   *          "turns:10.20.30.40:443?transport=tcp"
   *        ],
   *        "username": "1443779631:@user:example.com"
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "password": {
   *          "description": "The password to use.",
   *          "type": "string"
   *        },
   *        "ttl": {
   *          "description": "The time-to-live in seconds",
   *          "type": "integer"
   *        },
   *        "uris": {
   *          "description": "A list of TURN URIs",
   *          "items": {
   *            "type": "string"
   *          },
   *          "type": "array"
   *        },
   *        "username": {
   *          "description": "The username to use.",
   *          "type": "string"
   *        }
   *      },
   *      "required": [
   *        "username",
   *        "password",
   *        "uris",
   *        "ttl"
   *      ],
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
   * @summary : Obtain TURN server credentials.
   *
   */
  @Get('/_matrix/client/r0/voip/turnServer')
  async getTurnServer(): Promise<
    dto.GetTurnServerResponse | dto.GetTurnServerResponse429 | any
  > {
    throw new HttpError(501);
  }
}
