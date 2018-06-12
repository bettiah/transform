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
export class MatrixClientR0UserUserIdRoomsRoomIdTags {
  /**
   * @description : List the tags set by a user on a room.
   *
   * @parameters : [
   *  {
   *    "description": "The id of the user to get tags for. The access token must be\nauthorized to make requests for this user id.",
   *    "in": "path",
   *    "name": "userId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "@alice:example.com"
   *  },
   *  {
   *    "description": "The id of the room to get tags for.",
   *    "in": "path",
   *    "name": "roomId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "!726s6s6q:example.com"
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The list of tags for the user for the room.",
   *    "examples": {
   *      "application/json": {
   *        "tags": {
   *          "pinned": {},
   *          "work": {
   *            "order": "1"
   *          }
   *        }
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "tags": {
   *          "title": "Tags",
   *          "type": "object"
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
   * @summary : List the tags for a room.
   *
   */
  @Get('/_matrix/client/r0/user/:userId/rooms/:roomId/tags')
  async getRoomTags(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @CurrentUser() user?: User
  ): Promise<dto.GetRoomTagsResponse | any> {
    throw new HttpError(501);
  }
}
