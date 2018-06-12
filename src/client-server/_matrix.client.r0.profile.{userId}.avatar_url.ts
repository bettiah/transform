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
export class MatrixClientR0ProfileUserIdAvatarUrl {
  /**
   * @description : Get the user's avatar URL. This API may be used to fetch the user's
   *own avatar URL or to query the URL of other users; either locally or
   *on remote homeservers.
   *
   * @parameters : [
   *  {
   *    "description": "The user whose avatar URL to get.",
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
   *    "description": "The avatar URL for this user.",
   *    "examples": {
   *      "application/json": {
   *        "avatar_url": "mxc://matrix.org/SDGdghriugerRg"
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "avatar_url": {
   *          "description": "The user's avatar URL if they have set one, otherwise not present.",
   *          "type": "string"
   *        }
   *      },
   *      "type": "object"
   *    }
   *  },
   *  "404": {
   *    "description": "There is no avatar URL for this user or this user does not exist."
   *  }
   *}
   *
   * @summary : Get the user's avatar URL.
   *
   */
  @Get('/_matrix/client/r0/profile/:userId/avatar_url')
  async getAvatarUrl(
    @Param('userId') userId: string
  ): Promise<dto.GetAvatarUrlResponse | any> {
    throw new HttpError(501);
  }

  /**
   * @description : This API sets the given user's avatar URL. You must have permission to
   *set this user's avatar URL, e.g. you need to have their ``access_token``.
   *
   * @parameters : [
   *  {
   *    "description": "The user whose avatar URL to set.",
   *    "in": "path",
   *    "name": "userId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "@alice:example.com"
   *  },
   *  {
   *    "description": "The avatar url info.",
   *    "in": "body",
   *    "name": "avatar_url",
   *    "required": true,
   *    "schema": {
   *      "example": {
   *        "avatar_url": "mxc://matrix.org/wefh34uihSDRGhw34"
   *      },
   *      "properties": {
   *        "avatar_url": {
   *          "description": "The new avatar URL for this user.",
   *          "type": "string"
   *        }
   *      },
   *      "type": "object"
   *    }
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The avatar URL was set.",
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
   * @summary : Set the user's avatar URL.
   *
   */
  @Put('/_matrix/client/r0/profile/:userId/avatar_url')
  async setAvatarUrl(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: dto.SetAvatarUrlBody
  ): Promise<dto.SetAvatarUrlResponse429 | any> {
    throw new HttpError(501);
  }
}
