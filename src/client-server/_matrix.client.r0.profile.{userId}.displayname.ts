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
export class MatrixClientR0ProfileUserIdDisplayname {
  /**
   * @description : Get the user's display name. This API may be used to fetch the user's
   *own displayname or to query the name of other users; either locally or
   *on remote homeservers.
   *
   * @parameters : [
   *  {
   *    "description": "The user whose display name to get.",
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
   *    "description": "The display name for this user.",
   *    "examples": {
   *      "application/json": {
   *        "displayname": "Alice Margatroid"
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "displayname": {
   *          "description": "The user's display name if they have set one, otherwise not present.",
   *          "type": "string"
   *        }
   *      },
   *      "type": "object"
   *    }
   *  },
   *  "404": {
   *    "description": "There is no display name for this user or this user does not exist."
   *  }
   *}
   *
   * @summary : Get the user's display name.
   *
   */
  @Get('/_matrix/client/r0/profile/:userId/displayname')
  async getDisplayName(
    @Param('userId') userId: string
  ): Promise<dto.GetDisplayNameResponse | any> {
    throw new HttpError(501);
  }

  /**
   * @description : This API sets the given user's display name. You must have permission to
   *set this user's display name, e.g. you need to have their ``access_token``.
   *
   * @parameters : [
   *  {
   *    "description": "The user whose display name to set.",
   *    "in": "path",
   *    "name": "userId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "@alice:example.com"
   *  },
   *  {
   *    "description": "The display name info.",
   *    "in": "body",
   *    "name": "displayName",
   *    "required": true,
   *    "schema": {
   *      "example": {
   *        "displayname": "Alice Margatroid"
   *      },
   *      "properties": {
   *        "displayname": {
   *          "description": "The new display name for this user.",
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
   *    "description": "The display name was set.",
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
   * @summary : Set the user's display name.
   *
   */
  @Put('/_matrix/client/r0/profile/:userId/displayname')
  async setDisplayName(
    @Param('userId') userId: string,
    @Body({ required: true })
    body: dto.SetDisplayNameBody,
    @CurrentUser() user?: User
  ): Promise<dto.SetDisplayNameResponse429 | any> {
    throw new HttpError(501);
  }
}
