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
export class MatrixClientR0UserUserIdRoomsRoomIdTagsTag {
  /**
   * @description : Add a tag to the room.
   *
   * @parameters : [
   *  {
   *    "description": "The id of the user to add a tag for. The access token must be\nauthorized to make requests for this user id.",
   *    "in": "path",
   *    "name": "userId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "@alice:example.com"
   *  },
   *  {
   *    "description": "The id of the room to add a tag to.",
   *    "in": "path",
   *    "name": "roomId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "!726s6s6q:example.com"
   *  },
   *  {
   *    "description": "The tag to add.",
   *    "in": "path",
   *    "name": "tag",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "work"
   *  },
   *  {
   *    "description": "Extra data for the tag, e.g. ordering.",
   *    "in": "body",
   *    "name": "body",
   *    "required": true,
   *    "schema": {
   *      "example": {
   *        "order": "1"
   *      },
   *      "type": "object"
   *    }
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The tag was successfully added.",
   *    "examples": {
   *      "application/json": {}
   *    },
   *    "schema": {
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
   * @summary : Add a tag to a room.
   *
   */
  @Put('/_matrix/client/r0/user/:userId/rooms/:roomId/tags/:tag')
  async setRoomTag(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Param('tag') tag: string,
    @Body({ required: true })
    body: any,
    @CurrentUser() user?: User
  ): Promise<any> {
    throw new HttpError(501);
  }

  /**
   * @description : Remove a tag from the room.
   *
   * @parameters : [
   *  {
   *    "description": "The id of the user to remove a tag for. The access token must be\nauthorized to make requests for this user id.",
   *    "in": "path",
   *    "name": "userId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "@alice:example.com"
   *  },
   *  {
   *    "description": "The id of the room to remove a tag from.",
   *    "in": "path",
   *    "name": "roomId",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "!726s6s6q:example.com"
   *  },
   *  {
   *    "description": "The tag to remove.",
   *    "in": "path",
   *    "name": "tag",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "work"
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The tag was successfully removed",
   *    "examples": {
   *      "application/json": {}
   *    },
   *    "schema": {
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
   * @summary : Remove a tag from the room.
   *
   */
  @Delete('/_matrix/client/r0/user/:userId/rooms/:roomId/tags/:tag')
  async deleteRoomTag(
    @Param('userId') userId: string,
    @Param('roomId') roomId: string,
    @Param('tag') tag: string,
    @CurrentUser() user?: User
  ): Promise<any> {
    throw new HttpError(501);
  }
}
