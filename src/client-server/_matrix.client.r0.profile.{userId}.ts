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
export class MatrixClientR0ProfileUserId {
  /**
   * @description : Get the combined profile information for this user. This API may be used
   *to fetch the user's own profile information or other users; either
   *locally or on remote homeservers. This API may return keys which are not
   *limited to ``displayname`` or ``avatar_url``.
   *
   * @parameters : [
   *  {
   *    "description": "The user whose profile information to get.",
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
   *        "avatar_url": "mxc://matrix.org/SDGdghriugerRg",
   *        "displayname": "Alice Margatroid"
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "avatar_url": {
   *          "description": "The user's avatar URL if they have set one, otherwise not present.",
   *          "type": "string"
   *        },
   *        "displayname": {
   *          "description": "The user's display name if they have set one, otherwise not present.",
   *          "type": "string"
   *        }
   *      },
   *      "type": "object"
   *    }
   *  },
   *  "404": {
   *    "description": "There is no profile information for this user or this user does not exist."
   *  }
   *}
   *
   * @summary : Get this user's profile information.
   *
   */
  @Get('/_matrix/client/r0/profile/:userId')
  async getUserProfile(
    @Param('userId') userId: string
  ): Promise<dto.GetUserProfileResponse | any> {
    throw new HttpError(501);
  }
}
