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
export class MatrixClientR0DirectoryRoomRoomAlias {
  /**
   * @description : Requests that the server resolve a room alias to a room ID.
   *
   *The server will use the federation API to resolve the alias if the
   *domain part of the alias does not correspond to the server's own
   *domain.
   *
   * @parameters : [
   *  {
   *    "description": "The room alias.",
   *    "in": "path",
   *    "name": "roomAlias",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "#monkeys:matrix.org"
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The room ID and other information for this alias.",
   *    "examples": {
   *      "application/json": {
   *        "room_id": "!abnjk1jdasj98:capuchins.com",
   *        "servers": [
   *          "capuchins.com",
   *          "matrix.org",
   *          "another.com"
   *        ]
   *      }
   *    },
   *    "schema": {
   *      "properties": {
   *        "room_id": {
   *          "description": "The room ID for this room alias.",
   *          "type": "string"
   *        },
   *        "servers": {
   *          "description": "A list of servers that are aware of this room alias.",
   *          "items": {
   *            "description": "A server which is aware of this room alias.",
   *            "type": "string"
   *          },
   *          "type": "array"
   *        }
   *      },
   *      "type": "object"
   *    }
   *  },
   *  "404": {
   *    "description": "There is no mapped room ID for this room alias.",
   *    "examples": {
   *      "application/json": {
   *        "errcode": "M_NOT_FOUND",
   *        "error": "Room alias #monkeys:matrix.org not found."
   *      }
   *    }
   *  }
   *}
   *
   * @summary : Get the room ID corresponding to this room alias.
   *
   */
  @Get('/_matrix/client/r0/directory/room/:roomAlias')
  async getRoomIdByAlias(
    @Param('roomAlias') roomAlias: string
  ): Promise<dto.GetRoomIdByAliasResponse | any> {
    throw new HttpError(501);
  }

  /**
   * @parameters : [
   *  {
   *    "description": "The room alias to set.",
   *    "in": "path",
   *    "name": "roomAlias",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "#monkeys:matrix.org"
   *  },
   *  {
   *    "description": "Information about this room alias.",
   *    "in": "body",
   *    "name": "roomInfo",
   *    "required": true,
   *    "schema": {
   *      "example": {
   *        "room_id": "!abnjk1jdasj98:capuchins.com"
   *      },
   *      "properties": {
   *        "room_id": {
   *          "description": "The room ID to set.",
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
   *    "description": "The mapping was created.",
   *    "examples": {
   *      "application/json": {}
   *    },
   *    "schema": {
   *      "type": "object"
   *    }
   *  },
   *  "409": {
   *    "description": "A room alias with that name already exists.",
   *    "examples": {
   *      "application/json": {
   *        "errcode": "M_UNKNOWN",
   *        "error": "Room alias #monkeys:matrix.org already exists."
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
   * @summary : Create a new mapping from room alias to room ID.
   *
   */
  @Put('/_matrix/client/r0/directory/room/:roomAlias')
  async setRoomAlias(
    @Param('roomAlias') roomAlias: string,
    @Body({ required: true })
    body: dto.SetRoomAliasBody
  ): Promise<any> {
    throw new HttpError(501);
  }

  /**
   * @description : Remove a mapping of room alias to room ID.
   *
   *Servers may choose to implement additional access control checks here, for instance that room aliases can only be deleted by their creator or a server administrator.
   *
   * @parameters : [
   *  {
   *    "description": "The room alias to remove.",
   *    "in": "path",
   *    "name": "roomAlias",
   *    "required": true,
   *    "type": "string",
   *    "x-example": "#monkeys:matrix.org"
   *  }
   *]
   *
   * @responses : {
   *  "200": {
   *    "description": "The mapping was deleted.",
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
   * @summary : Remove a mapping of room alias to room ID.
   *
   */
  @Delete('/_matrix/client/r0/directory/room/:roomAlias')
  async deleteRoomAlias(@Param('roomAlias') roomAlias: string): Promise<any> {
    throw new HttpError(501);
  }
}
